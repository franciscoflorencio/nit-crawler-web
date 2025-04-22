import json
from django.core.management.base import BaseCommand
from funding.models import FundingOpportunity
import os

class Command(BaseCommand):
    help='Import Scrapy JSON data into the database'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')
        parser.add_argument('--source', type=str, required=True, help='Source of the data (e.g., CNPq, EAC, FAPERJ)')

    def clean_decimal(self, value):
        """
        Clean and convert a string value into a valid decimal number.
        Removes currency symbols, commas, and handles invalid inputs.
        """
        if not value:
            return None

        try:
            # Remove currency symbols and commas
            cleaned_value = value.replace('£', '').replace(',', '').strip()

            # Convert to float and then to Decimal
            return float(cleaned_value)
        except ValueError:
            # Log a warning if the value cannot be converted
            self.stderr.write(self.style.WARNING(f'Invalid total_fund value: {value}'))
            return None

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        source = kwargs['source']  # Get the source from the command-line argument
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)

            for item in data:
                if 'total_fund' in item:
                   item['total_fund'] = self.clean_decimal(item['total_fund'])

                FundingOpportunity.objects.create(
                    title=item.get('title'),
                    description=item.get('description'),
                    link=item.get('link'),
                    opening_date=item.get('opening_date'),
                    closing_date=item.get('closing_date'),
                    closing_time=item.get('closing_time'),
                    opportunity_status=item.get('opportunity_status'),
                    funders=item.get('funders'),
                    funders_url=item.get('funders_url'),
                    funding_type=item.get('funding_type'),
                    total_fund=item.get('total_fund'),
                    award_range=item.get('award_range'),
                    publication_date=item.get('publication_date'),
                    observation=item.get('observation'),
                    institution=item.get('institution'),
                    city=item.get('city'),
                    date=item.get('date'),
                    source=source,  # Dynamically set the source here
                )
            self.stdout.write(self.style.SUCCESS('Data imported successfully'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error importing data: {e}'))
