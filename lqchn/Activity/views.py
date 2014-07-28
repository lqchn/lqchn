from django.shortcuts import render
from django.http import HttpResponse

from Club.models import Club
from userAdmin.models import User_C
from models import Activity,enrollSingle,enrollGroup
from models import activityInfo,hostClub,recordInfo,activitySocialMS
from School.models import School
from friendsNews.models import globalNews
from .forms import uploadFileForm
from datetime import *
import json
import time

from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def createNewActivity(request):
	title = request.POST['title']
	host = request.POST['host']
	undertake = request.POST['undertake']
	time = request.POST['time']
	area = request.POST['area']
	place = request.POST['place']
	tel = request.POST['tel']
	email = request.POST['email']
	brief = request.POST['brief']
	detail = request.POST['detail']
	number = int(request.POST['number'])
	c_id = request.POST['c_id']

	club = Club.objects.get(id=c_id)

	today = str(date.today().year)+'-'+str(date.today().month)+'-'+str(date.today().day)

	#basic information
	information = activityInfo()
	information.title = title
	information.host = host
	information.undertake = undertake
	information.time = time
	information.area = area
	information.place = place
	information.tel = tel
	information.email = email
	information.number = number
	information.save()

	#host club
	host = hostClub()
	host.HC_club = club
	host.save()

	#record
	record = recordInfo()
	record.save()

	#create new activity
	new_activity = Activity()
	new_activity.information = information
	new_activity.club = host
	new_activity.school = club.school
	new_activity.record = record
	new_activity.brief_intro = brief
	new_activity.detail_intro = detail

	form = uploadFileForm(request.POST, request.FILES)
	if form.is_valid():
		new_activity.image = request.FILES['image']
		new_activity.safe_file = request.FILES['safe_file']

	new_activity.save()

	createGlobalNews(club.id,new_activity.id,'3')

	return HttpResponse('1')

#list of activity
def showActivityList(request):
	code = request.GET['code']
	#find school
	for tem in School.objects.all():
		if tem.s_code == code:
			school = tem
			break

	result = []
	for a in school.activity_set.all():
		tem = {
		'id':a.id,
		'title':a.information.title,
		'introduction':a.brief_intro,
		'image_url':a.image.url,
		'safe_url':a.safe_file.url,
		'views':a.record.numViews,
		'favor':a.record.numFavor,
		}
		result = result + [tem]
		#number of views
		numberOfViewsPlus(a)

	return HttpResponse(json.dumps(result))

def showActivityDetail(request):
	a_id = request.GET['a_id']
	a = Activity.objects.get(id=a_id)
	#number of views
	numberOfViewsPlus(a)
	
	club = a.club.HC_club
	result = {
	'a_id':a.id,
	'a_title':a.information.title,
	'a_host':a.information.host,
	'a_undertake':a.information.undertake,
	'a_time':a.information.time,
	'a_area':a.information.area,
	'a_place':a.information.place,
	'a_tel':a.information.tel,
	'a_email':a.information.email,
	'a_number':a.information.number,
	'a_brief_intro':a.brief_intro,
	'a_detail_intro':a.detail_intro,
	'a_image_url':a.image.url,
	'a_safe_url':a.safe_file.url,
	'a_views':a.record.numViews,
	'a_favor':a.record.numFavor,
	'club_name':club.information.name,
	'club_logo':club.information.logo.url,
	'club_id':club.information.id,
	}
	return HttpResponse(json.dumps(result))

