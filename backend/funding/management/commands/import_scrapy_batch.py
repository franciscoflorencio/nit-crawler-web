import json
import os
from decimal import Decimal, InvalidOperation

from django.core.management.base import BaseCommand
from funding.models import FundingOpportunity


class Command(BaseCommand):
    help = "Import all Scrapy JSON files from a folder into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=str,
            default="/data/scrapy_output",
            help="Folder that contains JSON files (default: /data/scrapy_output)",
        )
        parser.add_argument(
            "--source",
            type=str,
            default=None,
            help="Optional fixed source for all files (default: filename-based).",
        )

    def clean_decimal(self, value):
        if value is None or value == "":
            return None
        try:
            cleaned_value = "".join(
                filter(lambda x: x.isdigit() or x in ".,", str(value))
            ).replace(",", ".")
            return Decimal(cleaned_value)
        except (InvalidOperation, ValueError):
            self.stderr.write(self.style.WARNING(f"Invalid total_fund value: {value}"))
            return None

    def handle(self, *args, **kwargs):
        folder_path = kwargs["path"]
        fixed_source = kwargs["source"]

        if not os.path.isdir(folder_path):
            self.stderr.write(self.style.ERROR(f"Folder not found: {folder_path}"))
            return

        files = [f for f in os.listdir(folder_path) if f.endswith(".json")]
        if not files:
            self.stderr.write(self.style.WARNING("No JSON files found."))
            return

        created_count = 0
        updated_count = 0

        for filename in sorted(files):
            file_path = os.path.join(folder_path, filename)
            source_name = fixed_source or os.path.splitext(filename)[0].upper()

            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    data = json.load(file)
            except (json.JSONDecodeError, OSError) as exc:
                self.stderr.write(
                    self.style.ERROR(f"Error reading {filename}: {exc}")
                )
                continue

            if not isinstance(data, list):
                self.stderr.write(
                    self.style.WARNING(
                        f"Skipping {filename}: JSON file does not contain a list."
                    )
                )
                continue

            for item in data:
                link = item.get("link")
                if not link:
                    self.stderr.write(
                        self.style.WARNING(
                            f"Skipping item without link in {filename}: {item.get('title', 'No Title')}"
                        )
                    )
                    continue

                defaults = {
                    "title": item.get("title"),
                    "description": item.get("description"),
                    "opening_date": item.get("opening_date"),
                    "closing_date": item.get("closing_date"),
                    "closing_time": item.get("closing_time"),
                    "opportunity_status": item.get("opportunity_status"),
                    "funders": item.get("funders"),
                    "funders_url": item.get("funders_url"),
                    "funding_type": item.get("funding_type"),
                    "total_fund": self.clean_decimal(item.get("total_fund")),
                    "award_range": item.get("award_range"),
                    "publication_date": item.get("publication_date"),
                    "observation": item.get("observation"),
                    "institution": item.get("institution"),
                    "city": item.get("city"),
                    "country": item.get("country"),
                    "date": item.get("date"),
                    "source": source_name,
                }

                existing = FundingOpportunity.objects.filter(link=link).order_by("id")
                if existing.exists():
                    opportunity = existing.first()
                    for field, value in defaults.items():
                        setattr(opportunity, field, value)
                    opportunity.save()

                    duplicates = existing.exclude(id=opportunity.id)
                    if duplicates.exists():
                        self.stderr.write(
                            self.style.WARNING(
                                f"Duplicate link found in DB for {link}. Removing {duplicates.count()} duplicates."
                            )
                        )
                        duplicates.delete()
                    created = False
                else:
                    opportunity = FundingOpportunity.objects.create(
                        link=link,
                        **defaults,
                    )
                    created = True

                if created:
                    created_count += 1
                else:
                    updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Import finished. Created: {created_count}, Updated: {updated_count}"
            )
        )
