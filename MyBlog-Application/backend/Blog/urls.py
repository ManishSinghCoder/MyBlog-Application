from django.urls import path
from .import views

urlpatterns = [
    path('all',views.getAllUsers),
    path('login',views.login),
    path('register',views.register),
    path('blogpost',views.BlogPostCreate),
    path('update/<int:id>',views.BlogPostUpdate),
    path('delete/<int:id>',views.BlogPostDelete),
    path('view',views.BlogPostView),
    path('allview',views.BlogPost)
]
