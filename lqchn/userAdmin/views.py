from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import auth
from models import User_C
from models import basicProf, statusFlag, Following, Followed
from School.models import School
from .forms import uploadPhotoForm
import json

from django.views.decorators.csrf import csrf_exempt 

@csrf_exempt
def createNewUser(request):
    un = request.POST['un']
    pw = request.POST['pw']
    nick = request.POST['nickname']

    # create user
    try:
        u = User.objects.create_user(username=un, password=pw)
        u.save
    except:
        return HttpResponse('error 00001 username existed')


    #create basic information
    bp = basicProf(BP_nickname=nick)
    bp.save()

    new_user = User_C()
    new_user.user = u
    new_user.profile = bp
    new_user.email = un
    new_user.save()
    login = auth.authenticate(username=un, password=pw)
    auth.login(request,login)
    return HttpResponseRedirect('/index/')


@csrf_exempt
def confirmUser(request):
    un = request.POST['un']
    pw = request.POST['pw']
    user = auth.authenticate(username=un, password=pw)
    if user:
        auth.login(request, user)
        #return render(request, 'index/index.html')
        return HttpResponseRedirect('/index/')
    else:
        return HttpResponse('error 00002 failed to login')


def getUserInfo(request):
    user = request.user

    for u in User_C.objects.all():
        if u.user.username == user.username:
            url = ''
            school = ''
            try:
                url = u.profile.BP_photo.url
            except:
                url = ''
            try:
                school = u.school.s_code
            except:
                school = ''
            result = {
                'id': u.id,
                'name': u.profile.BP_nickname,
                'photo_url': url,
                'code': school,
            }
    try:
        return HttpResponse(json.dumps(result))
    except:
        return HttpResponse(user.username)

def getUserAllInfo(request):
    id = request.GET['id']
    user = User_C.objects.get(id=id)
    #judge this is the page owner or other user
    u = request.user
    self_page = 0
    create_club = 0
    if user.user.username == u.username:
        self_page = 1
        if user.school:
            create_club = 1
    else:
        self_page = 0

    #basic information
    profile = user.profile
    try:
        school = user.school.s_code
    except:
        school = ''
    result = {
        'self':self_page,
        'name': profile.BP_name,
        'nickname': profile.BP_nickname,
        'sex': profile.BP_sex,
        'sign': profile.BP_sign,
        'home': profile.BP_home,
        'schoolpro': profile.BP_location,
        'birthday': profile.BP_birthday,
        'code': school,
        'entrance': profile.BP_entrance,
        'major': profile.BP_major,
        'interest': profile.BP_interest,
        'qq': user.qq,
        'tel': user.tel,
        'email': user.email,
        'weibo':user.weibo,
        'wechat':user.wechat,
        'following':len(user.followingTable.all()),
        'followed':len(user.followedTable.all()),
        'create_club':create_club,
    }
    return HttpResponse(json.dumps(result))

@csrf_exempt
def updateUserInfo(request):
    #required
    id = request.POST['id']
    code = request.POST['code']
    #opinion
    try:
        name = request.POST['name']
    except:
        name = ""
    try:
        nickname = request.POST['nickname']
    except:
        nickname = ""
    try:
        sex = request.POST['sex']
    except:
        sex = ""
    try:
        sign = request.POST['sign']
    except:
        sign = ""
    try:
        birth_y = request.POST['year']
        birth_m = request.POST['month']
        birth_d = request.POST['day']
        birthday = birth_y+'/'+birth_m+'/'+birth_d
    except:
        birthday = ""
    try:
        entrance = request.POST['entrance']
    except:
        entrance = ""
    try:
        interest = request.POST['interest']
    except:
        interest = ""
    try:
        qq = request.POST['qq']
    except:
        qq = ""
    try:
        tel = request.POST['tel']
    except:
        tel = ""
    try:
        weibo = request.POST['weibo']
    except:
        weibo = ""
    try:
        wechat = request.POST['wechat']
    except:
        wechat = ""
    try:
        location = request.POST['schoolpro']
    except:
        location = ""
    #address
    try:
        homepro = request.POST['province']
        homecity = request.POST['city']
        home = homepro+'-'+homecity
    except:
        home = ""

    if entrance:
        entrance = entrance
    else:
        entrance = ""

    user = User_C.objects.get(id=id)
    profile = user.profile
    profile.BP_name = name
    profile.BP_nickname = nickname
    profile.BP_sex = sex
    profile.BP_sign = sign
    profile.BP_home = home
    profile.BP_birthday = birthday
    profile.BP_entrance = entrance
    profile.BP_interest = interest
    profile.BP_location = location
    try:
        form = uploadPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            profile.BP_photo = request.FILES['photo']
        profile.save()
    except:
        profile.save()

    #school
    for s in School.objects.all():
        if code == s.s_code:
            user.school = s

    user.qq = qq
    user.tel = tel
    user.weibo = weibo
    user.wechat = wechat
    user.save()

    return HttpResponse('1')

