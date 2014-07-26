from django.db import models
from userAdmin.models import User_C
from School.models import School

class clubInfo(models.Model):
	name = models.CharField(max_length=32)
	create_name = models.CharField(max_length=20)
	introduction = models.CharField(max_length=2000)
	cb_type = models.CharField(max_length=10)
	dateFound = models.CharField(max_length=10)
	logo = models.FileField(upload_to='club_logo/%Y/%m/%d')
	tel = models.CharField(max_length=12)
	email = models.CharField(max_length=20)
	numMember = models.CharField(max_length=5)

class memberInfo(models.Model):
	MI_user = models.ForeignKey(User_C)
	MI_dateJoin = models.CharField(max_length=10)

class founderInfo(models.Model):
	FI_user = models.ForeignKey(User_C)

class recordInfo(models.Model):
	numViews = models.IntegerField(default=0)
	numFavor = models.IntegerField(default=0)

class Club(models.Model):	
	#basic information
	information = models.OneToOneField(clubInfo,null=True)

	#founder of club
	founder = models.OneToOneField(founderInfo,null=True)

	#members of club
	members = models.ManyToManyField(memberInfo,null=True)

	#School
	school = models.ForeignKey(School,null=True)

	#record
	record = models.OneToOneField(recordInfo)
