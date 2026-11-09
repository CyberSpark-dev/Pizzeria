# Proyecto Pizzería

Aplicación web para gestionar pedidos y ventas de una pizzería, separada en dos proyectos principales:

- Frontend: `ExamenAngular`
- Backend: `ExamenFlask`
- Base de datos: MySQL

## Descripción
El proyecto está organizado en dos módulos independientes pero conectados:

- `ExamenAngular`: interfaz gráfica desarrollada con Angular para registrar pedidos, mostrar detalle y consultar ventas del día.
- `ExamenFlask`: API REST desarrollada con Flask para registrar y consultar ventas.
- `database/`: estructura o scripts relacionados con la base de datos.

## Estructura del proyecto
```text
proyecto_pizzeria/
├── ExamenAngular/
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── README.md
├── ExamenFlask/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   └── venv/
├── database/
├── .gitignore
├── README.md
└── .git/
```

## Requisitos
- Node.js 18+
- npm
- Python 3.10+
- MySQL
- Entorno virtual de Python

## Instalación y ejecución del backend
1. Abre una terminal dentro de `ExamenFlask/`.
2. Crea o activa el entorno virtual:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Configura la conexión a MySQL en `config.py`.
5. Ejecuta la API:
   ```bash
   python app.py
   ```

## Instalación y ejecución del frontend
1. Abre una terminal dentro de `ExamenAngular/`.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```
4. Abre el navegador en:
   ```text
   http://localhost:4200
   ```

## Funcionalidades principales
- Registro de datos del cliente.
- Selección de tamaño, ingredientes y cantidad de pizzas.
- Agregado inmediato al detalle del pedido.
- Cálculo del subtotal y total del pedido.
- Confirmación antes de guardar la venta.
- Consulta de ventas por día o por mes.
- Persistencia en base de datos MySQL.

## Endpoints principales del backend
- `POST /api/ventas` — registra una nueva venta.
- `GET /api/ventas/buscar/<criterio>` — busca ventas por día o mes.

## Notas importantes
- El frontend y el backend se mantienen en carpetas separadas con nombres específicos: `ExamenAngular` y `ExamenFlask`.
- La API del backend se comunica desde Angular con la ruta:
  ```text
  http://127.0.0.1:5000/api/ventas
  ```
- La base de datos debe existir antes de ejecutar la API.

## Comandos útiles
```bash
# Backend
cd ExamenFlask
python app.py

# Frontend
cd ExamenAngular
npm install
npm start
```
