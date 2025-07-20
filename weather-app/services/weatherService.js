const getWeather = async (location) => {
    const apiKey = process.env.API_KEY;
    const unitGroup = 'uk';

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&iconSet=icons1&key=${apiKey}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
    }

    try {
        const data = await response.json();
        const day = data.days[0];

        return {
            name: data.resolvedAddress,
            currentTemp: day.temp,
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            icon: day.icon,
        };
    } catch (err) {
        return null;
    }


};

module.exports = { getWeather };