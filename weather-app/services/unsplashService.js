const fallbackImages = {
        'sunny sky': {
            imageUrl: '/assets/img/sunny-sky.jpg',
            attribution: {
                username: `Jan Huber`,
                userUrl: 'https://unsplash.com/@jan_huber',
                imageUrl: 'https://unsplash.com/photos/green-grass-field-with-green-tree-during-daytime-yGOClW3KdKk',
            }
        },
        'night sky stars': {
            imageUrl: '/assets/img/night-sky-stars.jpg',
            attribution: {
                username: 'Finn Schürmann',
                userUrl: 'https://unsplash.com/@garnetklee',
                imageUrl: 'https://unsplash.com/photos/the-night-sky-with-stars-and-trees-in-the-foreground-2hKQiGX_kx4',
            },
        },
        'partly cloudy sky': {
            imageUrl: '/assets/img/partly-cloudy-sky.jpg',
            attribution: {
                username: 'Peter Robbins',
                userUrl: 'https://unsplash.com/@prphotography262',
                imageUrl: 'https://unsplash.com/photos/a-view-of-a-mountain-range-from-a-road-Ki-uP_UTOps',
            },
        },
        'cloudy night sky': {
            imageUrl: '/assets/img/cloudy-night-sky.jpg',
            attribution: {
                username: 'Andriyko Podilnyk',
                userUrl: 'https://unsplash.com/@andriyko',
                imageUrl: 'https://unsplash.com/photos/silhouette-photography-of-mountain-E6ne6IUNxZw',
            },
        },
        'overcast sky': {
            imageUrl: '/assets/img/overcast-sky.jpg',
            attribution: {
                username: 'Lode Lambert',
                userUrl: 'https://unsplash.com/@lowie',
                imageUrl: 'https://unsplash.com/photos/brown-stone-on-body-of-water-RaRFzHWSbDY',
            },
        },
        'rain': {
            imageUrl: '/assets/img/rain.jpg',
            attribution: {
                username: 'Max Bender',
                userUrl: 'https://unsplash.com/@maxwbender',
                imageUrl: 'https://unsplash.com/photos/water-droplets-on-clear-glass-1YHXFeOYpN0',
            },
        },
        'snowfall': {
            imageUrl: '/assets/img/snowfall.jpg',
            attribution: {
                username: 'Todd Diemer',
                userUrl: 'https://unsplash.com/@todd_diemer',
                imageUrl: 'https://unsplash.com/photos/trees-covered-with-snow-BjxBmGBq38o',
            },
        },
        'windy landscape': {
            imageUrl: '/assets/img/windy-landscape.jpg',
            attribution: {
                username: 'Önder Andinç',
                userUrl: 'https://unsplash.com/@onderandinc',
                imageUrl: 'https://unsplash.com/photos/a-group-of-wind-turbines-on-top-of-a-hill-qa9vl3ljXow',
            },
        },
    }
;

const getImage = async (query) => {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const randomQuery = `${query}&${Date.now()}`;
    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(randomQuery)}&orientation=landscape&per_page=1`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });

        console.log(fallbackImages[query]);

        if (!response.ok) {
            console.warn(`Unsplash API error: ${response.status}`);
            console.log(fallbackImages[query]);
            return fallbackImages[query];
        }

        const data = await response.json();
        const image = data.results[0];

        if (!image) {
            return fallbackImages[query];
        }

        // Trigger download event (required by Unsplash guidelines)
        const downloadUrl = image.links.download_location + `?client_id=${accessKey}`;
        await fetch(downloadUrl);

        return {
            imageUrl: image.urls.regular,
            attribution: {
                username: image.user.name,
                userUrl: image.user.links.html,
                imageUrl: image.links.html,
            },
        };
    } catch (err) {
        console.error('Unsplash error:', err);
        return fallbackImages[query];
    }
};

module.exports = {getImage};