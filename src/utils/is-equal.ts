// Funcion para simplificar la comparacion de un valor entre varios
export default function isEqual(value: string, ...list: string[]) {
  return list.some((i) => value == i);
}
