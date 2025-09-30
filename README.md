# Proyecto Llamarada - Servidor Web

Este repositorio contiene el código fuente de la lógica de negocio del sistema.
Gestiona la lógica de negocio y se encarga de servir la API para las aplicaciones de web, escritorio y movil.

El historial de cambios de este repositorio se encuentra en: [https://github.com/quartz-software/sistema-hotel-web](https://github.com/quartz-software/sistema-hotel-web)

## Stack Tecnológico

### Core
- **Node.js**: Entorno de ejecución JavaScript del lado del servidor
- **Express**: Framework web minimalista y flexible
- **PostgreSQL**: Base de datos relacional de código abierto
- **Sequelize**: ORM para Node.js con soporte para PostgreSQL

### Validación y Documentación
- **Zod**: Librería de validación de esquemas con inferencia de tipos TypeScript
- **Swagger**: Documentación interactiva de API (usando comentarios YAML estáticos)
- **JSDoc**: Generación de documentación de código JavaScript

### Calidad de Código
- **Prettier**: Formateador de código automático
- **ESLint**: Linter para identificar y reportar patrones en JavaScript

## Requisitos Previos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm >= 9.x

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
cp .env.example .env
```

Configurar las siguientes variables:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_USER=usuario_postgres
DB_PASSWORD=contraseña_postgres

# JWT
SECRET=tu_secreto_jwt_aqui
```

### 4. Configurar la base de datos

Crear la base de datos en PostgreSQL:

```bash
createdb nombre_base_datos
```

Ejecutar migraciones:

```bash
npm run migrate
```

Ejecutar seeders (opcional):

```bash
npm run seed
```

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor en modo desarrollo con hot-reload
npm run dev

# Iniciar servidor en modo producción
npm start
```

### Base de Datos

```bash
# Ejecutar migraciones
npm run migrate

# Ejecutar seeders
npm run seed
```

### Calidad de Código

```bash
# Ejecutar ESLint
npm run lint

# Corregir problemas de ESLint automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar formato sin modificar archivos
npm run format:check
```

### Documentación

```bash
# Generar documentación JSDoc
npm run docs

# Iniciar servidor de documentación Swagger
npm run docs:swagger
```

### Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## Estructura del Proyecto

```
.
├── src/
│   ├── config/          # Configuraciones (DB, servidor, etc.)
│   ├── controllers/     # Controladores de rutas
│   ├── middlewares/     # Middlewares personalizados
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades y helpers
│   ├── validators/      # Esquemas de validación con Zod
│   └── app.js           # Configuración de Express
├── docs/
│   ├── swagger/         # Documentación Swagger en YAML
│   └── jsdoc/           # Documentación JSDoc generada
├── migrations/          # Migraciones de base de datos
├── seeders/             # Datos de prueba
├── tests/               # Tests unitarios e integración
├── .env.example         # Ejemplo de variables de entorno
├── .eslintrc.js         # Configuración ESLint
├── .prettierrc          # Configuración Prettier
├── jsdoc.json           # Configuración JSDoc
└── package.json
```

## Acceso a la Documentación

Una vez iniciado el servidor:

- **API Swagger UI**: `http://localhost:3000/api-docs`
- **JSDoc**: Abrir `docs/jsdoc/index.html` en el navegador

## Flujo de Desarrollo

Este proyecto sigue la metodología **Gitflow**. Para más detalles sobre el flujo de trabajo, consulta:

- [GUIDE-dev.md](./GUIDE-dev.md) - Guía de desarrollo y Gitflow
- [GUIDE-docs.md](./GUIDE-docs.md) - Guía de documentación

## Convenciones de Código

- Seguimos **Conventional Commits** para mensajes de commit
- Todos los commits deben incluir el número de issue: `feat(feature-name#123): descripción`
- El código debe pasar las validaciones de ESLint y Prettier antes de hacer commit
- Toda nueva funcionalidad debe incluir tests
- Los endpoints deben estar documentados en Swagger
- Las funciones públicas deben tener documentación JSDoc

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, por favor crea un issue en el repositorio.

## Licencia

[Especificar licencia]