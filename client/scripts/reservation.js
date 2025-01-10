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
        formData.append('hotel_Id', apartmentId);
        formData.append('checkin', checkin);
        formData.append('checkout', checkout);
        const reservationData = Object.fromEntries(formData.entries());

        // Pobierz dane z formularza
        const email = formData.get('email');

        // Walidacja e-maila
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Wprowadź poprawny adres e-mail w formacie mail@domain.com");
            return; // Zatrzymaj dalsze przetwarzanie
        }
        
        console.log("Wysłane dane:", reservationData);

        const response = await fetch('http://94.172.254.196:3000/newReservation', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(reservationData) }); 
        const result = await response.text(); 
        alert(result);
    });
});
