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

//function for checking potencial checkin&checkout collisions between existing reservations and potential new ones
function reservationCheck(in1, out1, in2, out2) { // will return false if checkin&checkout times collide and true if they don't
    //console.log("Checkin&Checkout of reservation", in1, out1);
    //console.log("Checkin&Checkout to check if collides", in2, out2);
    if (in1 < in2) {
        if (in2 < out1) {
            return false;
        }
    } else {
        if(in1 > in2) {
            if (out2 > out1) {
                return false
            } else {
                if (out2 > in1) {
                    return false
                }
            }
        } else {
            return false
        }
    }
    return true
}

async function isViable(hotelId, checkin, checkout) {
    try {
        const query = `SELECT Checkin, Checkout, Hotel_Id FROM reservations WHERE (reservations.Hotel_Id = ?)`;
        const result = await db.promise().query(query, [hotelId])
            .then((result) => {
            const [rows, fields] = result;
            //console.log('Second query result', rows);
            if(rows.length!=0){
                return (rows.reduce((acc, curr) => {
                    return (acc&&reservationCheck(curr.Checkin, curr.Checkout, checkin, checkout))
                }, true))
            } else {
                return true
            }
        })
        return result;
    } catch(err) {
        console.error('Błąd:', err);
        return res.status(500).send('Wystąpił błąd', err);
    }

}


// searching for available hotels that match the requirements
app.get('/hotels', (req, res) => {
    //console.log(req.query)
    const { location, checkin, checkout, adults, children, rooms } = req.query;

    if (!location || !checkin || !checkout || !adults || !children || !rooms ) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    } else {
        console.log("Request potencjalnych hoteli odebrany poprawnie!")
    }
    
    const query1 = `SELECT Id, Name, Img FROM hotels WHERE (City = ?) AND (Rooms >= ?) AND (Adults >= ?) AND (Children >= ?)`;
    db.query(query1, [location, rooms, adults, children, checkin, checkout], (err, result) => {
        if (err) {
            console.error('Błąd:', err);
            return res.status(500).send('Wystąpił błąd', err);
        }

        console.log("First query result:", result);

        Promise.all(result.map((el) => isViable(el.Id, new Date(checkin), new Date(checkout))))
        .then((results) => {
            console.log("isViable results:", results);
            //console.log("Results before cutting nonviable:", result);
            results.forEach((el, id) => {
                //console.log(`Hotel ${result[id].Name} viability: ${el}`)
                if(!el){
                    result.splice(id, 1);
                }
            })
            console.log("Viable hotels:", result);
            return res.status(200).send(result);
        })
    });
});

// returning all data regarding a hotel offer
app.get('/hotelData', (req, res) => {
    //console.log(req.query)
    const { id } = req.query;
    console.log(id);
    if (!id) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    } else {
        console.log("Request szczegółowych danych hotelu odebrany poprawnie!")
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

    //console.log(req.body)
    const { name, surname, email, country, country_code, phone, hotel_Id, checkin, checkout } = req.body;

    //console.log(name, surname, email, country, country_code, phone, hotel_Id, checkin, checkout)
    
    if (!name || !surname || !email || !country || !country_code || !phone || !hotel_Id || !checkin || !checkout) {
        return res.status(400).send('Wszystkie pola są wymagane!');
    }

    const query = 'INSERT INTO reservations (Checkin, Checkout, Country, Country_Code, Email, Name, Phone, Surname, Hotel_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [checkin, checkout, country, country_code, email, name, phone, surname, hotel_Id], (err, result) => {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err);
            return res.status(500).send('Wystąpił błąd podczas zapisywania danych.');
        }
        console.log(`Dane ${name}, ${surname}, ${email}, ${country}, ${country_code}, ${phone}, ${hotel_Id}, ${checkin}, ${checkout} zostały dodane do bazy`)
        res.send(`Dane ${name}, ${surname}, ${email}, ${country}, ${country_code}, ${phone}, ${hotel_Id}, ${checkin}, ${checkout} zostały zapisane pomyślnie!`);
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
