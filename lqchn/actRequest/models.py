from django.db import models
from School.models import School

class groundPost(models.Model):
	name = models.CharField(max_length=20)
	content = models.CharField(max_length=1000)
	time = models.CharField(max_length=30)
	numFavor = models.IntegerField(default=0)
	school = models.ForeignKey(School,null=True)