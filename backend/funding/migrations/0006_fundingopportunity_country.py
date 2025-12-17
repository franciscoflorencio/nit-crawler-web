from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("funding", "0005_alter_fundingopportunity_options_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="fundingopportunity",
            name="country",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