def showSelfFollowedActivity(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for s in user.activitysocialms_set.all():
		activity = s.activity
		tem = {
		'id':activity.id,
		"title":activity.information.title,
		"brief":activity.brief_intro,
		"image_url":activity.image.url,
		}
		result = result+[tem]
	return HttpResponse(json.dumps(result))

def showSelfCreateClubActivity(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for f in user.founderinfo_set.all():
		c = f.club
		for host in c.hostclub_set.all():
			activity = host.activity
			tem = {
			'id':activity.id,
			"title":activity.information.title,
			"brief":activity.brief_intro,
			"image_url":activity.image.url,
			}
			result = result + [tem]
	return HttpResponse(json.dumps(result))

def showSelfClubActivity(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for s in user.memberinfo_set.all():
		for host in s.club_set.all()[0].hostclub_set.all():
			activity = host.activity
			tem = {
			'id':activity.id,
			"title":activity.information.title,
			"brief":activity.brief_intro,
			"image_url":activity.image.url,
			}
			result = result + [tem]

	return HttpResponse(json.dumps(result))

#enroll with single
@csrf_exempt
def enrollWithSingle(request):
	grade = request.POST['grade']
	name = request.POST['name']
	major = request.POST['major']
	tel = request.POST['tel']
	email = request.POST['email']
	other = request.POST['other']
	a_id = request.POST['a_id']

	activity = Activity.objects.get(id=a_id)

	new_enroll = enrollSingle()
	new_enroll.grade = grade
	new_enroll.name = name
	new_enroll.major = major
	new_enroll.tel = tel
	new_enroll.email = email
	new_enroll.other = other
	new_enroll.activity = activity

	new_enroll.save()
	return HttpResponse('1')

#enroll with group
@csrf_exempt
def enrollWithGroup(request):
	cap_name = request.POST['cap_name']
	cap_tel = request.POST['cap_tel']
	cap_email = request.POST['cap_email']
	cap_major = request.POST['cap_major']
	a_id = request.POST['a_id']
	
	new_enroll = enrollGroup()
	new_enroll.cap_name = cap_name
	new_enroll.cap_major = cap_major
	new_enroll.cap_tel = cap_tel
	new_enroll.cap_email = cap_email
	new_enroll.activity = Activity.objects.get(id=a_id)

	#1
	try:
		new_enroll.m1_name = request.POST['m1_name']
		new_enroll.m1_major = request.POST['m1_major']
	except:
		new_enroll.m1_name = ''
		new_enroll.m1_major = ''
	#2
	try:
		new_enroll.m2_name = request.POST['m2_name']
		new_enroll.m2_major = request.POST['m2_major']
	except:
		new_enroll.m2_name = ''
		new_enroll.m2_major = ''
	#3
	try:
		new_enroll.m3_name = request.POST['m3_name']
		new_enroll.m3_major = request.POST['m3_major']
	except:
		new_enroll.m3_name = ''
		new_enroll.m3_major = ''
	#4
	try:
		new_enroll.m4_name = request.POST['m4_name']
		new_enroll.m4_major = request.POST['m4_major']
	except:
		new_enroll.m4_name = ''
		new_enroll.m4_major = ''
	#5
	try:
		new_enroll.m5_name = request.POST['m5_name']
		new_enroll.m5_major = request.POST['m5_major']
	except:
		new_enroll.m5_name = ''
		new_enroll.m5_major = ''
	#6
	try:
		new_enroll.m6_name = request.POST['m6_name']
		new_enroll.m6_major = request.POST['m6_major']
	except:
		new_enroll.m6_name = ''
		new_enroll.m6_major = ''
	#7
	try:
		new_enroll.m7_name = request.POST['m7_name']
		new_enroll.m7_major = request.POST['m7_major']
	except:
		new_enroll.m7_name = ''
		new_enroll.m7_major = ''
	#8
	try:
		new_enroll.m8_name = request.POST['m8_name']
		new_enroll.m8_major = request.POST['m8_major']
	except:
		new_enroll.m8_name = ''
		new_enroll.m8_major = ''
	#9
	try:
		new_enroll.m9_name = request.POST['m9_name']
		new_enroll.m9_major = request.POST['m9_major']
	except:
		new_enroll.m9_name = ''
		new_enroll.m9_major = ''
	#10
	try:
		new_enroll.m10_name = request.POST['m10_name']
		new_enroll.m10_major = request.POST['m10_major']
	except:
		new_enroll.m10_name = ''
		new_enroll.m10_major = ''
	
	new_enroll.save()
	return HttpResponse('1')

#get single enroll list
def getSingleEnrollList(request):
	a_id = request.GET['a_id']
	activity = Activity.objects.get(id=a_id)
	
	return 1

#get group enroll list
def getGroupEnrollList(request):
	return 1

#user action
def userFollowActivity(request):
	u_id = request.GET['u_id']
	a_id = request.GET['a_id']

	user = User_C.objects.get(id=u_id)
	activity = Activity.objects.get(id=a_id)

	social = activitySocialMS(activity=activity,user=user)
	social.save()

	return HttpResponse('ok')

def userUnfollowActivity(request):
	u_id = request.GET['u_id']
	a_id = request.GET['a_id']
	user = User_C.objects.get(id=u_id)

	for social in user.activitysocialms_set.all():
		if social.activity.id == int(a_id):
			social.delete()
			break

	return HttpResponse('ok')

def createGlobalNews(s_id,o_id,t):
	new_news = globalNews()
	new_news._subject_id = s_id
	new_news._object_id = o_id
	new_news.what = t
	c_time = time.localtime()
	new_news.when = str(c_time.tm_year)+'/'+str(c_time.tm_mon)+'/'+str(c_time.tm_mday)+' '+str(c_time.tm_hour)+':'+str(c_time.tm_min)+':'+str(c_time.tm_sec)
	new_news.school = Club.objects.get(id=s_id).school

	new_news.save()

def numberOfViewsPlus(activity):
	activity.record.numViews += 1
	activity.record.save()
