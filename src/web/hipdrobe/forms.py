from django import forms 
from django.contrib.auth.models import User 
from django.contrib.auth import get_user_model

class UserForm(forms.ModelForm):
    class Meta: 
        model = get_user_model()

        fields = ['username', 'email', 'password']
        widgets = {
        'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder':'15자 이내로 입력 가능합니다.'}),
        'email': forms.EmailInput(attrs={'class': 'form-control'}),
        'password' : forms.PasswordInput(attrs={'class': 'form-control'}),
        
    }
    labels = {
        'username': '닉네임',
        'email': '이메일',
        'password': '패스워드',
        
    }

class LoginForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['email', 'password']
# 글자수 제한
def __init__(self, *args, **kwargs):
    super(UserForm, self).__init__( *args, **kwargs)
    self.fields['email'].widget.attrs['maxlength'] =59
    