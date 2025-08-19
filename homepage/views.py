from django.shortcuts import render

# Create your views here.
def homeview(request):
    return render(request, 'index.html')

def aboutview(request):
    return render(request, 'about.html')

def infoview(request):
    return render(request, 'info.html')