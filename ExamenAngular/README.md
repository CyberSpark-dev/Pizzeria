# Examen Angular - Proyecto de Pizzería

Aplicación frontend desarrollada con Angular para gestionar ventas de una pizzería. Este proyecto forma parte del repositorio principal `proyecto_pizzeria`, junto con el backend `ExamenFlask`.

## Descripción funcional

La aplicación permite:

- Registrar pedidos de pizzas.
- Mostrar el detalle del pedido actual.
- Consultar ventas por día.
- Consultar las ventas por día o mes y desplegar el comprador y el detalle de productos, cantidades, ingredientes y subtotales.
- Enviar la información al backend para almacenarla en MySQL.

## Estructura del proyecto

```text
ExamenAngular/
├── src/
│   └── app/
│       ├── app.ts
│       ├── app.html
│       ├── app.css
│       ├── components/
│       │   ├── formulario-pedido/
│       │   ├── detalle-pedido/
│       │   └── ventas-dia/
│       └── services/
│           └── pizzeria.ts
├── angular.json
├── package.json
├── tsconfig.json
├── README.md
└── public/
```

## Requisitos previos

- Node.js
- npm
- Angular CLI (opcional, se puede usar el CLI local del proyecto)

## Instalación

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm start
```

La app quedará disponible en:

```text
http://localhost:4200/
```

## Compilar el proyecto

```bash
npm run build
```

## Ejecutar pruebas

```bash
npm test
```

## API utilizada

El servicio `src/app/services/pizzeria.ts` consume la API del backend, ubicado en `../ExamenFlask`:

```text
http://127.0.0.1:5000/api/ventas
```

## Relación con el proyecto completo

Este frontend pertenece a la carpeta `ExamenAngular`, mientras que la API y lógica de negocio se encuentran en `ExamenFlask` dentro del mismo repositorio principal.
