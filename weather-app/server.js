const express = require('express');
const app = express();
require('dotenv').config();

const weatherRoute = require('./routes/weather');
app.use('/api', weatherRoute);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});