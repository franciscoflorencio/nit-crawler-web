from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(blank=True, null=True)  # URL da imagem
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
