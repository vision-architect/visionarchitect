from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import Image, Dataset, Label

# Create your views here.
def index(request):
    return HttpResponse("[vision index page]")

class view_all(generic.ListView):
    model = Dataset
    template_name='vision/viewall.html'

    def get_queryset(self):
        return Dataset.objects.order_by('dataset_name')

class detail_view(generic.DetailView):
    model = Dataset
    template_name = 'vision/detail.html'

    def get_context_data(self, ** kwargs):
        context = super().get_context_data(**kwargs)
        labels = Label.objects.filter(dataset=context['dataset']).order_by('label_name')
        context['labels'] = labels
        imgs = []
        for label in labels:
            imgs += Image.objects.filter(label=label)
        context['images']=imgs
        return context

def create_dataset(request):
    return render(request, 'vision/create_dataset.html', {})

def create_dataset_handler(request):
    dataset_name = request.POST['dataset_name']
    dataset_description = request.POST['dataset_description']
    dataset = Dataset.objects.create(dataset_name=dataset_name, dataset_description=dataset_description)
    label = Label.objects.create(label_name = 'unlabelled', dataset=dataset)
    return redirect('vision:detail',pk=dataset.pk)

def delete_dataset(request, pk):
    Dataset.objects.filter(pk=pk).delete()
    return redirect('vision:viewall')

def edit_dataset_name(request, pk):
    old_name = get_object_or_404(Dataset, pk=pk).dataset_name
    return render(request, 'vision/edit_dataset_name.html', {'pk':pk, 'old_name':old_name,})

def edit_dataset_name_handler(request, pk):
    new_name = request.POST['dataset_name']
    dataset = get_object_or_404(Dataset, pk=pk)
    dataset.dataset_name = new_name
    dataset.save()
    return redirect('vision:detail',pk=pk)

def edit_dataset_description(request, pk):
    old_description = get_object_or_404(Dataset, pk=pk).dataset_description
    return render(request, 'vision/edit_dataset_description.html', {'pk':pk, 'old_description':old_description,})

def edit_dataset_description_handler(request, pk):
    new_description = request.POST['dataset_description']
    dataset = get_object_or_404(Dataset, pk=pk)
    dataset.dataset_description = new_description
    dataset.save()
    return redirect('vision:detail',pk=pk)

def add_label(request, pk):
    return render(request, 'vision/add_label.html', {'pk':pk})

def add_label_handler(request, pk):
    label_name = request.POST['label_name']
    label_description = request.POST['label_description']
    dataset = get_object_or_404(Dataset, pk=pk)
    label = Label.objects.create(label_name=label_name,
        label_description=label_description, dataset=dataset)
    return redirect('vision:detail',pk=pk)

def delete_label(request, pk, label_pk):
    label = get_object_or_404(Label, pk=label_pk)
    if label.label_name == 'unlabelled':
        return HttpResponse("[vision cannot delete unlabelled]")
    dataset = get_object_or_404(Dataset, pk=pk)
    unlabelled = get_object_or_404(Label, dataset=dataset, label_name='unlabelled')
    images = Image.objects.filter(label=label)
    for image in images:
        image.label=unlabelled
        image.save()
    label.delete()
    return redirect('vision:detail',pk=pk)

def edit_label(request, pk, label_pk):
    old_label = Label.objects.filter(pk=label_pk)[0].label_name
    return render(request, 'vision/edit_label.html', {'pk':pk, 'label_pk':label_pk, 'old_label':old_label,})

def edit_label_handler(request, pk, label_pk):
    new_label = request.POST['label_name']
    label = get_object_or_404(Label, pk=label_pk)
    label.label_name = new_label
    label.save()
    return redirect('vision:detail',pk=pk)
