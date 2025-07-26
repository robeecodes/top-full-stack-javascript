import Calculator from '../Calculator';

const additionTests = {
    basic: [
        {description: 'adds two integers together', inputs: [1, 2], expected: 3},
        {description: 'handles negative integer values', inputs: [1, -2], expected: -1},
        {description: 'adds two floats together', inputs: [1.1, 2.2], expected: 3.30},
        {description: 'handles negative float values', inputs: [1.1, -2.2], expected: -1.10}
    ],
    boundaries: {
        overflow: [
            {inputs: [Number.MAX_SAFE_INTEGER, 1], description: 'integer overflow'},
            {inputs: [Number.MAX_SAFE_INTEGER, 1.8], description: 'float overflow'}
        ],
        underflow: [
            {inputs: [Number.MIN_SAFE_INTEGER, -1], description: 'integer underflow'},
            {inputs: [Number.MIN_SAFE_INTEGER, -1.8], description: 'float underflow'}
        ],
        withinRange: {
            large: {inputs: [Number.MAX_SAFE_INTEGER - 2, 1], expected: Number.MAX_SAFE_INTEGER - 1},
            small: {inputs: [Number.MIN_SAFE_INTEGER + 2, -1], expected: Number.MIN_SAFE_INTEGER + 1}
        }
    },
    special: {
        zero: [
            {inputs: [5, 0], expected: 5},
            {inputs: [0, 5], expected: 5},
            {inputs: [0, 0], expected: 0}
        ],
        floatingPoint: [
            {inputs: [0.1, 0.2], expected: 0.30},
            {inputs: [0.007, 0.003], expected: 0.01},
            {inputs: [2.4, 1.1], expected: 3.50}
        ]
    }
};

createOperationTests('add', 'add', additionTests);

const subtractionTests = {
    basic: [
        { description: 'subtracts two integers', inputs: [1, 2], expected: -1 },
        { description: 'subtracts two integers with negative values', inputs: [1, -2], expected: 3 },
        { description: 'subtracts two floats', inputs: [1.1, 2.2], expected: -1.10 },
        { description: 'subtracts two floats with negative values', inputs: [1.1, -2.2], expected: 3.30 }
    ],
    boundaries: {
        overflow: [
            { inputs: [Number.MAX_SAFE_INTEGER, -5], description: 'integer overflow' },
            { inputs: [Number.MAX_SAFE_INTEGER, -5.8], description: 'float overflow' }
        ],
        underflow: [
            { inputs: [Number.MIN_SAFE_INTEGER, 5], description: 'integer underflow' },
            { inputs: [Number.MIN_SAFE_INTEGER, 5.8], description: 'float underflow' }
        ],
        withinRange: {
            large: { inputs: [Number.MAX_SAFE_INTEGER + 2, 2], expected: Number.MAX_SAFE_INTEGER - 1 },
            small: { inputs: [Number.MIN_SAFE_INTEGER - 2, -2], expected: Number.MIN_SAFE_INTEGER + 1 }
        }
    },
    special: {
        zero: [
            { inputs: [5, 0], expected: 5 },
            { inputs: [0, 5], expected: -5 },
            { inputs: [0, 0], expected: 0 }
        ],
        floatingPoint: [
            { inputs: [0.1, 0.2], expected: -0.10 },
            { inputs: [0.007, 0.003], expected: 0 },
            { inputs: [2.4, 1.1], expected: 1.30 }
        ]
    }
};

createOperationTests('subtract', 'subtract', subtractionTests);

const divisionTests = {
    basic: [
        { description: 'divides two integers with integer result',
            inputs: [6, 3], expected: 2 },
        { description: 'divides two integers with float result',
            inputs: [3, 6], expected: 0.50 },
        { description: 'divides two integers with one negative value and integer result',
            inputs: [6, -3], expected: -2 },
        { description: 'divides two integers with negative values and integer result',
            inputs: [-6, -3], expected: 2 },
        { description: 'divides two integers with one negative value and float result',
            inputs: [3, -6], expected: -0.50 },
        { description: 'divides two integers with negative values and float result',
            inputs: [-3, -6], expected: 0.5 },
        { description: 'divides two floats',
            inputs: [5.5, 2.5], expected: 2.20 },
        { description: 'divides two floats with one negative value',
            inputs: [5.5, -2.5], expected: -2.20 },
        { description: 'divided two floats with negative values',
            inputs: [-5.5, -2.5], expected: 2.20 }
    ],
    boundaries: {
        overflow: [
            {
                inputs: [Number.MAX_SAFE_INTEGER, 0.1],
                description: 'dividing by small decimal'
            },
            {
                inputs: [-Number.MAX_SAFE_INTEGER, -0.1],
                description: 'dividing negative by negative small decimal'
            }
        ],
        underflow: [
            {
                inputs: [Number.MIN_SAFE_INTEGER, 0.1],
                description: 'dividing negative by small decimal'
            },
            {
                inputs: [-Number.MIN_SAFE_INTEGER, -0.1],
                description: 'dividing by negative small decimal'
            }
        ],
        withinRange: {
            large: {
                inputs: [Number.MAX_SAFE_INTEGER - 1, 2],
                expected: Math.floor((Number.MAX_SAFE_INTEGER - 1) / 2)
            },
            small: {
                inputs: [Number.MIN_SAFE_INTEGER + 1, 2],
                expected: Math.ceil((Number.MIN_SAFE_INTEGER + 1) / 2)
            }
        }
    },
    special: {
        zero: [
            { inputs: [0, 5], expected: 0 },
            { inputs: [5, 0], throws: 'Division by zero'},
            { inputs: [0, 0], throws: 'Division by zero'}
        ],
        floatingPoint: [
            { inputs: [1, 3], expected: 0.33 },
            { inputs: [10, 4], expected: 2.50 },
            { inputs: [2.4, 1.2], expected: 2.00 }
        ]
    }
};

