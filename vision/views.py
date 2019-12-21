from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from django.utils import timezone


# Create your views here.
def index(request):
    return HttpResponse("[vision index page]")

def dataset(request):
    # return render(request, 'vision/dataset.html')
    return HttpResponse("[vision view dataset page]")

def create_dataset(request, dataset_name):
    return HttpResponse("[vision create dataset page]")
