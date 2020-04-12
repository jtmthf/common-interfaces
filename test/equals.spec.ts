import { equals, objectEquals } from '../src';
import { SymmetricViolationCaseInsensitiveString } from './fixtures/case-insensitive-string';
import {
  Point,
  SymmetricViolationColorPoint,
  TransitiveViolationColorPoint,
  LiskovViolationPoint,
  CounterPoint,
  ColorPoint,
} from './fixtures/point';
import { HashSet } from './fixtures/hash-set';

describe('symmetry violation', () => {
  test('CaseInsensitiveString', () => {
    const cis = new SymmetricViolationCaseInsensitiveString('Polish');
    const s = 'polish';

    expect(cis[equals](s)).toBe(true);
    expect(objectEquals(s, cis)).toBe(false);
  });

  test('Point', () => {
    const p = new Point(1, 2);
    const cp = new SymmetricViolationColorPoint(1, 2, 'red');

    expect(p[equals](cp)).toBe(true);
    expect(cp[equals](p)).toBe(false);
  });
});

describe('transitivity violation', () => {
  test('Point', () => {
    const p1 = new TransitiveViolationColorPoint(1, 2, 'red');
    const p2 = new Point(1, 2);
    const p3 = new TransitiveViolationColorPoint(1, 2, 'blue');

    expect(p1[equals](p2)).toBe(true);
    expect(p2[equals](p3)).toBe(true);
    expect(p1[equals](p3)).toBe(false);
  });
});

describe('liskov substitution principle violation', () => {
  test('Point', () => {
    const unitCircle = new HashSet<LiskovViolationPoint>();
    unitCircle.add(new LiskovViolationPoint(1, 0));
    unitCircle.add(new LiskovViolationPoint(0, 1));
    unitCircle.add(new LiskovViolationPoint(-1, 0));
    unitCircle.add(new LiskovViolationPoint(0, -1));

    const onUnitCircle = (p: LiskovViolationPoint) => unitCircle.has(p);

    expect(onUnitCircle(new LiskovViolationPoint(1, 0))).toBe(true);
    expect(onUnitCircle(new CounterPoint(0, 1))).toBe(false);
  });
});

describe('composition', () => {
  test('Point', () => {
    const p1 = new ColorPoint(1, 2, 'red');
    const p2 = new ColorPoint(1, 2, 'red');
    const p3 = new ColorPoint(1, 2, 'blue');

    expect(p1[equals](p2)).toBe(true);
    expect(p1[equals](p3)).toBe(false);
  });
});
