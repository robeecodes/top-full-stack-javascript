export default function removeDuplicates(arr) {
    const seen = new Set();
    return arr.filter(item => !seen.has(item) && seen.add(item));
}