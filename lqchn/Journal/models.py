from django.db import models

from userAdmin.models import User_C
from School.models import School

class detailContent(models.Model):
	DC_title = models.CharField(max_length=32)
	DC_html = models.CharField(max_length=10000)
	DC_author = models.CharField(max_length=30)
	DC_editor = models.CharField(max_length=30)
	image_1 = models.FileField(upload_to='journal_image/%Y/%m/%d')
	image_2 = models.FileField(upload_to='journal_image/%Y/%m/%d')
	image_3 = models.FileField(upload_to='journal_image/%Y/%m/%d')
	image_4 = models.FileField(upload_to='journal_image/%Y/%m/%d')
	image_5 = models.FileField(upload_to='journal_image/%Y/%m/%d')

class recordInfo(models.Model):
	numViews = models.IntegerField(default=0)
	numFavor = models.IntegerField(default=0)

class Journal(models.Model):	
	#detail content
	detail = models.OneToOneField(detailContent)

	#school
	school = models.ForeignKey(School)

	#record
	record = models.OneToOneField(recordInfo)