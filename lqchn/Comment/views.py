from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from models import cmtUser,replyUser
from models import cmtClub,replyClub
from models import cmtActivity,replyActivity
from models import cmtJournal,replyJournal
from models import cmtPost,replyPost
from Club.models import Club
from Activity.models import Activity
from userAdmin.models import User_C
from Journal.models import Journal
from actRequest.models import groundPost
import time

from django.views.decorators.csrf import csrf_exempt 

def getCurrentTime():
	t = time.localtime()
	tString = str(t.tm_year)+'-'+str(t.tm_mon)+'-'+str(t.tm_mday)+' '+str(t.tm_hour)+':'+str(t.tm_min)+':'+str(t.tm_sec)
	return tString

#post new comment
def commentInUser(content,_id,u_id):
	user = User_C.objects.get(id=_id)
	comment = cmtUser(belong=user)
	comment.save()

	sender = User_C.objects.get(id=u_id)
	reply = replyUser(CR_belong=comment,CR_send=sender,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def commentInClub(content,_id,u_id):
	club = Club.objects.get(id=_id)
	comment = cmtClub(belong=club)
	comment.save()

	sender = User_C.objects.get(id=u_id)
	reply = replyClub(CR_belong=comment,CR_send=sender,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def commentInActivity(content,_id,u_id):
	activity = Activity.objects.get(id=_id)
	comment = cmtActivity(belong=activity)
	comment.save()

	sender = User_C.objects.get(id=u_id)
	reply = replyActivity(CR_belong=comment,CR_send=sender,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def commentInJournal(content,_id,u_id):
	journal = Journal.objects.get(id=_id)
	comment = cmtJournal(belong=journal)
	comment.save()

	sender = User_C.objects.get(id=u_id)
	reply = replyJournal(CR_belong=comment,CR_send=sender,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def commentInPost(content,_id,u_id):
	post = groundPost.objects.get(id=_id)
	comment = cmtPost(belong=post)
	comment.save()

	sender = User_C.objects.get(id=u_id)
	reply = replyPost(CR_belong=comment,CR_send=sender,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

#post reply after comment
def replyInUser(content,c_id,u_id):
	comment = cmtUser.objects.get(id=c_id)
	user = User_C.objects.get(id=u_id)

	#create new reply
	reply = replyUser(CR_belong=comment,CR_send=user,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def replyInClub(content,c_id,u_id):
	comment = cmtClub.objects.get(id=c_id)
	user = User_C.objects.get(id=u_id)

	#create new reply
	reply = replyClub(CR_belong=comment,CR_send=user,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def replyInActivity(content,c_id,u_id):
	comment = cmtActivity.objects.get(id=c_id)
	user = User_C.objects.get(id=u_id)

	#create new reply
	reply = replyActivity(CR_belong=comment,CR_send=user,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def replyInJournal(content,c_id,u_id):
	comment = cmtJournal.objects.get(id=c_id)
	user = User_C.objects.get(id=u_id)

	#create new reply
	reply = replyJournal(CR_belong=comment,CR_send=user,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

def replyInPost(content,c_id,u_id):
	comment = cmtPost.objects.get(id=c_id)
	user = User_C.objects.get(id=u_id)

	#create new reply
	reply = replyPost(CR_belong=comment,CR_send=user,CR_time=getCurrentTime(),CR_content=content)
	reply.save()

	return 1

@csrf_exempt
def createNewComment(request):
	t = request.POST['type']
	_id = request.POST['_id']
	u_id = request.POST['u_id']
	content = request.POST['content']

	if int(t) == 0:
		result = commentInUser(content,_id,u_id)
	elif int(t) == 1:
		result = commentInClub(content,_id,u_id)
	elif int(t) == 2:
		result = commentInActivity(content,_id,u_id)
	elif int(t) == 3:
		result = commentInJournal(content,_id,u_id)
	elif int(t) == 4:
		result = commentInPost(content,_id,u_id)

@csrf_exempt
def createNewReply(request):
	t = request.POST['type']
	c_id = request.POST['c_id']
	u_id = request.POST['u_id']
	content = request.POST['content']

	if int(t) == 0:
		result = replyInUser(content,c_id,u_id)
	elif int(t) == 1:
		result = replyInClub(content,c_id,u_id)
	elif int(t) == 2:
		result = replyInActivity(content,c_id,u_id)
	elif int(t) == 3:
		result = replyInJournal(content,c_id,u_id)
	elif int(t) == 4:
		result = replyInPost(content,c_id,u_id)

	return HttpResponseRedirect("http://www.baidu.com")
