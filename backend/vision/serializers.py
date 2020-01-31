from rest_framework import serializers
from .models import *

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'