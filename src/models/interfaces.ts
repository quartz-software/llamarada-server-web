import { Model, ModelAttributes, Optional } from "sequelize";

/**
 * Define los atributos de un modelo Sequelize con tipado fuerte.
 *
 * @template E - Atributos del modelo expuestos externamente (por ejemplo, en el DTO).
 * @template M - Atributos del modelo que Sequelize maneja internamente.
 * @template C - Atributos requeridos para crear una instancia del modelo.
 *
 * Este tipo se usa para tipar el objeto de atributos al definir un modelo Sequelize.
 */
export type SequelizeModelAttributes<
  E,
  M extends {},
  C extends {}
> = ModelAttributes<Model<M, C>, Optional<E, never>>;
