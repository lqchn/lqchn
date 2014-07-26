from django.shortcuts import render
from django.http import HttpResponse
from models import Journal
from models import detailContent,recordInfo
from Activity.models import Activity
from School.models import School
from userAdmin.models import User_C
from friendsNews.models import globalNews
from Club.models import Club

import json
import time

from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def createNewJournal(request):
	title = request.POST['j_t']
	content = request.POST['j_c']
	a_id = request.POST['a_id']
	author = request.POST['author']
	editor = request.POST['editor']

	ac = Activity.objects.get(id=a_id)

	detail = detailContent()
	detail.DC_title = title
	detail.DC_html = content
	detail.DC_author = author
	detail.DC_editor = editor
	detail.save()

	#record
	record = recordInfo()
	record.save()

	new_journal = Journal()
	new_journal.detail = detail
	new_journal.school = ac.school
	new_journal.record = record
	new_journal.save()

	ac.journal = new_journal
	ac.save()

	createGlobalNews(a_id,new_journal.id,'4')

	return HttpResponse('1')

#list of journal
def showJournalList(request):
	code = request.GET['code']
	#find school
	for tem in School.objects.all():
		if tem.s_code == code:
			school = tem
			break

	type1 = []
	type2 = []
	type3 = []
	type4 = []
	type5 = []
	for j in school.journal_set.all():
		tem = {
		"title":j.detail.DC_title,
		"activity_id":j.activity.id,
		}
		t = j.activity.club.HC_club.information.cb_type
		if(t == '1'):
			type1 = type1 + [tem]
		elif(t == '2'):
			type2 = type2 + [tem]
		elif(t == '3'):
			type3 = type3 + [tem]
		elif(t == '4'):
			type4 = type4 + [tem]
		elif(t == '5'):
			type5 = type5 + [tem]
	result = {
	'type1':type1,
	'type2':type2,
	'type3':type3,
	'type4':type4,
	'type5':type5,
	}

	return HttpResponse(json.dumps(result))

def showJournalDetail(request):
	a_id = request.GET['a_id']
	activity = Activity.objects.get(id=a_id)
	journal = activity.journal
	result = {
	"title":journal.detail.DC_title,
	"html":journal.detail.DC_html,
	"author":journal.detail.DC_author,
	"editor":journal.detail.DC_editor,
	"activity_id":activity.id,
	"activity_title":activity.information.title,
	}
	return HttpResponse(json.dumps(result))

def showSelfClubJournal(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for s in user.clubsocialms_set.all():
		for host in s.club.hostclub_set.all():
			journal = host.activity.journal
			tem = {
			"title":journal.detail.DC_title,
			"content":journal.detail.DC_html
			}
			result = result + [tem]

	return HttpResponse(json.dumps(result))

def showSelfActivityJournal(request):
	u_id = request.GET['u_id']
	user = User_C.objects.get(id=u_id)

	result = []
	for s in user.activitysocialms_set.all():
		journal = s.activity.journal
		tem = {
		"title":journal.detail.DC_title,
		"content":journal.detail.DC_html
		}
		result = result + [tem]

	return HttpResponse(json.dumps(result))

def createGlobalNews(s_id,o_id,t):
	new_news = globalNews()
	new_news._subject_id = s_id
	new_news._object_id = o_id
	new_news.what = t
	c_time = time.localtime()
	new_news.when = str(c_time.tm_year)+'/'+str(c_time.tm_mon)+'/'+str(c_time.tm_mday)+' '+str(c_time.tm_hour)+':'+str(c_time.tm_min)+':'+str(c_time.tm_sec)
	new_news.school = Club.objects.get(id=s_id).school

	new_news.save()
