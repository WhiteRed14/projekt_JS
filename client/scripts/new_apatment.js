document.addEventListener("DOMContentLoaded", () => {

    // Obsługa wysyłania formularza
    const reservationForm = document.querySelector(".rezervatiion-form");
    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Zatrzymaj domyślne działanie formularza


        // Pobierz dane z formularza
        const formData = new FormData(reservationForm);
        let reservationData = { 
            name: formData.get('name'),
            img: formData.get('image'),
            description: formData.get('description'),
            price: formData.get('price'),
            rooms: formData.get('rooms'),
            adults: formData.get('adults'),
            children: formData.get('children'),
            lat: formData.get('lat'),
            lon: formData.get('lon'),
            city: formData.get('city')
        };

        //Zmiana na number
        reservationData.children = Number(reservationData.children);
        reservationData.adults = Number(reservationData.adults);
        reservationData.rooms = Number(reservationData.rooms);
        reservationData.price = Number(reservationData.price);

        console.log(reservationData);
        
        const response = await fetch('http://94.172.254.196:3000/newHotel', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(reservationData) }); 
        const result = await response.text(); 
        alert(result);
    });
});


//-- fragment fetch post z labów18

// document.getElementById('dataForm').addEventListener('submit', async (event) => { 
//     event.preventDefault(); // Zatrzymanie domyślnego działania formularza 
//     const formData = new FormData(event.target);
//     const data = { 
//         name: formData.get('name'),
//         surname: formData.get('surname'),
//         address: formData.get('address'),
//         major: formData.get('major'),
//         student_group: formData.get('student_group')
//     };
//     const response = await fetch('http://localhost:3000/submit', { 
//     method: 'POST', 
//     headers: { 'Content-Type': 'application/json' }, 
//     body: JSON.stringify(data) }); 
//     const result = await response.text(); 
//     alert(result); // Wyświetlenie odpowiedzi serwera
// });
