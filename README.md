HISTORIAS DE USUARIOS
Nombre de la HU: 
Setup inicial del proyecto
Objetivo de la HU
La empresa SportsLine ha decidido dar el primer paso hacia la transformación digital. Como parte del equipo backend, tu reto es levantar las bases sólidas del sistema: preparar el proyecto para que pueda crecer de forma ordenada y confiable. Por lo cual, como desarrollador backend tienes la responsabilidad de configurar la base del proyecto con Node.js, Typescript y PostgreSQL para garantizar un entorno estandarizado, versionado y listo para futuras integraciones.
TASK1
Inicializar proyecto Node.js + TS

  Crear package.json, instalar dependencias básicas (express, typescript, ts-node, nodemon).
  Configurar tsconfig.json.

TASK2
Configurar estructura de carpetas

  Crear módulos separados (models, controllers, routes, middlewares).
  Separación de capas (DTO, DAO).

TASK 3
Configurar Sequelize con PostgreSQL

  Definir conexión en archivo .env.
  Crear modelos iniciales: Producto, Cliente, Usuario.

TASK 4
Crear seeds de datos iniciales

    • Poblar tabla Usuario con un admin inicial.
    •  Poblar tabla Producto con 2-3 registros de ejemplo.
TASK 5
Configurar repositorio en GitHub con Gitflow

    • Rama main, develop y ramas de feature.
TASK 6
Configurar Docker + Docker Compose

  Crear Dockerfile para Node.js.
  Configurar servicio PostgreSQL con volúmenes y networks.
  Limitar CPU y RAM.
Criterios de aceptación: 

    • Configuración de proyecto con Node.js + Typescript. 
    • Estructura modular de carpetas con separación de responsabilidades. 
    • Integración de Sequelize con PostgreSQL. 
    • Creación de modelos iniciales (Producto, Cliente, Usuario) así como el modelo entidad relación.
    • Poblar datos iniciales mediante seeds. 
    • Configuración de GitHub (repositorio, branches con estrategia Gitflow). 
    • Configuración de Docker y Docker Compose para Node.js + PostgreSQL con buenas prácticas:  Limitación de CPU y RAM. o Manejo de volúmenes para persistencia. Uso de networks para comunicación interna entre el motor de la base de datos y el contendor donde se ejecutará Node.js

History points: 20 puntos

Cierre de actividad:

Al finalizar esta primera semana, serás capaz de levantar un proyecto backend en Node.js con Typescript, estructurado de manera modular y conectado a PostgreSQL mediante Sequelize. Habrás configurado un entorno estandarizado con Docker, definido los modelos iniciales y sembrado datos básicos para pruebas. Con esto, habrás sentado las bases sólidas de la aplicación, garantizando un punto de partida ordenado y preparado para futuras integraciones como autenticación y seguridad.






















Nombre de la HU: 
Autenticación y roles de usuarios
Objetivo de la HU
Como usuario de la API quiero registrarme e iniciar sesión con un rol específico (admin o vendedor) para acceder solo a las funcionalidades que me corresponden.
TASK1
Implementar modelo y servicio de autenticación

  Crear AuthController y AuthService.
  Registro e inicio de sesión con validaciones.
TASK2
Configurar JWT + refreshToken

  Generar tokens seguros.
  Implementar endpoint de refresh.
TASK 3
Crear middlewares de protección de rutas

  Middleware para verificar JWT.
  Middleware para validar roles (admin/vendedor).
TASK 4
Implementar DTO y DAO en autenticación

  DTO para login/register.
  DAO para gestión de usuarios en DB.
TASK 5
Implementar cifrado híbrido

  Cifrado de mensajes con AES-256-GCM.
  Clave AES cifrada con RSA.
Criterios de aceptación:
    • Registro e inicio de sesión.
    • Roles: admin y vendedor.
    • Autenticación con JWT + refreshToken.
    • Middlewares para proteger rutas.
    • Uso de DTO y DAO.
    • Cifrado híbrido (AES-256-GCM + RSA).

History points: 20 puntos

Cierre de actividad:

Al finalizar esta segunda semana, serás capaz de implementar un sistema de autenticación robusto con JWT y refresh tokens, donde cada usuario tendrá un rol claramente definido (administrador o vendedor). Habrás protegido las rutas con middlewares, aplicado DTO y DAO para separar responsabilidades y agregado cifrado híbrido para operaciones sensibles. Con esto, el sistema contará con control de acceso seguro y estarás listo para gestionar datos críticos como productos y clientes.




