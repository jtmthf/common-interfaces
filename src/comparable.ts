export const compareTo = Symbol('Comparable');

export interface Comparable<T> {
  [compareTo](other: T): number;
}
