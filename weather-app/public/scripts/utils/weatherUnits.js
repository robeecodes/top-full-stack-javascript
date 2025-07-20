function celcToFahr(n) {
    const fahr = ((n * 9.0 / 5.0) + 32.0);
    return Math.round(fahr * 10) / 10;
}

function fahrToCelc(n) {
    const celc = ((n - 32) * 5 / 9);
    return Math.round(celc * 10) / 10;
}

export {celcToFahr, fahrToCelc};