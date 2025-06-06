from django.db import models


class FundingOpportunity(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(max_length=1024, blank=True, null=True)
    opening_date = models.CharField(max_length=255, blank=True, null=True)
    closing_date = models.CharField(max_length=255, blank=True, null=True)
    closing_time = models.CharField(max_length=255, blank=True, null=True)
    opportunity_status = models.CharField(max_length=100, blank=True, null=True)
    funders = models.CharField(max_length=255, blank=True, null=True)
    funders_url = models.URLField(max_length=1024, blank=True, null=True)
    funding_type = models.CharField(max_length=100, blank=True, null=True)
    total_fund = models.CharField(max_length=100, blank=True, null=True)
    award_range = models.CharField(max_length=100, blank=True, null=True)
    publication_date = models.CharField(max_length=255, blank=True, null=True)
    observation = models.TextField(blank=True, null=True)
    institution = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    date = models.CharField(max_length=255, blank=True, null=True)
    source = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Funding Opportunity"
        verbose_name_plural = "Funding Opportunities"

    def __str__(self):
        return self.title if self.title else "Unnamed Opportunity"
