document.addEventListener("DOMContentLoaded", () => {

    // Obsługa wysyłania formularza
    const reservationForm = document.querySelector(".rezervatiion-form");
    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Zatrzymaj domyślne działanie formularza


        // Pobierz dane z formularza
        const formData = new FormData(reservationForm);
        let reservationData = Object.fromEntries(formData.entries());

        //Zmiana na number
        reservationData.children = Number(reservationData.children);
        reservationData.adults = Number(reservationData.adults);
        reservationData.rooms = Number(reservationData.rooms);
        reservationData.price = Number(reservationData.price);

        console.log("Wysłane dane:", reservationData);
    });
});
