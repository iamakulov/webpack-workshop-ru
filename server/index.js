const express = require('express');
const fakeData = require('./fakeData.json');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/data', (req, res) => {
    res.send(fakeData);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port} 😎`)
});