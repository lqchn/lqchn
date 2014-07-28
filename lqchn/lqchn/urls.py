from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
admin.autodiscover()

urlpatterns = patterns('',
    #for html
    url(r'^admin/', include(admin.site.urls)),
    url(r'^index/$','lqchn.views.index'),
    url(r'^login/$','lqchn.views.login'),
    url(r'^register/$','lqchn.views.register'),
    url(r'^pages/$','lqchn.views.homepage'),
    url(r'^club_home/$','lqchn.views.jumpClubDetail'),
    url(r'^activity_home/$','lqchn.views.jumpActivityDetail'),
    url(r'^home/$','lqchn.views.userHome'),

    #create new user
    url(r'^user/create/$','userAdmin.views.createNewUser'),
    #confirm user
    url(r'^user/login/$','userAdmin.views.confirmUser'),
    #get the information of the user who is using the browser
    url(r'^user/selfinfo/$','userAdmin.views.getSelfInfo'),
    #get user information in the main page
    url(r'^user/info/$','userAdmin.views.getUserInfo'),
    #get user information when user go to homepage
    url(r'^user/allinfo/$','userAdmin.views.getUserAllInfo'),
    #get user list which was recommended by server
    #url(r'^user/recommend/$','userAdmin.views.getRecommendUser'),
    #user update information
    url(r'^user/update/$','userAdmin.views.updateUserInfo'),
    #user update photo
    url(r'^user/photo/$','userAdmin.views.changeUserPhoto'),
    #user follow user
    url(r'^user/social/follow/$','userAdmin.views.userFollowUser'),
    #user unfollow user
    url(r'^user/social/unfollow/$','userAdmin.views.userUnfollowUser'),
    #show user following list
    url(r'^user/list/following/$','userAdmin.views.showUserFollowingList'),
    #show user followed list
    url(r'^user/list/followed/$','userAdmin.views.showUserFollowedList'),
    #show all user in one school
    url(r'user/list/school/$','userAdmin.views.showUserInSchool'),
    #show all comments in user model
    url(r'user/list/comment/$','userAdmin.views.showUserComment'),

    #create new club
    url(r'^club/create/$','Club.views.createNewClub'),
    #update club information
    url(r'^club/update/$','Club.views.updataClubInfo'),
    #show club list
    url(r'^club/list/all/$','Club.views.showClubList'),
    #show user created club
    url(r'^club/list/create/$','Club.views.showSelfCreatedClub'),
    #show user joined club
    url(r'^club/list/join/$','Club.views.showSelfJoinedClub'),
    #show club detail
    url(r'^club/detail/$','Club.views.showClubDetail'),
    #get recent activity of club
    url(r'^club/recent/activity/$','Club.views.getRecentActivity'),
    #get recent journal of club
    url(r'^club/recent/journal/$','Club.views.getRecentJournal'),
    #join member to club
    url(r'club/join/$','Club.views.joinMemberToClub'),
    #member quit from club
    url(r'club/quit/$','Club.views.memberQuitFromClub'),

    #post new activity
    url(r'^activity/create/$','Activity.views.createNewActivity'),
    #show activity list
    url(r'^activity/list/all/$','Activity.views.showActivityList'),
    #show activity detail
    url(r'^activity/detail/$','Activity.views.showActivityDetail'),
    #show user followed activity
    url(r'^activity/list/follow/$','Activity.views.showSelfFollowedActivity'),
    #show club(user joined) activity
    url(r'^activity/list/club/$','Activity.views.showSelfClubActivity'),
    #show self create activity list
    url(r'^activity/list/create/$','Activity.views.showSelfCreateClubActivity'),
    #user follow activity
    url(r'^activity/social/follow/$','Activity.views.userFollowActivity'),
    #user unfollow activity
    url(r'^activity/social/unfollow/$','Activity.views.userUnfollowActivity'),
    #enroll with single
    url(r'^activity/enroll/single/$','Activity.views.enrollWithSingle'),
    #enroll with group
    url(r'^activity/enroll/group/$','Activity.views.enrollWithGroup'),

    #post new journal
    url(r'^journal/create/$','Journal.views.createNewJournal'),
    #show journal list
    url(r'^journal/list/all/$','Journal.views.showJournalList'),
    #show journal detail
    url(r'^journal/detail/$','Journal.views.showJournalDetail'),
    #show club(user joined) journal list
    url(r'^journal/list/club/$','Journal.views.showSelfClubJournal'),
    #show activity(user followed) journal list
    url(r'^journal/list/activity/$','Journal.views.showSelfActivityJournal'),

    #post comment
    url(r'^comment/post/$','Comment.views.createNewComment'),
    #post reply
    url(r'^comment/reply/$','Comment.views.createNewReply'),

    #get global news in school
    url(r'^news/list/school/$','friendsNews.views.getSchoolGlobalNewsList'),
    #get all global news
    url(r'^news/list/all/$','friendsNews.views.getAllGlobalNewsList'),

    #create ground post in school
    url(r'^ground/create/$','actRequest.views.createGroundPost'),

    #get list of ground post
    url(r'^ground/list/school/$','actRequest.views.getPostList'),

)

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
