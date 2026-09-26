from django.contrib.auth.models import User

def check_account_exists(username):
    return User.objects.filter(username=username).exists()

