//==================================
// Podświetlanie aktywnej podstrony
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.grid_iteam a');
    const currentUrl = new URL(window.location.href); 
    links.forEach(link => {
        const linkUrl = new URL(link.href); 

        if (linkUrl.pathname === currentUrl.pathname) {
            link.classList.add('active');
        }
    });
});

//==================================

//==================================
//Wybór liczby osób i pokoi
document.addEventListener("DOMContentLoaded", () => {
    const sum = document.getElementById("guests-sum");
    const details = document.getElementById("guests-details");
    const counts = {
        adults: 2,
        children: 0,
        rooms:1,
    };
    //chowanie search-bar
    sum.addEventListener("click", () => {
        details.classList.toggle('hidden');
    });

    // Przyciski + i -
    details.addEventListener("click", (event) => {
        const target = event.target;
        const type = target.dataset.type;
        
        if (!type) return;

        if (target.classList.contains("btn-increase")) {
            counts[type]++;
        } else if (target.classList.contains("btn-decrease")) {
            counts[type] = Math.max(0, counts[type] - 1);
        }

        document.getElementById(`${type}-count`).textContent = counts[type];

        sum.textContent = `${counts.adults} dorośli · ${counts.children} dzieci · ${counts.rooms} pokój/pokoje`;
        
        document.addEventListener("click", (event) => {
            if(!details.contains(event.target) && event.target !== sum){
                details.classList.add('hidden');
            }
        });
    });
});
//=====================================


//=====================================
//Button szukaj

document.addEventListener("DOMContentLoaded", () => {
  
    const searchButton = document.getElementById("search-button");
    const locationF = document.getElementById("location");
    const checkinF = document.getElementById("checkin");
    const checkoutF = document.getElementById("checkout");
    const adultsCount = document.getElementById("adults-count");
    const childrenCount = document.getElementById("children-count");
    const roomsCount = document.getElementById("rooms-count");

    searchButton.addEventListener("click",async () =>{

        const location = locationF.value;
        let checkin = checkinF.value;
        let checkout = checkoutF.value;

        const adults = adultsCount.innerText;
        const children = childrenCount.innerText;
        const rooms = roomsCount.innerText;

        if(!location || !checkin || !checkout) {
            alert("Prosze uzupełnić wszystkie wymagane pola(lokalizacze oraz daty zameldowania/wymeldowania)")
            return;
        }
        if (checkin > checkout) {
            const swap = checkin;
            checkin = checkout;
            checkout = swap;
            alert("Data zameldowania została zmieniona z datą wymeldowania, ponieważ data zameldowania była póżniej niż wymeldowania")
        }
        if (adults <= 0 || rooms <= 0) {
            alert("Liczba dorosłych i pokoi musi być większa od zera.");
            return;
        }

        console.log("Lokalizacja: ", location);
        console.log("Zameldowanie: ", checkin);
        console.log("Wymeldowanie: ", checkout);
        console.log("Dorośli: ", adults);
        console.log("Dzieci:", children);
        console.log("Pokoje: ", rooms);

        const baseURL = 'http://localhost:3000'

        fetch(`${baseURL}/hotels/?location=${location}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&rooms=${rooms}&`)
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
        })
        .catch (error => {
            console.error('Błąd sieciowy:', error);
        }) 
    });
});

//===========================================


//================================
//Wyswietlanie listy hoteli
function displayResults(data) {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = ""; // Wyczyść poprzednie wyniki
    
    if (data.length === 0) {
        resultsSection.innerHTML = "<p>Nie znaleziono żadnych apartamentów dla podanych kryteriów.</p>";
        return;
    }
    
    data.forEach(apartment => {
        const apartmentElement = document.createElement("div");
        apartmentElement.className = "apartment-card";
        apartmentElement.innerHTML = `
        <img src="${apartment.image}" alt="${apartment.name}" class="apartment-image">
        <h3>${apartment.name}</h3>
        <button class="details-btn" data-id="${apartment.id}">Szczegóły</button>
        `;
        resultsSection.appendChild(apartmentElement);
    });
    
    addDetailsListeners(); // Dodaj event listener na przyciski "Szczegóły"
}

// Przykładowe dane
document.addEventListener("DOMContentLoaded", () => {
    const mockData = [
        {
            "id": 1,
            "name": "Sheraton-sopot",
            "image": "../../server/hotel_img/sheraton-sopot.jpg"
        },
        {
            "id": 2,
            "name": "testowa nazwa 1",
            "image": "../../server/hotel_img/test1.jpg"
        },
        {
            "id": 3,
            "name": "2 nazwa testowa",
            "image": "../../server/hotel_img/test2.jpg"
        }
    ];

    // Wyświetl wyniki na podstawie przykładowych danych
    displayResults(mockData);
});

//===================
//przycisk szczegółów

function addDetailsListeners() {
    const detailButtons = document.querySelectorAll(".details-btn");
    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const apartmentId = button.dataset.id;
            window.location.href = `/apartment.html?id=${apartmentId}`; // Przekierowanie do strony szczegółów
        });
    });
}
