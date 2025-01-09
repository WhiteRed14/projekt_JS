document.addEventListener("DOMContentLoaded", () => {
    //ID apartamentu z URL
    const params = new URLSearchParams(window.location.search);
    const apartmentId = params.get("id");
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");


    // Obsługa wysyłania formularza
    const reservationForm = document.querySelector(".rezervatiion-form");
    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Zatrzymaj domyślne działanie formularza


        // Pobierz dane z formularza
        const formData = new FormData(reservationForm);
        formData.append('Hotel-Id', apartmentId);
        formData.append('Checkin', checkin);
        formData.append('Checkout', checkout);
        const reservationData = Object.fromEntries(formData.entries());
        
        console.log("Wysłane dane:", reservationData);
    });
});
