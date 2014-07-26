from django.db import models
from userAdmin.models import User_C
from Club.models import Club
from Activity.models import Activity
from Journal.models import Journal
from actRequest.models import groundPost

#user comment
class cmtUser(models.Model):
	belong = models.ForeignKey(User_C)

class replyUser(models.Model):
	CR_belong = models.ForeignKey(cmtUser)
	CR_send = models.ForeignKey(User_C)
	CR_time = models.CharField(max_length=20)
	CR_content = models.CharField(max_length=140)

#club comment
class cmtClub(models.Model):
	belong = models.ForeignKey(Club)

class replyClub(models.Model):
	CR_belong = models.ForeignKey(cmtClub)
	CR_send = models.ForeignKey(User_C)
	CR_time = models.CharField(max_length=20)
	CR_content = models.CharField(max_length=140)

#activity comment
class cmtActivity(models.Model):
	belong = models.ForeignKey(Activity)

class replyActivity(models.Model):
	CR_belong = models.ForeignKey(cmtActivity)
	CR_send = models.ForeignKey(User_C)
	CR_time = models.CharField(max_length=20)
	CR_content = models.CharField(max_length=140)

#journal comment
class cmtJournal(models.Model):
	belong = models.ForeignKey(Journal)

class replyJournal(models.Model):
	CR_belong = models.ForeignKey(cmtJournal)
	CR_send = models.ForeignKey(User_C)
	CR_time = models.CharField(max_length=20)
	CR_content = models.CharField(max_length=140)

#ground post comment
class cmtPost(models.Model):
	belong = models.ForeignKey(groundPost)

class replyPost(models.Model):
	CR_belong = models.ForeignKey(cmtPost)
	CR_send = models.ForeignKey(User_C)
	CR_time = models.CharField(max_length=20)
	CR_content = models.CharField(max_length=140)