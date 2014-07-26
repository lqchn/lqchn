from django.db import models
from django.contrib.auth.models import User

from School.models import School

class basicProf(models.Model):
    #real name
	BP_name = models.CharField(max_length=10)
	#fake name
	BP_nickname = models.CharField(max_length=16)
	BP_sex = models.CharField(max_length=1,choices=(('M','Male'),('F','Female'),('U','Unknown')),default='U')
	BP_birthday = models.CharField(max_length=10)
	BP_sign = models.CharField(max_length=140)
	BP_interest = models.CharField(max_length=140)
	BP_home = models.CharField(max_length=30)
	BP_location = models.CharField(max_length=30)
	BP_entrance = models.CharField(max_length=10)
	BP_major = models.CharField(max_length=30)
	BP_photo = models.FileField(upload_to='user_face/%Y/%m/%d')

class statusFlag(models.Model):
	tem = models.CharField(max_length=1,default='a')

class Following(models.Model):
	followingID = models.IntegerField(default=0)

class Followed(models.Model):
	followedID = models.IntegerField(default=0)

class User_C(models.Model):	
	user = models.OneToOneField(User)
	profile = models.OneToOneField(basicProf,null=True)
	status = models.OneToOneField(statusFlag,null=True)
	school = models.ForeignKey(School,null=True)
	followingTable = models.ManyToManyField(Following)
	followedTable = models.ManyToManyField(Followed)

	#safety information
	email = models.CharField(max_length=30)
	tel = models.CharField(max_length=12)
	qq = models.CharField(max_length=12)
	weibo = models.CharField(max_length=20)
	wechat = models.CharField(max_length=20)
