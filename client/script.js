//==================================
// Podświetlanie aktywnej podstrony
const links = document.querySelectorAll('.grid_iteam a');
const currentUrl = window.location.href;

links.forEach(link => {
    if (link.href === currentUrl) {
        console.log(currentUrl)
        console.log(link.href)
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

    // Obsługa przycisków + i -
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
})
//=====================================