const iconToSearchTerm = (icon) => {
    const map = {
        'clear-day': 'sunny sky',
        'clear-night': 'night sky stars',
        'partly-cloudy-day': 'partly cloudy sky',
        'partly-cloudy-night': 'cloudy night sky',
        'cloudy': 'overcast sky',
        'rain': 'rain',
        'snow': 'snowfall',
        'wind': 'windy landscape',
        'fog': 'foggy morning',
    };

    return map[icon] || icon || 'weather';
};

module.exports = iconToSearchTerm;