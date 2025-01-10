document.addEventListener("DOMContentLoaded", () => {
    //Przykładowe dane jakie może dostawać z serwera
    // (Chyba taka może być tabela, ale może o czymś nie pomyślałem)
    // const mockApartment = [
    //     {
    //         "name": "Sheraton-sopot",
    //         "image": "../../server/hotel_img/sheraton-sopot.jpg",
    //         "description": "Położony zaledwie kilka kroków od piaszczystej plaży oraz sopockiego molo, oferuje 189 komfortowych pokoi w tym 11 wyjątkowych apartamentów z widokiem na Zatokę Gdańską. Na terenie Hotelu znajduje się jedno z największych centrów konferencyjnych w regionie z 14 salami konferencyjnymi o łącznej powierzchni 3000 m2.",
    //         "price": 450,
    //         "rooms": 3,
    //         "adults": 4,
    //         "children": 2,
    //         "latitude": 54.4466,
    //         "longitude": 18.569228,
    //         "city": "krakow"
    //     },
    //     {
    //         "name": "testowa nazwa 1",
    //         "image": "../../server/hotel_img/test1.jpg",
    //         "description": "Programmers. Everyday. Why? Why? Why? Oh, that's why",
    //         "price": 300,
    //         "rooms": 1,
    //         "adults": 2,
    //         "children": 3,
    //         "latitude": 54.444741,
    //         "longitude": 18.554363,
    //         "city": "gdynia"
    //     },
    //     {
    //         "name": "2 nazwa testowa",
    //         "image": "../../server/hotel_img/test2.jpg",
    //         "description": "Front-end is the path to the dark side. Front-end leads to html. Html lead to scripting. Scripting leads to suffering.",
    //         "price": 100,
    //         "rooms": 1,
    //         "adults": 1,
    //         "children": 0,
    //         "latitude": 54.467854,
    //         "longitude": 18.504466,
    //         "city": "warszawa"
    //     }
    // ];
    // const apartment = mockApartment.find(ap => ap.id === apartmentId);

    //`id` z adresu URL
   
    const params = new URLSearchParams(window.location.search);
    const apartmentId = parseInt(params.get("id")); // Pobierz id i zamień na liczbę  
    console.log(apartmentId);

    // Znajdź apartament z opdowiednim ID(tu bedzie pobierał z 
    // serwera ale narazie działa na przykłądowych danych)

    const baseURL = 'http://94.172.254.196:3000'

    fetch(baseURL+'/hoteldata/?id='+apartmentId)
    .then(response => {
        if (response.ok) {
            console.log("Dane wysłane pomyślnie!");
            
        } else {
            console.error('Błąd przy wysyłaniu danych:', response.statusText);
        }
        return response.json()
    })
    .then(data => {
        console.log(data);

        displayApartmentDetails(data[0]);
    })
    .catch (error => {
        console.error('Błąd sieciowy:', error);
    }) 
});


// Wyświetlenie wszystkiech danych i przycisk do przeniesienia na formularz rezerwacji
function displayApartmentDetails(apartment) {

    const detailsSection = document.getElementById("apartment-details");
    detailsSection.innerHTML = `
        <img src="../../server/hotel_img/${apartment.Img}" alt="${apartment.Name}" class="apartment-image">
        <h2>${apartment.Name}</h2>
        <p>${apartment.Description}</p>
        <p>Apartament posiada ${apartment.Rooms} pokoje.</p>
        <p>Pomieści: ${apartment.Adults} dorosłych i ${apartment.Children} dzieci.</p>
        <p>Cena: ${apartment.Price} PLN za noc.</p>
        <div id="map" style="height: 300px; margin-top: 20px;"></div>
        <button id="reserve-btn">Zarezerwuj</button>
    `;

    // Mapa Leaflet
    const map = L.map('map').setView([apartment.Lat, apartment.Lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([apartment.Lat, apartment.Lon]).addTo(map)
    .bindPopup(`<b>${apartment.Name}`)
    .openPopup();

    //Przycisk do rezerwacji
    document.getElementById("reserve-btn").addEventListener("click", () => {
        const apartmentId = new URLSearchParams(window.location.search).get("id");
        const checkin = new URLSearchParams(window.location.search).get("checkin");
        const checkout = new URLSearchParams(window.location.search).get("checkout");


        window.location.href = `reservation.html?id=${apartmentId}&checkin=${checkin}&checkout=${checkout}`;
    });
}

