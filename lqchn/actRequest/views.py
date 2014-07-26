# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from models import groundPost
from School.models import School
import json
import time
import random

def createGroundPost(request):
	content = request.POST['content']
	code = request.POST['code']
	t = request.POST['type']

	new_post = groundPost(content=content)
	c_time = time.localtime()
	new_post.time = str(c_time.tm_year)+'/'+str(c_time.tm_mon)+'/'+str(c_time.tm_mday)+' '+str(c_time.tm_hour)+':'+str(c_time.tm_min)+':'+str(c_time.tm_sec)
	name = ['钢铁侠','蝙蝠侠','大黄蜂','蜘蛛侠','机器猫','阿童木','山鸡','浩南哥','包皮','路人甲','路人乙','铁胆火车侠','胖虎','大雄','小丸子']
	new_post.name = name[random.randint(0,14)]

	if t == 'school':
		for s in School.objects.all():
			if s.s_code == code:
				new_post.school = s

	new_post.save()
	return HttpResponse('1')


def getPostList(request):
	code = request.GET['code']

	for s in School.objects.all():
		if s.s_code ==  code:
			school = s

	result = []
	for p in school.groundpost_set.all():
		tem = {
		'name':p.name,
		'content':p.content,
		'time':p.time,
		'id':p.id,
		'numFavor':p.numFavor,
		'code':p.school.s_code,
		}
		result = result + [tem]
	return HttpResponse(json.dumps(result))
