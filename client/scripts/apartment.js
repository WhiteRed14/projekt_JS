document.addEventListener("DOMContentLoaded", () => {
    const mockApartment = [
        {
            "id": 1,
            "name": "Sheraton-sopot",
            "image": "../../server/hotel_img/sheraton-sopot.jpg",
            "description": "Położony zaledwie kilka kroków od piaszczystej plaży oraz sopockiego molo, oferuje 189 komfortowych pokoi w tym 11 wyjątkowych apartamentów z widokiem na Zatokę Gdańską. Na terenie Hotelu znajduje się jedno z największych centrów konferencyjnych w regionie z 14 salami konferencyjnymi o łącznej powierzchni 3000 m2.",
            "price": 450,
            "rooms": 3,
            "adults": 4,
            "children": 2,
            "latitude": 54.4466,
            "longitude": 18.569228
        },
        {
            "id": 2,
            "name": "testowa nazwa 1",
            "image": "../../server/hotel_img/test1.jpg",
            "description": "Programmers. Everyday. Why? Why? Why? Oh, that's why",
            "price": 300,
            "rooms": 1,
            "adults": 2,
            "children": 3,
            "latitude": 54.444741,
            "longitude": 18.554363
        },
        {
            "id": 3,
            "name": "2 nazwa testowa",
            "image": "../../server/hotel_img/test2.jpg",
            "description": "Front-end is the path to the dark side. Front-end leads to html. Html lead to scripting. Scripting leads to suffering.",
            "price": 100,
            "rooms": 1,
            "adults": 1,
            "children": 0,
            "latitude": 54.467854,
            "longitude": 18.504466
        }
    ];

    //`id` z adresu URL
    const params = new URLSearchParams(window.location.search);
    const apartmentId = parseInt(params.get("id")); // Pobierz id i zamień na liczbę  
    console.log(apartmentId);

    // Znajdź apartament z opdowiednim ID
    const apartment = mockApartment.find(ap => ap.id === apartmentId);
    console.log(apartment);

    displayApartmentDetails(apartment);
});

function displayApartmentDetails(apartment) {

    const detailsSection = document.getElementById("apartment-details");
    detailsSection.innerHTML = `
        <img src="${apartment.image}" alt="${apartment.name}" class="apartment-image">
        <h2>${apartment.name}</h2>
        <p>${apartment.description}</p>
        <p>Apartament posiada ${apartment.rooms} pokoje.</p>
        <p>Pomieści: ${apartment.adults} dorosłych i ${apartment.children} dzieci.</p>
        <p>Cena: ${apartment.price} PLN za noc.</p>
        <div id="map" style="height: 300px; margin-top: 20px;"></div>
        <button id="reserve-btn">Zarezerwuj</button>
    `;

    // Mapa Leaflet
    const map = L.map('map').setView([apartment.latitude, apartment.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([apartment.latitude, apartment.longitude]).addTo(map)
    .bindPopup(`<b>${apartment.name}`)
    .openPopup();

    //Przycisk do rezerwacji
    document.getElementById("reserve-btn").addEventListener("click", () => {
        const apartmentId = new URLSearchParams(window.location.search).get("id");

        window.location.href = `reservation.html?id=${apartmentId}`;
    });
}

