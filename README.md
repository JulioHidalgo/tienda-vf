🛒 Tienda Vue - Vue Router + Vuex + Firebase

Proyecto desarrollado con Vue 3, Vue Router, Vuex, Bootstrap y Firebase Firestore.

La aplicación permite visualizar productos desde Firebase, agregarlos a un carrito de compras y generar un resumen de pedido, guardando la compra en la base de datos.


📌 Características

Aplicación SPA (Single Page Application)

Uso de Vue Router

Gestión de estado global con Vuex

Interfaz con Bootstrap

Productos almacenados en Firebase Firestore

Guardado del detalle de compra en Firebase

Componentes reutilizables

Uso de cards para mostrar productos
<br>

🧱 Tecnologías utilizadas

Vue 3

Vue Router

Vuex

Bootstrap 5

Firebase

Firestore Database

JavaScript

HTML

CSS
<br>

📂 Estructura del proyecto
src
│
├── components
│   ├── Products.vue
│   ├── Cart.vue
│   └── OrderSummary.vue
│
├── views
│   └── HomeView.vue
│
├── store
│   └── index.js
│
├── router
│   └── index.js
│
├── firebase.js
│
├── App.vue
└── main.js

<br>
⚙️ Instalación del proyecto

Clonar el repositorio

git clone https://github.com/JulioHidalgo/tienda-vf.git

Entrar al proyecto

cd tienda-vf

Instalar dependencias

npm install

Ejecutar el proyecto

npm run serve

Abrir en el navegador

http://localhost:8080
<br>
🔥 Configuración de Firebase

Crear un proyecto en Firebase Console

https://console.firebase.google.com

Crear una base de datos Firestore

Crear la colección:

products

Ejemplo de documento:

{
  "name": "Polera Vue",
  "price": 9990,
  "image": "https://via.placeholder.com/600x400",
  "description": "Polera oficial Vue"
}

Crear colección para guardar compras

orders
🧠 Funcionamiento de la aplicación
1️⃣ Productos

Los productos se obtienen desde Firebase Firestore y se muestran en cards Bootstrap.

Cada producto tiene un botón:

Agregar al carrito
2️⃣ Carrito de compras

El carrito almacena productos en Vuex Store, permitiendo:

agregar productos

eliminar productos

disminuir cantidad

3️⃣ Resumen de pedido

Muestra:

cantidad de productos

total de la compra

Botón:

Finalizar compra

Guarda el pedido en Firebase en la colección orders.
<br>
📊 Vuex Store

El estado global contiene:

state
products
cart

Getters:

cartCount
cartTotal

Mutations:

ADD_TO_CART
REMOVE_FROM_CART
CLEAR_CART

Actions:

fetchProducts
checkout
🖥 Componentes
Products.vue

Muestra los productos

Usa cards de Bootstrap

Permite agregar productos al carrito

Cart.vue

Lista los productos del carrito

Permite modificar cantidades

OrderSummary.vue

Muestra el total de compra

Permite finalizar pedido

📦 Ejemplo de flujo de compra

Usuario entra al sitio

Se cargan productos desde Firebase

Usuario agrega productos al carrito

Vuex actualiza el estado global

Se calcula el total automáticamente

Usuario finaliza compra

Compra se guarda en Firebase

🎯 Objetivo del proyecto

Aplicar conceptos de:

Vue Router

Vuex

Consumo de base de datos

Componentes en Vue

Manejo de estado global

SPA
<br>
📚 Autor

Proyecto desarrollado como actividad académica de Vue.js.

Autor:
Tu Nombre : Julio Hidalgo Jara
