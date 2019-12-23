from django.db import models
# Create your models here.
class Dataset(models.Model):
    dataset_name = models.CharField(max_length=255)
    dataset_description = models.CharField(max_length=500, default='')
    def __str__(self):
        return self.dataset_name

class Label(models.Model):
    label_name = models.CharField(max_length=255)
    label_description = models.CharField(max_length=255, default='')
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    def __str__(self):
        return self.label_name

class Image(models.Model):
    img_url = models.CharField(max_length=255)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    def __str__(self):
        return self.img_url

    
    


