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
