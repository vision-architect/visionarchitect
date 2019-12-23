from django.urls import include, path

from . import views

app_name = 'vision'
urlpatterns = [
    path('', views.index, name='index'),
    path('dataset/viewall/',views.view_all.as_view(), name='viewall'),
    path('dataset/<int:pk>', views.detail_view.as_view(), name='detail'),
    path('dataset/create', views.create_dataset, name='create_dataset'),
    path('dataset/created', views.create_dataset_handler, name='create_dataset_handler'),
    path('dataset/<int:pk>/delete', views.delete_dataset, name='delete_dataset'),
    path('dataset/<int:pk>/edit-name', views.edit_dataset_name, name='edit_dataset_name'),
    path('dataset/<int:pk>/edited-name', views.edit_dataset_name_handler, name='edit_dataset_name_handler'),
    path('dataset/<int:pk>/edit-description', views.edit_dataset_description, name='edit_dataset_description'),
    path('dataset/<int:pk>/edited-description', views.edit_dataset_description_handler, name='edit_dataset_description_handler'),
    path('dataset/<int:pk>/add-label', views.add_label, name='add_label'),
    path('dataset/<int:pk>/added-label', views.add_label_handler, name='add_label_handler'),
    path('dataset/<int:pk>/label/<int:label_pk>/edit', views.edit_label, name='edit_label'),
    path('dataset/<int:pk>/label/<int:label_pk>/edited', views.edit_label_handler, name='edit_label_handler'),
    path('dataset/<int:pk>/label/<int:label_pk>/delete', views.delete_label, name='delete_label'),
]

