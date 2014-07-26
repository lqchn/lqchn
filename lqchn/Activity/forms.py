# -*- coding: utf-8 -*-
from django import forms

class uploadFileForm(forms.Form):
    image = forms.FileField()
    safe_file = forms.FileField()