from django.urls import path

from . import views
from django.views.decorators.csrf import csrf_exempt

# backend1 routes are called by front end to perform database transactions
# backend routes are called to view/edit models db 
app_name = 'backend1'
urlpatterns = [
    path('create-label/',csrf_exempt(views.CreateLabel), name='create-label'),
    path('upload-images/',csrf_exempt(views.UploadImage), name='upload-image'),
    path('create-dataset/',csrf_exempt(views.CreateDataset), name='create-dataset'),
    path('get-image-to-label/<int:pk>',csrf_exempt(views.GetImageToLabel), name='get-image-to-label'),
    path('label-image/',csrf_exempt(views.LabelImage), name='label-image'),
    path('populate-db/',csrf_exempt(views.populate_db), name='populate-db'),
]

