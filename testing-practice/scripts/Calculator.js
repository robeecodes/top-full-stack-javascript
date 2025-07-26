export const Calculator = () => {
    const DECIMAL_PLACES = 2;

    const validateInput = (x, y) => {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Invalid input');
        }
    }

    const validateAnswer = (ans) => {
        if (ans > Number.MAX_SAFE_INTEGER) {
            throw new Error('Numeric overflow error');
        }
        if (ans < Number.MIN_SAFE_INTEGER) {
            throw new Error('Numeric underflow error');
        }
        if (typeof ans !== 'number') {
            throw new Error('Output is not a number');
        }
    }

    const performOperation = (x, y, operation) => {
        validateInput(x, y);
        const result = operation(x, y);
        validateAnswer(result);
        return formatResult(result);
    };

    const formatResult = (number) => {
        if (!Number.isInteger(number)) {
            return Number.parseFloat(number.toFixed(DECIMAL_PLACES));
        }
        return number;
    };

    return {
        add(x, y) {
            return performOperation(x, y, (a, b) => a + b);
        },

        subtract(x, y) {
            return performOperation(x, y, (a, b) => a - b);
        },

        divide(x, y) {
            if (y === 0) {
                throw new Error('Division by zero');
            }
            return performOperation(x, y, (a, b) => a / b);
        },

        multiply(x, y) {
            return performOperation(x, y, (a, b) => a * b);
        }
    };
};

export default Calculator;