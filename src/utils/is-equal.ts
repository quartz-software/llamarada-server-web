// Funcion para simplificar la comparacion de un valor entre varios
export default function isEqual<T = string>(value: T, ...list: T[]) {
  return list.some((i) => value == i);
}
