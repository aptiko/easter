import { getEasterDate } from '../easter';

describe('getEasterDate', () => {
  test('earliest possible date', () => {
    expect(getEasterDate(1598)).toEqual([3, 22]);
  });

  test('latest possible date', () => {
    expect(getEasterDate(1666)).toEqual([4, 25]);
  });

  test('19 April special case where d = 29 and e = 6', () => {
    expect(getEasterDate(1609)).toEqual([4, 19]);
  });

  test('non-special 19 April', () => {
    expect(getEasterDate(1615)).toEqual([4, 19]);
  });

  test('18 April special case where d = 28 and e = 6 and more', () => {
    expect(getEasterDate(1954)).toEqual([4, 18]);
  });

  test('non-special 18 April', () => {
    expect(getEasterDate(1965)).toEqual([4, 18]);
  });

  test('correct p', () => {
    expect(getEasterDate(4200)).toEqual([4, 20]);
  });
});
