from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from backend import views

# set up router to backend 
router = routers.DefaultRouter()
router.register(r'datasets', views.DatasetView, 'datasets')
router.register(r'labels', views.LabelView, 'labels')
router.register(r'images', views.ImageView, 'images')
# router.register(r'labels/create', views.CreateLabel, 'create-label')

urlpatterns = [
    path('vision/', include('vision.urls')),
    path('admin/', admin.site.urls),
    path('backend/',include(router.urls)),
    path('backend1/',include('backend.urls'))
]