createOperationTests('divide', 'divide', divisionTests);

// TODO: Multiply
const multiplyTests = {
    basic: [
        { description: 'multiply two integers',
            inputs: [6, 3], expected: 18 },
        { description: 'multiply two integers with one negative value',
            inputs: [6, -3], expected: -18 },
        { description: 'multiply two integers with negative values',
            inputs: [-6, -3], expected: 18 },
        { description: 'multiply two floats',
            inputs: [5.5, 2.5], expected: 13.75 },
        { description: 'multiply two floats with one negative value',
            inputs: [5.5, -2.5], expected: -13.75 },
        { description: 'multiply two floats with negative values',
            inputs: [-5.5, -2.5], expected: 13.75 }
    ],
    boundaries: {
        overflow: [
            {
                inputs: [Number.MAX_SAFE_INTEGER, 2],
                description: 'multiplying by integer causes overflow'
            },
            {
                inputs: [Number.MAX_SAFE_INTEGER / 2 + 1, 2],
                description: 'multiplying large numbers causes overflow'
            }
        ],
        underflow: [
            {
                inputs: [Number.MIN_SAFE_INTEGER, 2],
                description: 'multiplying negative by positive causes underflow'
            },
            {
                inputs: [Number.MIN_SAFE_INTEGER / 2 - 1, 2],
                description: 'multiplying negatives causes underflow'
            }
        ],
        withinRange: {
            large: {
                inputs: [Number.MAX_SAFE_INTEGER / 4, 2],
                expected: Number.MAX_SAFE_INTEGER / 2
            },
            small: {
                inputs: [Number.MIN_SAFE_INTEGER / 4, 2],
                expected: Number.MIN_SAFE_INTEGER / 2
            }
        }
    },
    special: {
        zero: [
            { inputs: [0, 5], expected: 0 },
            { inputs: [5, 0], expected: 0 },
            { inputs: [0, 0], expected: 0 }
        ],
        floatingPoint: [
            { inputs: [1.5, 2.5], expected: 3.75 },
            { inputs: [0.1, 0.2], expected: 0.02 },
            { inputs: [3.33, 3], expected: 9.99 },
            { inputs: [2.5, 0.4], expected: 1.00 },
            { inputs: [1.23, 4.56], expected: 5.61 }
        ]
    }
};

createOperationTests('multiply', 'multiply', multiplyTests);

function createOperationTests (operationName, operation, testCases) {
    describe(`Calculator - ${operationName} operation`, () => {
        let calculator;

        beforeEach(() => {
            calculator = Calculator();
        });

        describe('basic arithmetic', () => {
            testCases.basic.forEach(({inputs, expected, description}) => {
                test(description, () => {
                    expect(calculator[operation](...inputs)).toBe(expected);
                });
            });
        });

        describe('boundary cases', () => {
            testCases.boundaries.overflow.forEach(({inputs, description}) => {
                test(`throws overflow error - ${description}`, () => {
                    expect(() => calculator[operation](...inputs))
                        .toThrow('Numeric overflow error');
                });
            });

            testCases.boundaries.underflow.forEach(({inputs, description}) => {
                test(`throws underflow error - ${description}`, () => {
                    expect(() => calculator[operation](...inputs))
                        .toThrow('Numeric underflow error');
                });
            });

            test('handles large numbers within safe range', () => {
                const {inputs, expected} = testCases.boundaries.withinRange.large;
                expect(calculator[operation](...inputs)).toBe(expected);
            });

            test('handles small numbers within safe range', () => {
                const {inputs, expected} = testCases.boundaries.withinRange.small;
                expect(calculator[operation](...inputs)).toBe(expected);
            });
        });

        describe('input validation', () => {
            test('throws error for invalid inputs', () => {
                const invalidInputs = [
                    ['a', 1],
                    [undefined, 1],
                    [null, 1],
                    [1, undefined],
                    [{}, []]
                ];

                invalidInputs.forEach(inputs => {
                    expect(() => calculator[operation](...inputs))
                        .toThrow('Invalid input');
                });
            });
        });

        describe('special cases', () => {
            test('handles zero correctly', () => {
                testCases.special.zero.forEach(({inputs, expected, throws}) => {
                    if (throws) {
                        expect(() => calculator[operation](...inputs))
                            .toThrow(throws);
                    } else {
                        expect(calculator[operation](...inputs)).toBe(expected);
                    }
                });
            });

            test('handles floating point precision correctly', () => {
                testCases.special.floatingPoint.forEach(({inputs, expected}) => {
                    expect(calculator[operation](...inputs)).toBe(expected);
                });
            });
        });
    });
}