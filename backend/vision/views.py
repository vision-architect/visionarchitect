from django.shortcuts import get_object_or_404
from rest_framework import viewsets          
from .serializers import *      
from .models import *   
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from django.core.files import File
from io import BytesIO
from PIL import Image as PIL_img
from django.core.files import File


class DatasetView(viewsets.ModelViewSet):
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()

class LabelView(viewsets.ModelViewSet):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

def CreateLabel(request):
    # generate a new label for associated dataset
    if request.method == "POST":
        label_name = request.POST['label_name']
        label_description = request.POST['label_description']
        dataset_id = request.POST['dataset']
        dataset = get_object_or_404(Dataset, pk=dataset_id)
        label = Label.objects.create(label_name=label_name,
            label_description=label_description, dataset=dataset)
    return HttpResponse('label created')

def UploadImage(request):    
    # uploads an image associated to a dataset, labelled with unlabelled label
    # currently saves image locally and saves path to image as img_file_path
    if request.method == "POST":
        dataset = get_object_or_404(Dataset,pk=request.POST['dataset'])
        unlabelled = get_object_or_404(Label, dataset=dataset,label_name='unlabelled')
        img_files = request.FILES
        for i, id in enumerate(img_files):
            img=PIL_img.open(BytesIO(img_files[id].read()))
            img.save(f'{id}','JPEG')
            new_img = Image.objects.create(label=unlabelled, img_file_path=f'./{id}')
    return HttpResponse('images uploaded')

def CreateDataset(request):
    # generates a new dataset and creates unlabelled and trash labels
    if request.method == "POST":
        dataset_name = request.POST['dataset_name']
        dataset_description = request.POST['dataset_description']
        dataset = Dataset.objects.create(dataset_name=dataset_name, dataset_description=dataset_description)
        label = Label.objects.create(label_name='unlabelled',
            label_description='autogenerated unlabelled label', dataset=dataset)
        label = Label.objects.create(label_name='Trash',
            label_description='autogenerated trashed label', dataset=dataset)
    return HttpResponse('dataset created')

def GetImageToLabel(request, pk):
    # returns to frontend an unlabelled image for labelling  
    unlabelled = get_object_or_404(Label, dataset=pk,label_name='unlabelled')
    image = Image.objects.filter(label=unlabelled)
    if image:
        image=image[0]
        data = {
            'img_url': image.__str__(), 
            'img_file_path':image.img_file_path,
            'img_id':image.id
            }
        return JsonResponse(data)
    else:
        return HttpResponseNotFound('no images avaliable')

def LabelImage(request):
    # change label of an image from unlabelled to a user selected label 
    if request.method == "POST":
        image_id = request.POST['image']
        label_id = request.POST['label']
        image = get_object_or_404(Image,pk=image_id)
        label = get_object_or_404(Label,pk=label_id)
        image.label = label
        image.save()
    return HttpResponse('label updated')

def populate_db(request):
    # request to add test images to dataset 2 originally labelled as unlabelled
    urls = [
       'https://i.imgur.com/gdWIxn2.jpg',
       'https://40cupx20bt643wowwz361l9h-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/kitty-1080x675.jpg',
        'https://meatmenstore.com/wp-content/uploads/2017/07/maxresdefault-1-1024x640-1620x600.jpg',
        'https://meatmenstore.com/wp-content/uploads/2017/07/famous-internet-cats-181.jpg',
        'https://lh3.googleusercontent.com/I4cn80AVkayHtsLMCNjsmmAtsHladh9c_VvC1mwtf3ZCNpyWyf-VkUS60TasCB66NojwxEy2YcdUH1Y9ev5QWFpD6fHUP7HR_oGX-ailV7Y7PvzTGVfvzz1vNrD7gGR1Qa7cS1SZ',
        'https://www.elityavru.com/yavru-kopek-kedi/resim/pomeraniansnow2-2.jpg',
        'https://www.petmd.com/sites/default/files/petmd-dog-tongue.jpg',
        'https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg',
        'https://www.mypetsname.com/wp-content/uploads/2019/07/Funny-Fish.jpg',
        'https://www.mypetsname.com/wp-content/uploads/2019/07/Funny-Fish-Face.jpg',
        'https://i.pinimg.com/736x/e7/64/66/e7646642b4f052f76cff686469fa25c9.jpg',
        'https://moderndiplomacy.eu/wp-content/uploads/2017/12/98fd104a10357987e6f8d1058a37d056.jpg'
    ]
    dataset = get_object_or_404(Dataset,pk=2)
    labels = Label.objects.filter(dataset=dataset)
    for label in labels:
        Image.objects.filter(label=label).delete()
    unlabelled = get_object_or_404(Label,dataset=dataset,label_name='unlabelled')
    for url in urls:
        Image.objects.create(label=unlabelled,img_url=url)
    return HttpResponse('created sample data')