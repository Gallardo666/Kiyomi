document.addEventListener("DOMContentLoaded", function () {
    // ----- Navbar inferior -----
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("show"); // Alterna la clase 'show'
        });
    } else {
        console.error("No se encontraron los elementos menu-toggle o navbar.");
    }

    // ----- Modal Registro (Sign Up) -----
    const modalRegistro = document.getElementById("modalRegistro");
    const btnSignUp = document.querySelector(".sign-up");
    // Obtener el botón de cerrar dentro del modal registro
    const closeRegistro = modalRegistro ? modalRegistro.querySelector(".close") : null;

    if (modalRegistro && btnSignUp && closeRegistro) {
        // Asegurarse de que el modal inicie oculto
        modalRegistro.style.display = "none";

        // Mostrar el modal al hacer click en "Sign Up"
        btnSignUp.addEventListener("click", function (event) {
            event.preventDefault();
            modalRegistro.style.display = "flex";
        });

        // Cerrar el modal al hacer click en la 'X'
        closeRegistro.addEventListener("click", function () {
            modalRegistro.style.display = "none";
        });

        // Cerrar el modal si se hace clic fuera de él
        window.addEventListener("click", function (event) {
            if (event.target === modalRegistro) {
                modalRegistro.style.display = "none";
            }
        });
    } else {
        console.error("Falta alguno de los elementos para el modal de registro.");
    }

    // ----- Modal Iniciar Sesión (Sign In) -----
    const modalSignin = document.getElementById("modaliniciosesion");
    const btnSignin = document.querySelector(".sign-in");
    // Obtener el botón de cerrar dentro del modal de inicio de sesión
    const closeSignin = modalSignin ? modalSignin.querySelector(".close") : null;

    if (modalSignin && btnSignin && closeSignin) {
        // Asegurarse de que el modal inicie oculto
        modalSignin.style.display = "none";

        // Mostrar el modal al hacer click en "Sign In"
        btnSignin.addEventListener("click", function (event) {
            event.preventDefault();
            modalSignin.style.display = "flex";
        });

        // Cerrar el modal al hacer click en la 'X'
        closeSignin.addEventListener("click", function () {
            modalSignin.style.display = "none";
        });

        // Cerrar el modal si se hace clic fuera de él
        window.addEventListener("click", function (event) {
            if (event.target === modalSignin) {
                modalSignin.style.display = "none";
            }
        });
    } else {
        console.error("Falta alguno de los elementos para el modal de inicio de sesión.");
    }

    // ----- Formulario de registro -----
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("register-confirm-password").value;

            // Validar campos vacíos
            if (!name || !email || !password || !confirmPassword) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Validar coincidencia de contraseñas
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // Enviar los datos al backend
            try {
                const response = await fetch("register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                const result = await response.json();

                if (result.success) {
                    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                    // Se puede cerrar el modal de registro si existe
                    if (modalRegistro) {
                        modalRegistro.style.display = "none";
                    }
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error en el registro:", error);
                alert("Hubo un problema al enviar los datos.");
            }
        });
    }
});