from django.db import models
from django.db.models import JSONField

# Create your models here.
class FundingOpportunity(models.Model):
    # Common Fields
    title = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    opening_date = models.TextField(null=True, blank=True)
    closing_date = models.TextField(null=True, blank=True)

    # Optional Fields
    closing_time = models.TextField(null=True, blank=True)
    opportunity_status = models.CharField(max_length=100, null=True, blank=True)
    funders = models.CharField(max_length=500, null=True, blank=True)
    funders_url = models.URLField(null=True, blank=True)
    funding_type = models.CharField(max_length=100, null=True, blank=True)
    total_fund = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    award_range = models.CharField(max_length=200, null=True, blank=True)
    publication_date = models.TextField(null=True, blank=True)
    observation = models.TextField(null=True, blank=True)
    institution = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    date = models.TextField(null=True, blank=True)

    source = models.CharField(max_length=100, null=True, blank=True)

    # AI-related fields
    ai_keywords = JSONField(null=True, blank=True, help_text="Keywords extracted by AI")
    ai_summary = models.TextField(null=True, blank=True, help_text="AI-generated summary")
    ai_analysis = JSONField(null=True, blank=True, help_text="AI analysis results")
    ai_processing_status = models.CharField(max_length=20, default="pending", choices=[
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ])
    ai_last_processed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-ai_last_processed', '-id']

