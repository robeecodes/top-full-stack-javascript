export default async function getWeather(path) {
    const res = await fetch(path);
    const data = await res;

    try {
        return await data.json();
    } catch (err) {
        return null;
    }
}