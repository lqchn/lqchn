# -*- coding: utf-8 -*-
from django import forms

class uploadPhotoForm(forms.Form):
    photo = forms.FileField()
