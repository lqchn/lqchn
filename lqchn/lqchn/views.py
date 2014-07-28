from django.template import RequestContext
from django.shortcuts import render
from django.contrib.auth import authenticate,login,logout

def index(request):
    return render(request, 'index/index.html')

def login(request):
    return render(request, 'login/login.html')

def register(request):
    return render(request, 'login/register.html')

def homepage(request):
	u_id = request.GET['u_id']
	return render(request,'pages/pages.html',{'u_id':u_id})

def jumpClubDetail(request):
	c_id = request.GET['c_id']
	return render(request,'clubDetail/clubDetail.html',{'c_id':c_id})

def jumpActivityDetail(request):
	a_id = request.GET['a_id']
	return render(request,'activityDetail/activity.html',{'a_id':a_id})

def userHome(request):
	u_id = request.GET['u_id']
	return render(request,'pages/pages.html',{'u_id':u_id})