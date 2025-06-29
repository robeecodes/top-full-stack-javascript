const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve index.html from the public folder
app.use(express.static('public'));

app.get('/gif', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const query = 'cat';

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`);
    const data = await response.json();

    // Only send the image URL to the browser
    res.json({ imageUrl: data.data.images.original.url });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
