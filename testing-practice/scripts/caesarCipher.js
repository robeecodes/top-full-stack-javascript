export default function caesarCipher(text, shift) {
    const normalisedShift = ((shift % 26) + 26) % 26;

    return text.split('').map(char => {
        if (!isLetter(char)) return char;
        return shiftLetter(char, normalisedShift);
    }).join('');
}

function isLetter(char) {
    return /[a-zA-Z]/.test(char);
}

function shiftLetter(char, shift) {
    // Determine the case base (97 for lowercase, 65 for uppercase)
    const base = char.toLowerCase() === char ? 97 : 65;

    // Convert to 0-25 range, apply shift, and wrap around
    const letterCode = char.charCodeAt(0) - base;
    const shiftedCode = (letterCode + shift) % 26;

    // Convert back to ASCII and return character
    return String.fromCharCode(base + shiftedCode);
}