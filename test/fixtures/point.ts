import { Equals, equals, cast, requireNonNull, HashCode, hashCode } from '../../src';

export class Point implements Equals {
  constructor(private readonly x: number, private readonly y: number) {}

  [equals](o: unknown): boolean {
    if (!(o instanceof Point)) {
      return false;
    }
    return o.x === this.x && o.y === this.y;
  }
}

export class SymmetricViolationColorPoint extends Point {
  constructor(x: number, y: number, private readonly color: string) {
    super(x, y);
  }

  // Broken - violates symmetry
  [equals](o: unknown): boolean {
    if (!(o instanceof SymmetricViolationColorPoint)) {
      return false;
    }
    return super[equals](o) && o.color === this.color;
  }
}

export class TransitiveViolationColorPoint extends Point {
  constructor(x: number, y: number, private readonly color: string) {
    super(x, y);
  }

  // Broken - violates transitivity
  [equals](o: unknown): boolean {
    if (!(o instanceof Point)) {
      return false;
    }

    // If o is a normal Point, do a color-blind comparison
    if (!(o instanceof TransitiveViolationColorPoint)) {
      return o[equals](this);
    }

    return super[equals](o) && o.color === this.color;
  }
}

export class LiskovViolationPoint implements Equals, HashCode {
  constructor(private readonly x: number, private readonly y: number) {}

  // Broken - violates Liskov substitution principle
  [equals](o: unknown): boolean {
    if (o == null || Object.getPrototypeOf(o) !== Object.getPrototypeOf(this)) {
      return false;
    }
    const p = cast(o, LiskovViolationPoint);

    return p.x === this.x && p.y === this.y;
  }

  [hashCode](): number {
    return 1;
  }
}

export class CounterPoint extends LiskovViolationPoint {
  private static counter = 0;

  constructor(x: number, y: number) {
    super(x, y);
    CounterPoint.counter++;
  }

  static numberCreated() {
    return this.counter;
  }
}

export class ColorPoint implements Equals {
  private readonly point: Point;
  private readonly color: string;

  constructor(x: number, y: number, color: string) {
    this.point = new Point(x, y);
    this.color = requireNonNull(color);
  }

  asPoint(): Point {
    return this.point;
  }

  [equals](o: unknown): boolean {
    if (!(o instanceof ColorPoint)) {
      return false;
    }
    return o.point[equals](this.point) && o.color === this.color;
  }
}
