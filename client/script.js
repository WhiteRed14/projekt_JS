//==================================
// Podświetlanie aktywnej podstrony
const links = document.querySelectorAll('.grid_iteam a');
const currentUrl = window.location.href;

links.forEach(link => {
    if (link.href === currentUrl) {
        link.classList.add('active'); 
    }
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

        // Aktualizuj wyświetlane liczby
        document.getElementById(`${type}-count`).textContent = counts[type];

        // Aktualizuj podsumowanie
        sum.textContent = `${counts.adults} dorośli · ${counts.children} dzieci · ${counts.rooms} pokój/pokoje`;
    });

    document.addEventListener("click", (event) => {
        if(!details.contains(event.target) && event.target !== sum){
            details.classList.add('hidden');
        }
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
    const guestsSum = document.getElementById("guests-sum");

    searchButton.addEventListener("click", () =>{

        const location = locationF.value;
        let checkin = checkinF.value;
        let checkout = checkoutF.value;
        const guests = guestsSum.value;

        if(!checkin || !checkout) {
            alert("Prosze uzupełnić wszystkie wymagane pola(lokalizacze oraz daty zameldowania/wymeldowania)")
            return;
        }
        if (checkin > checkout) {
            const swap = checkin;
            checkin = checkout;
            checkout = swap;
        }

        console.log("Lokalizacja: ", location);
        console.log("Zameldowanie: ", checkin);
        console.log("Wymeldowanie: ", checkout);
        console.log("Gośćie: ", guests);
    })
});