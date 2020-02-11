const primeMedians = require('../src/calculations');

test('Given an upperlimit of 10, the function returns [3,5]', () => {
  expect(primeMedians(10)).toStrictEqual([3, 5]);
});

test('Given an upperlimit of 18, the function returns [7]', () => {
  expect(primeMedians(18)).toStrictEqual([7]);
});
