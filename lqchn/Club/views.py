from django.shortcuts import render
from django.http import HttpResponse
from userAdmin.models import User_C
from models import Club
from models import clubInfo,memberInfo,founderInfo,recordInfo
from School.models import School
from .forms import uploadLogoForm
from datetime import *
import time
import json
from friendsNews.models import globalNews

from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def createNewClub(request):
	u_id = request.POST['u_id']
	name = request.POST['club_name']
	intro = request.POST['club_intro']
	c_name = request.POST['c_name']
	tel = request.POST['club_tel']
	email = request.POST['club_email']
	cb_type = request.POST['club_type']
	numMembers = request.POST['numMembers']

	u = User_C.objects.get(id=u_id)
	school = u.school

	today = str(date.today().year)+'-'+str(date.today().month)+'-'+str(date.today().day)

	#basic information
	information = clubInfo()
	information.name = name
	information.create_name = c_name
	information.introduction = intro
	information.cb_type = cb_type
	information.dateFound = today
	information.tel = tel
	information.email = email
	information.numMember = numMembers
	
	form = uploadLogoForm(request.POST,request.FILES)
	if form.is_valid():
		information.logo = request.FILES['logo']

	information.save()

	#founder information
	founder = founderInfo(FI_user=u)
	founder.save()

	#record
	record = recordInfo()
	record.save()

	#create Club
	new_club = Club()
	new_club.information = information
	new_club.founder = founder
	new_club.school = school
	new_club.record = record
	new_club.save()

	createGlobalNews(u_id,new_club.id,'1')

	return HttpResponse('1')

@csrf_exempt
def updataClubInfo(request):
	#data
	c_id = request.POST['c_id']
	name = request.POST['club_name']
	intro = request.POST['club_intro']
	tel = request.POST['club_tel']
	email = request.POST['club_email']
	cb_type = request.POST['club_type']
	numMembers = request.POST['numMembers']

	club = Club.objects.get(id=c_id)

	information = club.information
	information.name = name
	information.introduction = intro
	information.cb_type = cb_type
	information.tel = tel
	information.email = email
	information.numMember = numMembers

	form = uploadLogoForm(request.POST,request.FILES)
	if form.is_valid():
		try:
			information.logo = request.FILES['logo']
		except:
			information.save()

	information.save()
	club.save()

	createGlobalNews(club.founder.FI_user.id,club.id,'2')

	return HttpResponse('1')

#list of club
def showClubList(request):
	code = request.GET['code']

	#find school
	for tem in School.objects.all():
		if tem.s_code == code:
			school = tem
			break

	#get club list
	result = []
	for c in school.club_set.all():
		logo = ''
		try:
			logo = c.information.logo.url
		except:
			logo = ''
		tem = {
		"club_name":c.information.name,
		"club_introduction":c.information.introduction,
		"club_id":c.id,	
		"club_logo":logo,
		"views":c.record.numViews,
		"favor":c.record.numFavor,
		"member":len(c.members.all()),
		}
		result = result + [tem]
		#number of views
		numberOfViewsPlus(c)

	return HttpResponse(json.dumps(result))

