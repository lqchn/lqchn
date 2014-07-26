from django.contrib import admin
from models import cmtClub,cmtUser,cmtActivity,cmtJournal,cmtPost
from models import replyClub,replyUser,replyActivity,replyJournal,replyPost

admin.site.register(cmtClub)
admin.site.register(cmtUser)
admin.site.register(cmtActivity)
admin.site.register(cmtJournal)
admin.site.register(cmtPost)

admin.site.register(replyUser)
admin.site.register(replyClub)
admin.site.register(replyPost)
admin.site.register(replyJournal)
admin.site.register(replyActivity)
