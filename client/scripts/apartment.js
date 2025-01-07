document.addEventListener("DOMContentLoaded", () => {
    const mockApartment = [
        {
            "id": 1,
            "name": "Sheraton-sopot",
            "image": "../../server/hotel_img/sheraton-sopot.jpg",
            "description": "BLA bla bla BLA bla bla",
            "price": 450,
            "rooms": 3,
            "adults": 4,
            "children": 2
        },
        {
            "id": 2,
            "name": "testowa nazwa 1",
            "image": "../../server/hotel_img/test1.jpg",
            "description": "Programmers. Everyday. Why? Why? Why? Oh, that's why",
            "price": 300,
            "rooms": 1,
            "adults": 2,
            "children": 3
        },
        {
            "id": 3,
            "name": "2 nazwa testowa",
            "image": "../../server/hotel_img/test2.jpg",
            "description": "Front-end is the path to the dark side. Front-end leads to html. Html lead to scripting. Scripting leads to suffering.",
            "price": 100,
            "rooms": 1,
            "adults": 1,
            "children": 0
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
        <button id="reserve-btn">Zarezerwuj</button>
    `;

    document.getElementById("reserve-btn").addEventListener("click", () => {
        openReservationForm(apartment.id); // Funkcja do obsługi rezerwacji
    });
}

function openReservationForm(apartmentId) {
    alert(`Rezerwacja apartamentu o ID: ${apartmentId}`);
}