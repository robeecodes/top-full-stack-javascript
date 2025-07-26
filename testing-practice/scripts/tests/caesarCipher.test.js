// Test shift works correctly
import caesarCipher from "../caesarCipher";

test('letters shift correctly', () => {
    expect(caesarCipher("hello world", 3)).toBe("khoor zruog");
    expect(caesarCipher("hello world", 5)).toBe("mjqqt btwqi");
    expect(caesarCipher("hello world", 10)).toBe("rovvy gybvn");
});
// Test shift with wrapping
test('shift with wrapping', () => {
    expect(caesarCipher("hello world", 26)).toBe("hello world");
    expect(caesarCipher("hello world", 27)).toBe("ifmmp xpsme");
})
// Test case stays the same
test('case stays the same', () => {
    expect(caesarCipher("Hello World", 3)).toBe("Khoor Zruog");
    expect(caesarCipher("HelLO WoRld", 5)).toBe("MjqQT BtWqi");
    expect(caesarCipher("HEllo World", 10)).toBe("ROvvy Gybvn");
})
// Test punctuation stays the same
test('punctuation stays the same', () => {
    expect(caesarCipher("Hello, @World!", 3)).toBe("Khoor, @Zruog!");
    expect(caesarCipher("Hello, @World!", 5)).toBe("Mjqqt, @Btwqi!");
    expect(caesarCipher("Hello, @World!", 10)).toBe("Rovvy, @Gybvn!");
})