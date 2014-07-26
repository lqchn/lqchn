from django.db import models
from userAdmin.models import User_C
from School.models import School

class globalNews(models.Model):
	_subject_id = models.CharField(max_length=10)
	_object_id = models.CharField(max_length=10)
	what = models.CharField(max_length=50)
	when = models.CharField(max_length=20)
	school = models.ForeignKey(School,null=True)
