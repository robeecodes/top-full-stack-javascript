const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weatherService');
const { getImage } = require('../services/unsplashService');
const iconToSearchTerm = require('../utils/iconToSearchTerm');

router.get('/location', async (req, res) => {
    const location = req.query?.query?.trim();

    if (!location) {
        return res.status(400).json({ error: 'Missing location query parameter' });
    }

    try {
        const weather = await getWeather(location);
        const image = await getImage(iconToSearchTerm(weather.icon));

        res.json({
            ...weather,
            ...image,
        });
    } catch (err) {
        console.error('Error in /location route:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;