from django.db import models
from rest_framework.authtoken.admin import User


class Blogdata(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)




