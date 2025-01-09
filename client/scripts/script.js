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
    document.addEventListener("click", (event) => {
        if(!details.contains(event.target) && event.target !== sum){
            details.classList.add('hidden');
        }
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

        // console.log("Lokalizacja: ", location);
        // console.log("Zameldowanie: ", checkin);
        // console.log("Wymeldowanie: ", checkout);
        // console.log("Dorośli: ", adults);
        // console.log("Dzieci:", children);
        // console.log("Pokoje: ", rooms);

        const baseURL = 'http://94.172.254.196:3000'

        fetch(`${baseURL}/hotels/?location=${location}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&rooms=${rooms}`)
        .then(response => {
            if (response.ok) {
                console.log("Dane wysłane pomyślnie!");
                
            } else {
                console.error('Błąd przy wysyłaniu danych:', response.statusText);
            }
            return response.json()
        })
        .then(data => {
            // console.log(data);
            console.log(checkin);
            displayResults(data, checkin, checkout);
        })
        .catch (error => {
            console.error('Błąd sieciowy:', error);
        }) 
    });
});

//Wyświetlnie wyników
function displayResults(data, checkin, checkout) {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = ""; // Zeruje poprzednie wyniki
    
    if (data.length === 0) {
        resultsSection.innerHTML = "<p>Nie znaleziono żadnych apartamentów dla podanych kryteriów.</p>";
        return;
    }
            //Wyświetla Zdjcie, nazwe i potrzebuje ID danego apartamentu(przechodzi na 
            // szczegółową strone apartment.html?id="(odpowiednie ID)")
            // chechin i chcekout pominąłem specjalnie, klient podaje jeszcze raz je w formularrzu rezerwacji
    data.forEach(apartment => {
        const apartmentElement = document.createElement("div");
        apartmentElement.className = "apartment-card";
        apartmentElement.innerHTML = `
        <img src="../../server/hotel_img/${apartment.Img}" alt="${apartment.Name}" class="apartment-image">
        <h3>${apartment.Name}</h3>
        <button class="details-btn" data-id="${apartment.Id}">Szczegóły</button>
        `;
        resultsSection.appendChild(apartmentElement);
    });
    console.log(checkin);
    addDetailsListeners(checkin, checkout);
}

//przycisk szczegółów

function addDetailsListeners(checkin, checkout) {
    const detailButtons = document.querySelectorAll(".details-btn");
    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const apartmentId = button.dataset.id;

            window.location.href = `apartment.html?id=${apartmentId}&checkin=${checkin}&checkout=${checkout}`; // Przekierowanie do strony szczegółów
        });
    });
}