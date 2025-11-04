# GUIDE-docs.md

Guía de documentación para proyectos backend con Node.js, Express, Sequelize y TypeScript.  
Este documento define los estándares de documentación, convenciones y flujos para mantener la documentación técnica actualizada y consistente.

---

## Estándares de documentación con JSDoc

Toda función, clase, servicio, controlador y modelo debe estar documentado usando **JSDoc**.  
Se deben incluir descripciones claras, parámetros, retornos, errores esperados y tipos definidos con `@typedef` o directamente usando **tipos de TypeScript**.

### Funciones utilitarias

```ts
/**
 * - Convierte un string a título capitalizado.
 * -
 * - @param str - Texto a transformar.
 * - @returns Texto transformado con mayúscula inicial.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### Servicios

```ts
import { User } from "@/models/User";

/**
  - Servicio de autenticación de usuario.
  */
export class AuthService {
  /**
   *- Verifica las credenciales del usuario.
   *-
   *- @param email - Email del usuario.
   *- @param password - Contraseña del usuario.
   *- @returns Usuario autenticado si las credenciales son correctas.
   *- @throws Error si las credenciales son inválidas.
   */
  static async login(email: string, password: string): Promise<User> {
    return {} as User;
  }
}
```

### Controladores

```ts
import { Request, Response } from "express";
import { UserService } from "@/services/UserService";

/**
 * - Controlador de usuarios.
 */
export class UserController {
  /**
   * - Obtiene un usuario por ID.
   * -
   * - @param req - Objeto de la solicitud.
   * - @param res - Objeto de la respuesta.
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await UserService.findById(Number(id));
    res.json(user);
  }
}
```

### Modelos con Sequelize

```ts
import { Model, DataTypes, Sequelize, Optional } from "sequelize";

/**
 * - Atributos de usuario.
 */
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

/**
 * - Atributos para crear usuario.
 */
export type UserCreationAttributes = Optional<UserAttributes, "id">;

/**
 * - Modelo de Usuario.
 */
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;

  /**
   * - Inicializa el modelo de usuario.
   * -
   * - @param sequelize - Instancia de Sequelize.
   */
  static initModel(sequelize: Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize, modelName: "User" }
    );
  }
}
```

---

## Documentación de API con Swagger

Se usa **Swagger** en formato **YAML estático**.
Cada recurso tendrá un archivo `.yaml` en el directorio `docs/swagger/`.
El archivo principal `index.yaml` importa cada recurso.

### Estructura de archivos

```txt
docs/swagger/
├── index.yaml
├── users.yaml
├── auth.yaml
└── products.yaml
```

### Ejemplo de `index.yaml`

```yaml
openapi: 3.0.0
info:
title: API Backend
version: 1.0.0
servers:

- url: http://localhost:3000/api
  paths:
  /users:
  $ref: "./users.yaml#/paths/~1users"
  /auth/login:
  $ref: "./auth.yaml#/paths/~1auth~1login"
```

### Ejemplo de `users.yaml`

```yaml
paths:
/users:
get:
summary: Obtener todos los usuarios
responses:
"200":
description: Lista de usuarios
post: 
summary: Crear un nuevo usuario
responses:
"201":
description: Usuario creado
/users/{id}:
get:
summary: Obtener usuario por ID
parameters: - name: id
in: path
required: true
schema:
type: integer
responses:
"200":
description: Usuario encontrado
"404":
description: Usuario no encontrado
```

---

## Convenciones de códigos de estado HTTP

Se deben usar los siguientes códigos de estado:

- **200** OK – Respuesta exitosa de lectura.
- **201** Created – Recurso creado exitosamente.
- **204** No Content – Operación exitosa sin respuesta.
- **400** Bad Request – Error de validación o parámetros inválidos.
- **401** Unauthorized – Autenticación requerida.
- **403** Forbidden – Usuario sin permisos.
- **404** Not Found – Recurso no encontrado.
- **409** Conflict – Conflicto de recurso (duplicado, estado inválido).
- **500** Internal Server Error – Error inesperado en el servidor.

---

## Flujo para actualizar documentación

1. Identificar el cambio en endpoint, modelo o servicio.
2. Actualizar la definición correspondiente en **Swagger YAML**.
3. Actualizar la documentación en **JSDoc** (controladores, servicios, modelos).
4. Validar Swagger en https://editor.swagger.io/
5. Generar documentación JSDoc:

```bash
npx jsdoc -c jsdoc.json
```

---

## Revisión de documentación en Code Review

Checklist obligatorio:

- [ ] Todos los endpoints nuevos o modificados están en Swagger.
- [ ] JSDoc actualizado en funciones, servicios y controladores.
- [ ] Modelos documentados con interfaces y `@typedef` cuando corresponda.
- [ ] Swagger validado sin errores.
- [ ] `npx jsdoc -c jsdoc.json` genera correctamente la documentación.
