//Navbar inferior
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("show"); // Alternar la clase 'show'
    });
});

//Pestaña Register-Login
    // Obtener elementos del DOM
    const modal = document.getElementById("modalRegistro");
    const btnSignUp = document.querySelector(".sign-up"); // Botón "Sign Up"
    const closeModal = document.querySelector(".close");

    // Mostrar el modal cuando se haga clic en "Sign Up"
    btnSignUp.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que el botón redireccione
        modal.style.display = "flex";
    });

    // Cerrar el modal al hacer clic en la 'X'
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Obtener elementos del DOM
    const modalSingin = document.getElementById("modaliniciosesion");
    const btnSignin = document.querySelector(".sign-in"); // Botón "Sign Up"
    const closeModalSingin = document.querySelector(".close");

    // Mostrar el modal cuando se haga clic en "Sign Up"
    btnSignin.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que el botón redireccione
        modalSingin.style.display = "flex";
    });

    // Cerrar el modal al hacer clic en la 'X'
    closeModalSingin.addEventListener("click", function() {
        modalSingin.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener("click", function(event) {
        if (event.target === modalSingin) {
            modalSingin.style.display = "none";
        }
    });




//Register-Login

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("register-confirm-password").value;

            // Validar que los campos no estén vacíos
            if (!name || !email || !password || !confirmPassword) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // Enviar los datos al backend
            const response = await fetch("register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();

            if (result.success) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                document.getElementById("register-modal").style.display = "none";
            } else {
                alert(result.message);
            }
        });
    }
});
