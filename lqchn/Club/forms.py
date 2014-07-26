# -*- coding: utf-8 -*-
from django import forms

class uploadLogoForm(forms.Form):
    logo = forms.FileField()