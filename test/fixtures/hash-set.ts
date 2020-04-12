import { objectEquals, objectHashCode } from '../../src';

export class HashSet<T> implements Set<T> {
  private readonly data = new Map<number, T[]>();

  get size() {
    return [...this.data.values()].reduce((sum, values) => sum + values.length, 0);
  }

  add(value: T): this {
    const hashValue = objectHashCode(value);
    if (!this.data.has(hashValue)) {
      this.data.set(hashValue, []);
    }

    for (const existing of this.data.get(hashValue)!) {
      if (objectEquals(value, existing)) {
        return this;
      }
    }
    this.data.get(hashValue)!.push(value);

    return this;
  }

  clear(): void {
    this.data.clear();
  }

  delete(value: T): boolean {
    throw new Error('Method not implemented.');
  }

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    throw new Error('Method not implemented.');
  }

  has(value: T): boolean {
    const hashValue = objectHashCode(value);
    if (!this.data.has(hashValue)) {
      return false;
    }

    for (const existing of this.data.get(hashValue)!) {
      if (objectEquals(value, existing)) {
        return true;
      }
    }

    return false;
  }

  [Symbol.iterator](): IterableIterator<T> {
    throw new Error('Method not implemented.');
  }
  entries(): IterableIterator<[T, T]> {
    throw new Error('Method not implemented.');
  }
  keys(): IterableIterator<T> {
    throw new Error('Method not implemented.');
  }
  values(): IterableIterator<T> {
    throw new Error('Method not implemented.');
  }
  [Symbol.toStringTag]: string;
}