Nombre de la HU: 
Gestión de productos y clientes
Objetivo de la HU
Como administrador quiero gestionar productos y clientes para mantener información confiable y actualizada en la tienda.
TASK1
Implementar CRUD de productos

  Endpoints: crear, leer, actualizar, eliminar.
  Validar código único.
TASK2
Implementar CRUD de clientes

    • Endpoints: crear, leer, actualizar, eliminar.
TASK 3
Configurar DTO y validaciones centralizadas

    • Middlewares para validación de entradas.
TASK 4
Implementar DAO de productos y clientes

    • Definir esquemas y ejemplos de responses.
Criterios de aceptación:
    • CRUD de productos y clientes.
    • Validación de código único de productos.
    • Validaciones con DTO y middleware centralizado.
    • Swagger con ejemplos de respuestas (200, 201, 400, 404, 500).

History points: 20 puntos

Cierre de actividad:

Al finalizar esta tercera semana, serás capaz de construir endpoints CRUD para productos y clientes, asegurando la validación de datos con DTOs y middlewares centralizados. Habrás implementado reglas de negocio como la validación de códigos únicos, documentado las operaciones en Swagger con ejemplos de respuestas y organizado la lógica en DAOs. Con esto, el sistema tendrá la capacidad de administrar el core del negocio y estarás preparado para integrar la gestión de pedidos y ventas.



Nombre de la HU: 
Gestión de pedidos y validaciones de negocio
Objetivo de la HU
Como vendedor quiero registrar y consultar pedidos para garantizar trazabilidad de ventas y control de stock.
TASK1
Implementar modelo y DAO de pedidos

    • Relación muchos a muchos con productos.
TASK2
Crear endpoint para registrar pedidos

  Validar stock.
  Reducir inventario automáticamente.
TASK 3
Crear endpoint para consultar pedidos

  Filtrar por cliente.
  Filtrar por producto.
TASK 4
Implementar cifrado híbrido en pedidos

    • AES + RSA en operaciones sensibles.
TASK 5
Actualizar documentación Swagger

    • Definir request/response con ejemplos.
Criterios de aceptación:
    • Registro de pedidos con múltiples productos.
    • Historial de pedidos por cliente y producto.
    • Validación de stock antes de confirmar pedido.
    • Cifrado híbrido en operaciones.
    • Swagger documentando endpoints.


History points: 20 puntos

Cierre de actividad:

Al finalizar esta cuarta semana, serás capaz de registrar y consultar pedidos vinculados a múltiples productos, asegurando la validación de stock y la correcta trazabilidad de las ventas. Habrás aplicado nuevamente el cifrado híbrido para proteger operaciones críticas y documentado los endpoints en Swagger. Con esto, el sistema contará con una gestión confiable de pedidos y estarás listo para enfocarte en la calidad del código, pruebas unitarias y despliegue final.

























Nombre de la HU: 
Calidad, seguridad y despliegue
Objetivo de la HU
Como líder técnico requiero que la API cumpla con estándares de calidad y despliegue para garantizar mantenibilidad y confiabilidad.
TASK1
Implementar pruebas unitarias con Jest 

  Tests para controladores y servicios.
  Cobertura mínima del 40%.
TASK2
Aplicar principios de Clean Code

  Refactor de controladores y servicios.
  Eliminar código duplicado.
TASK 3
Actualizar Swagger con todos los endpoints

    • Revisar consistencia de cada endpoint y los ejemplos integrados
TASK 4
Redactar README completo

  Instrucciones de instalación.
  Ejecución con Docker Compose.
TASK 5
Verificar el control de features en GitHub

  Verificación de Flujo Gitflow + issues asociados a HU.
  Verificación de Integración con Azure DevOps.

Criterios de aceptación:
    • Pruebas unitarias con Jest (mínimo 40% coverage).
    • Principios de Clean Code.
    • Swagger actualizado.
    • README completo.
    • Control de features en GitHub + flujo DevOps.

History points: 20 puntos

Cierre de actividad:

Al finalizar esta quinta semana, serás capaz de entregar una API lista para producción, documentada con Swagger y respaldada por pruebas unitarias con Jest que garantizan al menos un 40% de cobertura. Habrás aplicado principios de Clean Code, preparado un README completo con instrucciones de despliegue en Docker Compose y gestionado las features en GitHub con flujo de trabajo en Azure DevOps. Con esto, habrás alcanzado un producto final mantenible, seguro y confiable, demostrando calidad en cada etapa del desarrollo.

