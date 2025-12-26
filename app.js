const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
console.log("KONTROL EDİYORUM -> Kullanıcı:", process.env.DB_USER);
const path = require('path');
const db = require('./config/db');



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const [posts] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');

        res.render('index', {
            title: 'Ana Sayfa | SSR Blog',
            posts: posts
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Veritabanı hatası oluştu!");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});