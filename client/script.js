// Podświetlanie aktywnej podstrony
const links = document.querySelectorAll('.grid_iteam a');

const currentUrl = window.location.href;

links.forEach(link => {
    if (link.href === currentUrl) {
        console.log(currentUrl)
        console.log(link.href)
        link.classList.add('active'); // Dodaj klasę 'active' do aktywnego linku
    }
});
