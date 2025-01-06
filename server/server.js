// import 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mysql = require('mysql2');
const cors = require('cors');
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
app.use(cors()); // Włącz obsługę CORS

app.use(bodyParser.json()); 
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    next(); 
});

app.get('/hotels', (req, res) => {
    //console.log(req.query)
    const { location, checkin, checkout, adults, children, rooms } = req.query;

    if (!location || !checkin || !checkout || !adults || !children || !rooms ) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    } else {
        console.log("dane odebranie poprawnie")
    }
    
    const query = 'SELECT * FROM hotels';
    db.query(query, [location, checkin, checkout, adults, children, rooms], (err, result) => {
        if (err) {
            console.error('Błąd:', err);
            return res.status(500).send('Wystąpił błąd', err);
        }

        console.log(result);
        return res.status(200).send(result);
    });
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Serwer działa na http://${process.env.DB_HOSTNAME}:${PORT}`); });
