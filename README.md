# SportsLine Backend

Proyecto backend con Node.js + TypeScript + Sequelize + PostgreSQL. Incluye modelos para Usuario, Cliente, Producto, Pedido y OrderDetail, seeds iniciales y ejemplos de requests.

## Requisitos
- Node.js 18+
- npm
- TypeScript y ts-node (dev)
- PostgreSQL (local o remoto)

## Instalación local
1. Instalar dependencias:
   ```bash
   npm i
   ```
2. Crear archivo `.env` con variables de conexión (ejemplo):
   ```
    DB_HOST = examplehost
    DB_NAME = example_db
    DB_USER = user_example
    DB_PASS = pass_example

    PORT = 3000

    JWT_SECRET = SuperSecretKey123
    JWT_REFRESH_SECRET = SuperSecretRefreshKey123

   ```

> Nota: ejecuta con `npm run dev`.  
> Nota: el proceso de seed de datos se ejecuta automáticamente al iniciar el servidor; no es necesario ejecutar scripts de seed manualmente.

## Rutas principales (ejemplos)

- Productos
  - GET /products
  - POST /products
  - PUT /products/:id
  - DELETE /products/:id

- Clientes
  - GET /clients
  - POST /clients
  - PUT /clients/:id
  - DELETE /clients/:id

- Pedidos
  - POST /orders         -> Registrar pedido
  - GET /orders          -> Consultar pedidos (filtros: clientId, productId)

- Usuarios
  - GET /users
  - POST /users/regsiter
  - POST /users/login
  - POST /users/refresh

## Ejemplos de requests (Postman / curl)

1) Registrar pedido (POST /orders)  
- URL:
  ```
  POST http://localhost:3000/orders
  ```
- Headers:
  ```
  Content-Type: application/json
  Authorization: Bearer <TU_TOKEN_AQUI>   # si aplica
  ```
- Body (raw JSON):
  ```json
  {
    "userId": 1,
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 2, "quantity": 1 }
    ]
  }
  ```
- curl:
  ```bash
  curl -X POST http://localhost:3000/orders \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TU_TOKEN_AQUI>" \
    -d '{"userId":1,"items":[{"productId":1,"quantity":2},{"productId":2,"quantity":1}]}'
  ```

2) Consultar pedidos (GET /orders) — filtrar por cliente  
- URL:
  ```
  GET http://localhost:3000/orders?clientId=1
  ```
- curl:
  ```bash
  curl "http://localhost:3000/orders?clientId=1"
  ```

3) Consultar pedidos — filtrar por producto  
- URL:
  ```
  GET http://localhost:3000/orders?productId=2
  ```
- curl:
  ```bash
  curl "http://localhost:3000/orders?productId=2"
  ```

4) Crear producto (POST /products)  
- Body (raw JSON):
  ```json
  {
    "code": "P004",
    "name": "Producto D",
    "description": "Descripción",
    "price": 12.99,
    "stock": 50
  }
  ```
- curl:
  ```bash
  curl -X POST http://localhost:3000/products \
    -H "Content-Type: application/json" \
    -d '{"code":"P004","name":"Producto D","description":"Descripción","price":12.99,"stock":50}'
  ```

5) Crear cliente mínimo (POST /clients)  
- Body:
  ```json
  {
    "name": "Cliente Ejemplo",
    "email": "cliente@example.com",
    "phone": "000000000"
  }
  ```
- curl:
  ```bash
  curl -X POST http://localhost:3000/clients \
    -H "Content-Type: application/json" \
    -d '{"name":"Cliente Ejemplo","email":"cliente@example.com","phone":"000000000"}'
  ```

## Notas y recomendaciones
- Asegura que `src/models/associations.ts` se importe antes de `sequelize.sync()` para registrar asociaciones.
- Usa transacciones para creación de pedido + detalles + actualización de stock.
- Revisa nombres de columnas (snake_case) vs atributos del modelo (camelCase). Si tu BD usa `user_id`/`client_id`/`unit_price`, mapea con `field` en los modelos o usa los nombres reales en queries.
- Si ves errores tipo "Unknown file extension .ts" al ejecutar, arranca con `node --loader ts-node/esm` o transpila con `tsc`.

---  
Colección Postman sugerida: crea una colección nueva y añade las requests anteriores. Ajusta Authorization y URLs según tu entorno.

