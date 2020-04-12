export const hashCode = Symbol('HashCode');

export interface HashCode {
  /**
   * Returns a hash code value for the object. This method is supported for the
   * benefit of hash tables.
   *
   * The general contract of `hashCode` is:
   *
   * - Whenever it is invoked on the same object more than once during an
   *   execution of a context, the `hashCode` method must consistently return
   *   the same integer, provided no information used in `equals` comparisons on
   *   the object is modified. This integer need not remain consistent from one
   *   execution of an application to another execution of the same application.
   * - If two objects are equal according to the `equals(unknown)` method, then
   *   calling the `hashCode` method on each of the two objects must produce the
   *   same integer result.
   * - It is *not* required that if two objects are unequal according to the
   *   `equals(unknown)` method, then calling the `hashCode` method on each of
   *   the two objects must produce distinct integer results. However, the
   *   programmer should be aware that producing distinct integer results for
   *   unequal objects may improve the performance of hash tables.
   *
   * @returns a hash code value for this object.
   *
   * @see {@link Equals}
   */
  [hashCode](): number;
}

export function implementsHashCode(obj: unknown): obj is HashCode {
  return typeof obj === 'object' && obj !== null && hashCode in obj;
}
