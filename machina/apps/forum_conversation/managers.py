from django.db import models


class ApprovedManager(models.Manager):
    def get_queryset(self):
        """
        Returns all the approved topics or posts.
        """
        qs = super().get_queryset()
        qs = qs.filter(approved=True)

        return qs
