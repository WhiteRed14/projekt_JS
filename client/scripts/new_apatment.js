document.addEventListener("DOMContentLoaded", () => {

    // Obsługa wysyłania formularza
    const reservationForm = document.querySelector(".rezervatiion-form");
    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Zatrzymaj domyślne działanie formularza


        // Pobierz dane z formularza
        const formData = new FormData(reservationForm);
        const reservationData = Object.fromEntries(formData.entries());

        
        console.log("Wysłane dane:", reservationData);
    });
});
