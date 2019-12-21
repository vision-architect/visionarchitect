from django.urls import include, path

from . import views

app_name = 'vision'

urlpatterns = [
    path('', views.index, name='index'),
    path('dataset/', views.dataset, name='dataset'),
]