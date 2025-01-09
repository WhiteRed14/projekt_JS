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


// searching for available hotels that match the requirements
app.get('/hotels', (req, res) => {
    //console.log(req.query)
    const { location, checkin, checkout, adults, children, rooms } = req.query;

    if (!location || !checkin || !checkout || !adults || !children || !rooms ) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    } else {
        console.log("dane odebrane poprawnie")
    }
    
    const query = `SELECT Id, Name, Img FROM hotels WHERE (City = ?) AND (Rooms >= ?) AND (Adults >= ?) AND (Children >= ?)`;
    db.query(query, [location, rooms, adults, children, checkin, checkout], (err, result) => {
        if (err) {
            console.error('Błąd:', err);
            return res.status(500).send('Wystąpił błąd', err);
        }

        console.log(result);
        return res.status(200).send(result);
    });
});

// returning all data regarding a hotel offer
app.get('/hotelData', (req, res) => {
    //console.log(req.query)
    const id = req.query;

    if (!id ) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    } else {
        console.log("dane odebrane poprawnie")
    }
    
    const query = `SELECT * FROM hotels WHERE (Id = ?)`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Błąd:', err);
            return res.status(500).send('Wystąpił błąd', err);
        }

        console.log(result);
        return res.status(200).send(result);
    });
});

// adding new reservations to the database
app.post('/newReservation', (req, res) => {

    const { name, surname, email, country, country_code, phone, hotel_id, checkin, checkout } = req.body;

    if (!name || !surname || !email || !country || !country_code || !phone || !hotel_id || !checkin || !checkout) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    }

    const query = 'INSERT INTO reservations (Checkin, Checkout, Country, Country-Code, Email, Name, Phone, Surname, Hotel-Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, surname, email, country, country_code, phone, hotel_id, checkin, checkout], (err, result) => {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err);
            return res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
        }
        console.log(`Dane ${name}, ${surname}, ${email}, ${country}, ${country_code}, ${phone}, ${hotel_id}, ${checkin}, ${checkout} zostały dodane do bazy`)
        res.send(`Dane ${name}, ${surname}, ${email}, ${country}, ${country_code}, ${phone}, ${hotel_id}, ${checkin}, ${checkout} zostały zapisane pomyślnie!`);
    });
});

// posting new apartments and adding them to the database -- not available from main.html
app.post('/newHotel', (req, res) => {

    const { name, img, description, price, rooms, adults, children, lat, lon, city } = req.body;

    if (!name || !img || !description || !price || !rooms || !adults || !children || !lat || !lon || !city) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    }

    const query = 'INSERT INTO hotels (Name, Img, Description, Price, Rooms, Adults, Children, Lat, Lon, City) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, img, description, price, rooms, adults, children, lat, lon, city], (err, result) => {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err);
            return res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
        }
        console.log(`Dane ${name}, ${img}, ${description}, ${price}, ${rooms}, ${adults}, ${children}, ${lat}, ${lon}, ${city} zostały dodane do bazy`)
        res.send(`Dane ${name}, ${img}, ${description}, ${price}, ${rooms}, ${adults}, ${children}, ${lat}, ${lon}, ${city} zostały zapisane pomyślnie!`);
    });
});


const PORT = 3000;
app.listen(PORT, () => {console.log(`Serwer działa na http://${process.env.DB_HOSTNAME}:${PORT}`); });
