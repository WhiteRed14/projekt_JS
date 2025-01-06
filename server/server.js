// import 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mysql = require('mysql2');
require('dotenv').config()

//

//łączenie z bazą danych
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
//

const app = express();

app.use(bodyParser.json()); 
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    next(); 
});

app.get('/search', (req, res) => {
    const { location, checkin, checkout, guests } = req.body;

    if (!location || !checkin || !checkout || !guests ) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    }

    //const query = 'INSERT INTO students (name, surname, address, major, student_group) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [location, checkin, checkout, guests], (err, result) => {
        /*if (err) {
            console.error('Błąd zapisu do bazy danych:', err);
            return res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
        }*/
    
        //res.send(`Dane ${name}, ${surname}, ${address}, ${major}, ${student_group} zostały zapisane pomyślnie!`);
    });
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Serwer działa na http://${process.env.DB_HOSTNAME}:${PORT}`); });
