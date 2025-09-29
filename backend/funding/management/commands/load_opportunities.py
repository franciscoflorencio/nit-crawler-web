import os
import json
import logging
from decimal import Decimal, InvalidOperation

from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import timezone
from funding.models import FundingOpportunity

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Loads funding opportunities from all JSON files in the results_spiders folder."

    def handle(self, *args, **kwargs):
        # Construct the path to the crawler's results directory
        results_path = os.path.abspath(
            os.path.join(
                settings.BASE_DIR,
                "..",
                "..",
                "..",
                "nit-crawler",
                "notices",
                "results_spiders",
            )
        )

        if not os.path.isdir(results_path):
            self.stdout.write(
                self.style.ERROR(f"Directory not found: {results_path}")
            )
            self.stdout.write(
                self.style.WARNING(
                    "Please ensure the path is correct relative to your Django project."
                )
            )
            return

        self.stdout.write(f"Searching for JSON files in: {results_path}")

        for filename in os.listdir(results_path):
            if not filename.endswith(".json"):
                continue

            file_path = os.path.join(results_path, filename)
            self.stdout.write(f"Processing file: {filename}")

            # Automatically derive the source name from the filename
            # e.g., 'eureka.json' -> 'Eureka'
            source_name = (
                os.path.splitext(filename)[0]
                .replace("_spider", "")
                .replace("_", " ")
                .capitalize()
            )

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except (json.JSONDecodeError, IOError) as e:
                self.stdout.write(
                    self.style.ERROR(f"Could not read or parse {filename}: {e}")
                )
                continue

            if not isinstance(data, list):
                self.stdout.write(
                    self.style.WARNING(
                        f"Skipping {filename}: JSON file does not contain a list of items."
                    )
                )
                continue

            for item in data:
                link = item.get("link")
                if not link:
                    logger.warning(
                        f"Skipping item in {filename} due to missing link: {item.get('title', 'No Title')}"
                    )
                    continue

                # Create or update the record using the link as a unique identifier
                opportunity, created = FundingOpportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        "title": item.get("title", "No Title Provided"),
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
                        "date": item.get("date"),
                        "source": source_name,
                        "ai_last_processed": timezone.now(),
                    },
                )

                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f"  Created: {opportunity.title[:70]}...")
                    )
                else:
                    self.stdout.write(f"  Updated: {opportunity.title[:70]}...")

        self.stdout.write(self.style.SUCCESS("\nFinished loading all opportunities."))

    def clean_decimal(self, value):
        """
        Clean and convert a string value into a valid decimal number.
        Removes currency symbols, commas, and handles invalid inputs.
        """
        if value is None:
            return None
        try:
            # Basic cleaning for currency values
            cleaned_value = "".join(
                filter(lambda x: x.isdigit() or x in ".,", str(value))
            ).replace(",", ".")
            return Decimal(cleaned_value)
        except (InvalidOperation, ValueError):
            # Log a warning if the value cannot be converted
            self.stderr.write(self.style.WARNING(f"Invalid total_fund value: {value}"))
            return None
        