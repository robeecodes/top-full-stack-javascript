import capitalise from '../capitalise';

test('return one word with first letter capitalised', () => {
    expect(capitalise("bees"))
        .toEqual('Bees');
});

test('return sentence with first letter capitalised', () => {
    expect(capitalise("bees should be unable to fly"))
        .toEqual('Bees should be unable to fly');
});

test('sentence starting with symbol is unchanged', () => {
    expect(capitalise("@bees should be unable to fly"))
        .toEqual('@bees should be unable to fly');
});

test('sentence starting with numeric symbol is unchanged', () => {
    expect(capitalise("1bees should be unable to fly"))
        .toEqual('1bees should be unable to fly');
});

test('empty string returns empty string', () => {
    expect(capitalise(""))
        .toEqual('');
});

test('string with multiple spaces maintains spacing', () => {
    expect(capitalise("  bees  are   flying"))
        .toEqual('  bees  are   flying');
});

test('already capitalised string remains unchanged', () => {
    expect(capitalise("Bees are flying"))
        .toEqual('Bees are flying');
});

test('string with special characters in middle maintains format', () => {
    expect(capitalise("bees@are#flying"))
        .toEqual('Bees@are#flying');
});

test('single character is capitalised', () => {
    expect(capitalise("b"))
        .toEqual('B');
});