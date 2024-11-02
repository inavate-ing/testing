import functionLength from './index.ts';

describe('functionLength', () => {
    test('no arguments', () => {
        expect(functionLength(function foo() {})).toBe(0);
        expect(functionLength(() => {})).toBe(0);
    });

    test('one argument', () => {
        expect(functionLength(function foo(a: number) {})).toBe(1);
        expect(functionLength((a: number) => {})).toBe(1);
    });

    test('two arguments', () => {
        expect(functionLength(function foo(a: number, b: number) {})).toBe(2);
        expect(functionLength((a: number, b: number) => {})).toBe(2);
    });

    test('multiple arguments', () => {
        expect(
            functionLength(function foo(a: number, b: number, c: number) {}),
        ).toBe(3);
        expect(functionLength((a: number, b: number, c: number) => {})).toBe(3);
    });

    // Only parameters before the first one with a default value are counted.
    test('default arguments', () => {
      expect(functionLength(function foo(a: number, b = 2) {})).toBe(1);
      expect(functionLength(function foo(a = 1, b = 2) {})).toBe(0);
    });

    // A destructuring pattern counts as a single parameter.
    test('destructuring', () => {
        expect(functionLength(function foo([a, b]: [number, number]) {})).toBe(1);
    });

    // The rest parameter is excluded.
    test('rest parameters', () => {
          expect(functionLength(function foo(...args: number[]) {})).toBe(0);
          expect(functionLength(function foo(a: number, ...args: number[]) {})).toBe(1);
          expect(functionLength(function foo(a: number, b: number, ...args: number[]) {})).toBe(2);
          expect(functionLength(function foo(a: number, b = 1, ...args: number[]) {})).toBe(1);
    });
});