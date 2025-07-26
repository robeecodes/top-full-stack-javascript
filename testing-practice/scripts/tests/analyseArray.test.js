import analyseArray from "../analyseArray";

const tests = [
    {
        array: [1, 8, 3, 4, 2, 6],
        average: 4,
        min: 1,
        max: 8,
        length: 6
    },
    {
        array: [8, 90, 75, 2, 6, 9, 3, 54],
        average: 30.88,
        min: 2,
        max: 90,
        length: 8
    },
    {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        average: 5.5,
        min: 1,
        max: 10,
        length: 10
    },
    {
        array: [8.3, 60.4, 9, 4.8, -2],
        average: 16.1,
        min: -2,
        max: 60.4,
        length: 5
    }
]

// returns average number
test('returns average number', () => {
    expect(analyseArray([1, 8, 3, 4, 2, 6]).average).toBe(4);
    tests.forEach(test => {
        expect(analyseArray(test.array).average).toBe(test.average);
    });
});
// returns minimum number
test('returns minimum number', () => {
    expect(analyseArray([1, 8, 3, 4, 2, 6]).min).toBe(1);
    tests.forEach(test => {
        expect(analyseArray(test.array).min).toBe(test.min);
    });
});
// returns maximum number
test('returns maximum number', () => {
    tests.forEach(test => {
        expect(analyseArray(test.array).max).toBe(test.max);
    });
});
// returns length
test('returns length', () => {
    tests.forEach(test => {
        expect(analyseArray(test.array).length).toBe(test.length);
    });
});
// throws if invalid input
// not an array
// not all numbers
test('throws if invalid input', () => {
    expect(() => analyseArray('hello')).toThrow('Invalid input');
    expect(() => analyseArray([1, 2, 'hello'])).toThrow('Invalid input');
    expect(() => analyseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 'hello'])).toThrow('Invalid input');
})
