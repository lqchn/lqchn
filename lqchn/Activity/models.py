from django.db import models
from django.http import HttpResponse
from Club.models import Club
from userAdmin.models import User_C
from School.models import School
from Journal.models import Journal

class activityInfo(models.Model):
	title = models.CharField(max_length=32)
	time = models.CharField(max_length=30)
	host = models.CharField(max_length=30)
	undertake = models.CharField(max_length=30)
	place = models.CharField(max_length=500)
	area = models.CharField(max_length=30)
	tel = models.CharField(max_length=12)
	email = models.CharField(max_length=30)
	number = models.IntegerField(default=0)

class hostClub(models.Model):
	HC_club = models.ForeignKey(Club)
	HC_date = models.CharField(max_length=10)

class recordInfo(models.Model):
	numViews = models.IntegerField(default=0)
	numFavor = models.IntegerField(default=0)

class Activity(models.Model):	
	#basic information
	information = models.OneToOneField(activityInfo)

	#host club
	club = models.OneToOneField(hostClub)

	#School
	school = models.ForeignKey(School,null=True)

	#Journal
	journal = models.OneToOneField(Journal,null=True)

	#social
	social = models.ManyToManyField(User_C,null=True,through='activitySocialMS')

	#record
	record = models.OneToOneField(recordInfo)

	#brief information
	image = models.FileField(upload_to='activity_image/%Y/%m/%d')
	brief_intro = models.CharField(max_length=1000)

	#detail information
	detail_intro = models.CharField(max_length=10000)
	safe_file = models.FileField(upload_to='activity_safe/%Y/%m/%d')

class activitySocialMS(models.Model):
	activity = models.ForeignKey(Activity)
	user = models.ForeignKey(User_C)

class enrollSingle(models.Model):
	grade = models.CharField(max_length=20)
	name = models.CharField(max_length=20)
	major = models.CharField(max_length=20)
	tel = models.CharField(max_length=12)
	email = models.CharField(max_length=20)
	other = models.CharField(max_length=300)
	activity = models.ForeignKey(Activity)

class enrollGroup(models.Model):
	cap_name = models.CharField(max_length=20)
	cap_tel = models.CharField(max_length=12)
	cap_email = models.CharField(max_length=20)
	cap_major = models.CharField(max_length=20)
	m1_name = models.CharField(max_length=20)
	m1_major = models.CharField(max_length=20)
	m2_name = models.CharField(max_length=20)
	m2_major = models.CharField(max_length=20)
	m3_name = models.CharField(max_length=20)
	m3_major = models.CharField(max_length=20)
	m4_name = models.CharField(max_length=20)
	m4_major = models.CharField(max_length=20)
	m5_name = models.CharField(max_length=20)
	m5_major = models.CharField(max_length=20)
	m6_name = models.CharField(max_length=20)
	m6_major = models.CharField(max_length=20)
	m7_name = models.CharField(max_length=20)
	m7_major = models.CharField(max_length=20)
	m8_name = models.CharField(max_length=20)
	m8_major = models.CharField(max_length=20)
	m9_name = models.CharField(max_length=20)
	m9_major = models.CharField(max_length=20)
	m10_name = models.CharField(max_length=20)
	m10_major = models.CharField(max_length=20)
	activity = models.ForeignKey(Activity)
