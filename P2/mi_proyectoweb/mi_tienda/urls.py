from django.urls import path
from django.contrib import admin
# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('list', views.list, name='list'),
    path('formu/', views.formu, name='formu'),
    path('recepcion/', views.recepcion, name='recepcion'),
    path('register/', views.register, name='register'),
    path('carrito/', views.carrito, name='carrito'),
    path('vercarrito/', views.vercarrito, name='vercarrito'),
    path('registerok/', views.registerok, name='registerok'),
    path('about/', views.about, name='about'),
]
