export default function analyseArray(array) {
    if (!Array.isArray(array)) throw new Error('Invalid input');
    if (array.length === 0) throw new Error('Invalid input');
    if (array.some(x => typeof x !== 'number')) throw new Error('Invalid input');

    return {
        average: Number((array.reduce((a, b) => a + b) / array.length).toFixed(2)),
        min: array.reduce((a, b) => Math.min(a, b)),
        max: array.reduce((a, b) => Math.max(a, b)),
        length: array.length
    }
}