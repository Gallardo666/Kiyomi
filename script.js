document.addEventListener("DOMContentLoaded", function () {
    const btnFlecha = document.getElementById("btnFlecha");
    const heroSection = document.querySelector(".hero");

    function toggleButtonVisibility() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const screenWidth = window.innerWidth;

        if (heroBottom < 0 && screenWidth <= 1024) {
            btnFlecha.style.display = "flex";
        } else {
            btnFlecha.style.display = "none";
        }
    }

    // Comprobar al cargar la página y en cada scroll o cambio de tamaño
    window.addEventListener("scroll", toggleButtonVisibility);
    window.addEventListener("resize", toggleButtonVisibility);
    
    toggleButtonVisibility(); // Ejecutar al inicio por si la página se carga ya desplazada
});
