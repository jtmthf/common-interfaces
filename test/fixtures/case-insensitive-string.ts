import { Equals, requireNonNull, equals } from '../../src';

// Broken - violates symmetry!
export class SymmetricViolationCaseInsensitiveString implements Equals {
  private readonly s: string;

  constructor(s: string) {
    requireNonNull(s);

    this.s = s;
  }

  // Broken - violates symmetry!
  [equals](o: unknown): boolean {
    if (o instanceof SymmetricViolationCaseInsensitiveString) {
      return this.s.toUpperCase() === o.s.toUpperCase();
    }
    if (typeof o === 'string') {
      // One-way interoperability!
      return this.s.toUpperCase() === o.toUpperCase();
    }
    return false;
  }
}
