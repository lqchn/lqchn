from django.db import models

class School(models.Model):
	s_code = models.CharField(max_length=6)
	s_name = models.CharField(max_length=30)