from django.shortcuts import render
from django.http import HttpResponse

from userAdmin.models import User_C
from Club.models import Club
from Activity.models import Activity
from Journal.models import Journal
from School.models import School

from friendsNews.models import globalNews

import json

def getSchoolGlobalNewsList(request):
	code = request.GET['code']
	for s in School.objects.all():
		if s.s_code == code:
			school = s
	result = []
	for news in school.globalnews_set.all():
		result = result + makeDictionary(news._subject_id,news._object_id,news.what,news.when,code)
	return HttpResponse(json.dumps(result))

def getAllGlobalNewsList(request):
	result = []
	for news in globalNews.objects.all():
		result = result + makeDictionary(news._subject_id,news._object_id,news.what,news.when,'')
	return HttpResponse(json.dumps(result))

def makeDictionary(s_id,o_id,what,when,code):
	if(what == '1'):
		user = User_C.objects.get(id=s_id)
		club = Club.objects.get(id=o_id)
		tem = {
		's_name':user.profile.BP_nickname,
		's_id':s_id,
		'o_name':club.information.name,
		'o_id':o_id,
		'what':what,
		'when':when,
		'code':code,
		}
		return [tem]

	elif(what == '2'):
		user = User_C.objects.get(id=s_id)
		club = Club.objects.get(id=o_id)
		tem = {
		's_name':user.profile.BP_nickname,
		's_id':s_id,
		'o_name':club.information.name,
		'o_id':o_id,
		'what':what,
		'when':when,
		'code':code,
		}
		return [tem]

	elif(what == '3'):
		club = Club.objects.get(id=s_id)
		activity = Activity.objects.get(id=o_id)
		tem = {
		's_name':club.information.name,
		's_id':s_id,
		'o_name':activity.information.title,
		'o_id':o_id,
		'what':what,
		'when':when,
		'code':code,
		}
		return [tem]	


	elif(what == '4'):
		club = Club.objects.get(id=s_id)
		journal = Journal.objects.get(id=o_id)
		tem = {
		's_name':club.information.name,
		's_id':s_id,
		'o_name':journal.detail.DC_title,
		'o_id':o_id,
		'what':what,
		'when':when,
		'code':code,
		}
		return [tem]	

