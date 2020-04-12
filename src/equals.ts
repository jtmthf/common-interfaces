export const equals = Symbol('Equals');

export interface Equals {
  /**
   * Indicates whether some other object is "equal to" this one.
   *
   * The `equals` method implements an equivalence relation on non-nullish
   * object references:
   *
   * - It is *reflexive*: for any non-nullish reference value `x`, `x.equals(x)`
   *   should return `true`.
   * - It is *symmetric*: for any non-nullish reference values `x` and `y`,
   *   `x.equals(y)` should return `true` if and only if `y.equals(x)` returns
   *   `true`.
   * - It is *transitive*: for any non-nullish reference values `x`, `y`, and
   *   `z`, if `x.equals(y)` returns `true` and `y.equals(z)` returns `true`,
   *   then `x.equals(z)` should return `true`.
   * - It is *consistent*: for any non-nullish reference values `x` and `y`,
   *   multiple invocations of `x.equals(y)` consistently return `true` or
   *   consistently return `false`, provided no information used in equals
   *   comparisons on the objects is modified.
   * - For any non-nullish reference value `x`, `x.equals(null)` or
   *   `x.equals(undefined)` should return `false`.
   *
   * The `equals` method for interface {@linkcode Equals} implements the most
   * discriminating possible equivalence relation on objects; that is, for any
   * non-nullish reference values `x` and `y`, this method returns `true` if and
   * only if `x` and `y` refer to the same object (`x === y` has the value
   * `true`).
   *
   * Note that it is generally necessary to override the `hashCode` method
   * whenever this method is overridden, so as to maintain the general contract
   * for the `hashCode method`, which states that equal objects must have equal
   * hash codes.
   *
   * @param other the reference object with which to compare.
   * @returns `true` if this object is the same as the obj argument; `false`
   * otherwise.
   *
   * @see {@link HashCode}
   */
  [equals](other: unknown): boolean;
}

export function implementsEquals(obj: unknown): obj is Equals {
  return typeof obj === 'object' && obj !== null && equals in obj;
}
