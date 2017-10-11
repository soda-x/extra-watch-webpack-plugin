import test from 'ava'; // eslint-disable-line

test('example', (t) => {
  const result = {
    a: 1,
  };
  const expect = {
    a: 1,
  };
  t.deepEqual(result, expect);
});
