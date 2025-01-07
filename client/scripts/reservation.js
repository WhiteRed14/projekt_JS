document.addEventListener("DOMContentLoaded", () => {
    // Pobierz ID apartamentu z URL
    const params = new URLSearchParams(window.location.search);
    const apartmentId = params.get("id");


    // Obsługa wysyłania formularza
    const reservationForm = document.querySelector(".rezervatiion-form");
    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Zatrzymaj domyślne działanie formularza

        // Pobierz dane z formularza
        const formData = new FormData(reservationForm);
        const reservationData = Object.fromEntries(formData.entries());

        //Sprawdzenie checkin checkout 
        const checkinDate = new Date(reservationData.checkin);
        const checkoutDate = new Date(reservationData.checkout);
        
        if (checkinDate >= checkoutDate) {
            alert("Data zameldowania musi być wcześniejsza niż data wymeldowania.");
            return; 
        }
        
        console.log("Wysłane dane:", reservationData);

    });
});
