from django.db import models

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

    def __str__(self):
        return self.title
