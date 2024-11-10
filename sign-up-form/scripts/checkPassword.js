export default function checkPassword(inputs) {
    return inputs.every((input) => input.value === inputs[0].value && input.value.trim().length);
}