def showSelfCreatedClub(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for f in user.founderinfo_set.all():
		c = f.club
		logo = ''
		try:
			logo = c.information.logo.url
		except:
			logo = ''
		tem = {
		"club_name":c.information.name,
		"club_introduction":c.information.introduction,
		"club_id":c.id,	
		"club_logo":logo,
		"views":c.record.numViews,
		"favor":c.record.numFavor,
		"member":len(c.members.all()),
		}
		result = result + [tem]

	return HttpResponse(json.dumps(result))

def showSelfJoinedClub(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for m in user.memberinfo_set.all():
		c = m.club_set.all()[0]
		logo = ''
		try:
			logo = c.information.logo.url
		except:
			logo = ''
		tem = {
		"club_name":c.information.name,
		"club_introduction":c.information.introduction,
		"club_id":c.id,	
		"club_logo":logo,
		"views":c.record.numViews,
		"favor":c.record.numFavor,
		"member":len(c.members.all()),
		}
		result = result+[tem]

	return HttpResponse(json.dumps(result))

def showClubDetail(request):
	id = request.GET['id']

	club = Club.objects.get(id=id)
	#number of views
	numberOfViewsPlus(club)

	try:
		url = club.information.logo.url
	except:
		url = ''

	result = {
	"name":club.information.name,
	"introduction":club.information.introduction,
	"c_name":club.information.create_name,
	"c_type":club.information.cb_type,
	"dateFound":club.information.dateFound,
	"logo":url,
	"tel":club.information.tel,
	"email":club.information.email,
	"members":len(club.members.all()),
	"views":club.record.numViews,
	"favor":club.record.numFavor,
	"founder_id":club.founder.FI_user.id,
	"founder_name":club.founder.FI_user.profile.BP_name,
	"school":club.school.s_code,
	"numMembers":club.information.numMember,
	}
	return HttpResponse(json.dumps(result))

#member action with club
def joinMemberToClub(request):
	c_id = request.GET['c_id']
	user = request.user
	for u in User_C.objects.all():
		if u.user.username == user.username:
			user = u
	club = Club.objects.get(id=c_id)

	today = str(date.today().year)+'-'+str(date.today().month)+'-'+str(date.today().day)

	new_member = memberInfo(MI_user=user,MI_dateJoin=today)
	new_member.save()
	club.members.add(new_member)
	club.save()

	return HttpResponse('1')

def memberQuitFromClub(request):
	c_id = request.GET['c_id']
	user = request.user
	for u in User_C.objects.all():
		if u.user.username == user.username:
			user = u
	club = Club.objects.get(id=c_id)

	for m in club.members.all():
		if m.MI_user.id == u_id:
			m.delete()
			break

	return HttpResponse('1')

#show members in club
def showClubMembers(request):
	c_id = request.GET['c_id']
	club = Club.objects.get(id=c_id)
	member = []
	for m in club.members.all():
		u = m.MI_user
		url = ''
		try:
			url = u.profile.BP_photo.url
		except:
			url = '/media/html_image/index/_profile_face.jpg'
		tem = {
		'id':u.id,
		'nickname':u.profile.BP_nickname,
		'photo':url,
		}
		member = member + [tem]

	l = c.founder.FI_user
	url = ''
	try:
		url = l.profile.BP_photo
	except:
		url = '/media/html_image/index/_profile_face.jpg'
	leader = {
	'id':l.id,
	'nickname':l.profile.BP_nickname,
	'photo':l.profile.BP_photo,
	}
	result = {
	'members':member,
	'leader':leader,
	'numMembers':club.information.numMembers,
	}
	return HttpResponse(json.dumps(result))

def getRecentActivity(request):
	c_id = request.GET['c_id']
	club = Club.objects.get(id=c_id)
	result = []
	for host in club.hostclub_set.all():
		activity = host.activity
		tem = {
		'id':activity.id,
		'title':activity.information.title,
		'time':activity.information.time,
		}
		result = result + [tem]
	return HttpResponse(json.dumps(result))

def getRecentJournal(request):
	c_id = request.GET['c_id']
	club = Club.objects.get(id=c_id)
	result = []
	for host in club.hostclub_set.all():
		activity = host.activity
		try:
			tem = {
			'id':activity.journal.id,
			'title':activity.journal.detail.DC_title,
			'a_title':activity.information.title,
			}
			result = result + [tem]
		except:
			pass
	return HttpResponse(json.dumps(result))


def createGlobalNews(s_id,o_id,t):
	new_news = globalNews()
	new_news._subject_id = s_id
	new_news._object_id = o_id
	new_news.what = t
	c_time = time.localtime()
	new_news.when = str(c_time.tm_year)+'/'+str(c_time.tm_mon)+'/'+str(c_time.tm_mday)+' '+str(c_time.tm_hour)+':'+str(c_time.tm_min)+':'+str(c_time.tm_sec)
	new_news.school = User_C.objects.get(id=s_id).school
	new_news.save()

def numberOfViewsPlus(club):
	club.record.numViews += 1
	club.record.save()
