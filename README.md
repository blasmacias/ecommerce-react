# NexusStore - E-commerce React

E-commerce desarrollado con React JS y Firebase como proyecto final del curso.

## Tecnologías utilizadas

- React 19
- Vite
- React Router DOM
- Firebase / Firestore
- Context API

## Funcionalidades

- Listado de productos por categoría
- Vista de detalle de producto
- Carrito de compras con Context
- Checkout con validación de formulario
- Generación de orden en Firestore

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` con las credenciales de Firebase (ver `.env.example`)
4. Correr el proyecto: `npm run dev`

## Estructura de componentes
App
├── NavBar
│   └── CartWidget
├── ItemListContainer
│   └── ItemList
│       └── Item
├── ItemDetailContainer
│   └── ItemDetail
│       └── ItemCount
├── Cart
│   └── CartItem
└── CheckoutForm\

## Decisiones de diseño

- Se utilizó Context API para el manejo global del carrito
- Se separaron los componentes contenedores de los presentacionales
- Custom hook `useProducts` para abstraer la lógica de Firestore
- Firestore como base de datos para productos y órdenes.