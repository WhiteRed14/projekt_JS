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

        console.log("Lokalizacja: ", location);
        console.log("Zameldowanie: ", checkin);
        console.log("Wymeldowanie: ", checkout);
        console.log("Dorośli: ", adults);
        console.log("Dzieci:", children);
        console.log("Pokoje: ", rooms);

        const data = {
            location: location,
            checkin: checkin,
            checkout: checkout,
            guests: {
                adults: adults,
                children: children,
                rooms: rooms
            }
        };

        try {
            const response = await fetch('http://localhost/src/main.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Dane wysłane pomyślnie!");
                window.location.href = 'src/main.html';
            } else {
                console.error('Błąd przy wysyłaniu danych:', response.statusText);
            }
        } catch (error) {
            console.error('Błąd sieciowy:', error);
        }
    });
});

//===========================================