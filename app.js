const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { time } = require('console');
const { title } = require('process');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index' , {
        title: 'SSR Blog Projesi',
        message: 'Merahaba Dünya! Bu benim ilk SSR sayfam!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});