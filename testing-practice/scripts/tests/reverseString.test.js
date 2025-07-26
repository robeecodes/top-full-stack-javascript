import reverseString from '../reverseString';

test('one word can be reversed', () => {
    expect(reverseString('hello')).toBe('olleh');
});

test('a sentence can be reversed', () => {
    expect(reverseString('Oh, hello there!')).toBe('!ereht olleh ,hO');
});

test('a sentence can be reversed with changing whitespace', () => {
    expect(reverseString('Oh,   hello    there!')).toBe('!ereht    olleh   ,hO');
});

test('empty string returns empty string', () => {
    expect(reverseString('')).toBe('');
});

test('a string with a single character stays the same', () => {
    expect(reverseString('p')).toBe('p');
});

test('string with newlines maintains formatting', () => {
    expect(reverseString('hello\nworld')).toBe('dlrow\nolleh');
});