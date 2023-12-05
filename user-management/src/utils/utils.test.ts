import { cls } from './cls';

describe('Test cls helper', () => {
  test('Should remove all whitespace', () => {
    const stringTest = 'Redundant     space';
    const result = cls(stringTest);
    expect(result).toEqual('Redundant space');
  });
});