@csrf_exempt
def changeUserPhoto(request):
    id = request.POST['id']
    user = User_C.objects.get(id=id)
    form = uploadPhotoForm(request.POST, request.FILES)
    if form.is_valid():
        user.profile.BP_photo = request.FILES['photo']
        user.profile.save()
        return HttpResponse('1')
    else:
        return HttpResponse('0')

def userFollowUser(request):
    user = request.user

    for u in User_C.objects.all():
        if u.user.username == user.username:
            u_id = u.id

    f_id = request.GET['f_id']
    user = User_C.objects.get(id=u_id)
    f_user = User_C.objects.get(id=f_id)

    user.followingTable.create(followingID=f_id)
    f_user.followedTable.create(followedID=u_id)

    return HttpResponse('1')


def userUnfollowUser(request):
    user = request.user

    for u in User_C.objects.all():
        if u.user.username == user.username:
            u_id = u.id

    f_id = request.GET['f_id']
    user = User_C.objects.get(id=u_id)
    f_user = User_C.objects.get(id=f_id)

    for fing in user.followingTable.all():
        if fing.followingID == f_user.id:
            fing.delete()
            break

    for fed in f_user.followedTable.all():
        if fed.followedID == user.id:
            fed.delete()
            break

    return HttpResponse('1')


def showUserFollowingList(request):
    u_id = request.GET['u_id']
    user = User_C.objects.get(id=u_id)

    result = []
    for f in user.followingTable.all():
        user = User_C.objects.get(id=f.followingID)
        url = ''
        try:
            url = user.profile.BP_photo.url
        except:
            url = ''
        tem = {
            "user_id": f.followingID,
            "user_name": user.profile.BP_name,
            "user_nick": user.profile.BP_nickname,
            "user_photo": url,
        }
        result = result + [tem]

    return HttpResponse(json.dumps(result))


def showUserFollowedList(request):
    u_id = request.GET['u_id']
    user = User_C.objects.get(id=u_id)

    result = []
    for f in user.followedTable.all():
        user = User_C.objects.get(id=f.followedID)
        url = ''
        try:
            url = user.profile.BP_photo.url
        except:
            url = ''
        tem = {
            "user_id": f.followedID,
            "user_name": user.profile.BP_name,
            "user_nick": user.profile.BP_nickname,
            "user_photo": url,
        }
        result = result + [tem]

    return HttpResponse(json.dumps(result))

def showUserInSchool(request):
    code = request.GET['code']
    for s in School.objects.all():
        if s.s_code == code:
            result = []
            for u in s.user_c_set.all():
                tem = {
                "user_id":u.id,
                "user_name":u.profile.BP_name,
                "user_nick":u.profile.BP_nickname,
                "user_photo":u.profile.BP_photo.url,
                }
                result = result + [tem]
            return HttpResponse(json.dumps(result))
    return HttpResponse('0')

def showUserComment(request):
    id = request.GET['id']
    u_id = request.GET['u_id']
    user = User_C.objects.get(id=id)
    comment = []
    for c in user.cmtuser_set.all():
        reply = []
        for r in c.replyuser_set.all():
            tem = {
            "c_id":c.id,
            "r_id":r.id,
            "nickname":r.CR_send.profile.BP_nickname,
            "time":r.CR_time,
            "content":r.CR_content,
            }
            reply = reply + [tem]
        comment = comment + [reply]
        result = {
        "comment":comment,
        "main_id":id,
        "user_id":u_id,
        }
    return HttpResponse(json.dumps(result))
