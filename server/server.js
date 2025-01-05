const express = require('express'); 
const bodyParser = require('body-parser'); 
const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({ 
    host: process.env.DB_HOSTNAME, // Adres URL/IP serwera
    user: process.env.DB_USER, // Użytkownik MySQL
    password: process.env.DB_PASSWORD, // Hasło MySQL
    database: process.env.DB_NAME // Nazwa bazy danych 
    });

db.connect((err) => {
    if (err) {
    console.error('Nie udało się połączyć z bazą danych:', err); process.exit(1); 
    } 
    console.log('Połączono z bazą danych MySQL.');
    });

const app = express();

app.use(bodyParser.json()); 
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    next(); 
});

app.post('/submit', (req, res) => {

});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Serwer działa na http://${process.env.DB_HOSTNAME}:${PORT}`); });
