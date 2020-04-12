import { Class } from 'type-fest';
import { NullReferenceError } from './errors';
import { implementsEquals, equals } from './equals';
import { implementsHashCode, hashCode } from './hash-code';

export function objectEquals(a: unknown, b: unknown) {
  if (a === b) {
    return true;
  }
  if (implementsEquals(a)) {
    return a[equals](b);
  }
  return false;
}

const hashIdentityMap = new WeakMap<object, number>();

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function objectHashCode(obj: unknown): number {
  if (obj == null) {
    return 0;
  }
  if (implementsHashCode(obj)) {
    return obj[hashCode]();
  }
  if (typeof obj === 'object') {
    if (hashIdentityMap.has(obj!)) {
      return hashIdentityMap.get(obj!)!;
    }
    const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    hashIdentityMap.set(obj!, hash);
    return hash;
  }
  // TODO implement hashCode implementations for primitive types
  return 1;
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export function hash(first: unknown, ...values: unknown[]): number {
  return values.reduce<number>(
    (result, value) => 31 * result + objectHashCode(value),
    objectHashCode(first),
  );
}

export function requireNonNull<T>(
  obj: NonNullable<T>,
  message?: string | (() => string),
): NonNullable<T>;
export function requireNonNull<T>(
  obj: T,
  message?: string | (() => string),
): asserts obj is NonNullable<T>;
export function requireNonNull<T>(obj: T, message?: string | (() => string)): T {
  if (obj == null) {
    throw new NullReferenceError(typeof message === 'function' ? message() : message);
  }

  return obj;
}

export function requireNonNullElse<T>(obj: T, defaultObj: T): NonNullable<T> {
  if (obj == null) {
    requireNonNull(defaultObj);
    return defaultObj;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return obj!;
}

export function requireNonNullElseGet<T>(obj: T, supplier: () => T): NonNullable<T> {
  if (obj == null) {
    const supplied = requireNonNull(supplier)();
    requireNonNull(supplied);
    return supplied;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return obj!;
}

export function isNullish(obj: unknown): obj is null | undefined {
  return obj == null;
}

export function nonNullish<T>(obj: T): obj is NonNullable<T> {
  return obj != null;
}

export function cast<T>(obj: unknown, as: Class<T>): T {
  if (!(obj instanceof as)) {
    throw new Error('cannot cast');
  }
  return obj as any;
}
