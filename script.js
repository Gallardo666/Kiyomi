
document.addEventListener("DOMContentLoaded", function () {
    // Variable global para el estado de inicio de sesión
    let isLoggedIn = false;
    
    // Forzar a que el modal de la cesta inicie oculto al cargar la página
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = "none";
    }
    
    // ---------------------
    // Código de gestión de la cesta
    // ---------------------
    let cart = [];
    
    function updateCartCount() {
        const countElement = document.querySelector('.cart-count');
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalCount;
    }
    
    function formatCurrency(amount) {
        return Number(amount).toFixed(2);
    }
    
    function updateCartModal() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Limpiar contenido previo
    
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            // Crear contenedor para el ítem
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.marginBottom = '1rem';
            itemDiv.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px; margin-right:20px;">
                    <img src="${item.img}" alt="${item.title}" style="width:70px; height:70px; object-fit:cover; border-radius:5px;">
                    <div>
                        <strong>${item.title}</strong><br>
                        <span>€${formatCurrency(item.price)}</span>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:5px;">
                    <button data-index="${index}" class="decrement-item" title="Disminuir cantidad" style="padding:5px 8px;">&#8675;</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button data-index="${index}" class="increment-item" title="Aumentar cantidad" style="padding:5px 8px;">&#8673;</button>
                    <button data-index="${index}" class="remove-item" title="Eliminar item" style="padding:5px 8px;">&#10005;</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
        document.getElementById('totalAmount').textContent = formatCurrency(total);
        const cartTotalElement = document.getElementById('cartTotal');
        cartTotalElement.style.cssText = "font-size: 1.4rem; font-weight: bold; color: #e63946; text-align: right; margin-top: 1rem; background: #f8f8f8; padding: 10px; border-radius: 5px;";
    }
    
    function findCartItem(title) {
        return cart.find(item => item.title === title);
    }
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const title = menuItem.querySelector('h3').textContent.trim();
            const priceText = menuItem.querySelector('span').textContent;
            const price = parseFloat(priceText.replace(/[^0-9,]/g, '').replace(',', '.'));
            const img = menuItem.querySelector('img').getAttribute('src');
    
            const existingItem = findCartItem(title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title, price, img, quantity: 1 });
            }
            updateCartCount();
        });
    });
    
    // Al hacer click en la cesta, se comprueba si está logueado
    document.querySelector('.cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            let loginPrompt = document.getElementById('loginPrompt');
            if (!loginPrompt) {
                loginPrompt = document.createElement("div");
                loginPrompt.id = "loginPrompt";
                loginPrompt.style.position = "fixed";
                loginPrompt.style.top = "10px";
                loginPrompt.style.right = "10px";
                loginPrompt.style.background = "#f8d7da";
                loginPrompt.style.color = "#721c24";
                loginPrompt.style.padding = "10px";
                loginPrompt.style.borderRadius = "5px";
                loginPrompt.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                loginPrompt.style.zIndex = "9999";
                document.body.appendChild(loginPrompt);
            }
            loginPrompt.textContent = "Inicia Sesion o Registrate para seguir con el pedido.";
            setTimeout(() => {
                loginPrompt.remove();
            }, 3000);
            return;
        }
        updateCartModal();
        document.getElementById('cartModal').style.display = 'flex';
    });
    
    
    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
    
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('increment-item')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCartCount();
            updateCartModal();
        } else if (e.target.classList.contains('decrement-item')) {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartCount();
            updateCartModal();
        } else if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartCount();
            updateCartModal();
        }
    });
    
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            console.log('Tu cesta está vacía.');
        } else {
            console.log('Procediendo a realizar el pedido...');
        }
    });
    
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cartModal');
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // ---------------------
    // Funcionalidad de la interfaz (Navbar, modales de registro e inicio de sesión)
    // ---------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("show");
        });
    } else {
        console.error("No se encontraron los elementos menu-toggle o navbar.");
    }
    
    // ----- Modal Registro (Sign Up) -----
    const modalRegistro = document.getElementById("modalRegistro");
    const btnSignUp = document.querySelector(".sign-up");
    const closeRegistro = modalRegistro ? modalRegistro.querySelector(".close") : null;
    
    if (modalRegistro && btnSignUp && closeRegistro) {
        modalRegistro.style.display = "none";
    
        btnSignUp.addEventListener("click", function (event) {
            event.preventDefault();
            modalRegistro.style.display = "flex";
        });
    
        closeRegistro.addEventListener("click", function () {
            modalRegistro.style.display = "none";
        });
    
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
    const closeSignin = modalSignin ? modalSignin.querySelector(".close") : null;
    
    if (modalSignin && btnSignin && closeSignin) {
        modalSignin.style.display = "none";
    
        btnSignin.addEventListener("click", function (event) {
            event.preventDefault();
            modalSignin.style.display = "flex";
        });
    
        closeSignin.addEventListener("click", function () {
            modalSignin.style.display = "none";
        });
    
        window.addEventListener("click", function (event) {
            if (event.target === modalSignin) {
                modalSignin.style.display = "none";
            }
        });
    
        // Sistema de autenticación para el modal de inicio de sesión
        // Se asume que el formulario de inicio de sesión tiene id "registroForm"
        const loginForm = document.getElementById("registroForm");
        if (loginForm) {
            // Crear (o usar) un contenedor para mensajes de login encima del botón submit
            let loginMessage = document.getElementById("loginMessage");
            if (!loginMessage) {
                loginMessage = document.createElement("div");
                loginMessage.id = "loginMessage";
                loginMessage.style.marginBottom = "10px";
                loginMessage.style.textAlign = "center";
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                loginForm.insertBefore(loginMessage, submitBtn);
            }
    
            loginForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const validEmail = "user@example.com";
                const validPassword = "123456";
    
                const emailInput = document.getElementById("email");
                const passwordInput = document.getElementById("password");
                const email = emailInput.value.trim();
                const password = passwordInput.value;
    
                if (email === validEmail && password === validPassword) {
                    loginMessage.textContent = "Inicio de sesión exitoso!";
                    loginMessage.style.color = "green";
                    // Ocultar los botones de Sign In y Sign Up
                    btnSignin.style.display = "none";
                    if (btnSignUp) btnSignUp.style.display = "none";
    
                    // Actualizar el estado de sesión
                    isLoggedIn = true;
    
                    // Preparar elementos de bienvenida y botón de Sign Out
                    const welcomeMsg = document.createElement("span");
                    welcomeMsg.textContent = "Bienvenido, " + email;
                    welcomeMsg.style.marginRight = "10px";
    
                    const signOutBtn = document.createElement("button");
                    signOutBtn.textContent = "Sign Out";
                    signOutBtn.className = "nav-btn sign-out";
                    signOutBtn.style.marginLeft = "10px";
                    signOutBtn.style.padding = "10px 20px";
                    signOutBtn.style.background = "#e63946";
                    signOutBtn.style.color = "#fff";
                    signOutBtn.style.border = "none";
                    signOutBtn.style.borderRadius = "5px";
                    signOutBtn.style.cursor = "pointer";
    
                    // Esperar 2 segundos antes de cerrar el modal y actualizar la interfaz
                    setTimeout(function(){
                        const btnInicioContainer = document.querySelector('.btn-inicio');
                        btnInicioContainer.appendChild(welcomeMsg);
                        btnInicioContainer.appendChild(signOutBtn);
                        loginForm.reset();
                        modalSignin.style.display = "none";
                        loginMessage.textContent = "";
                    }, 2000);
    
                    signOutBtn.addEventListener("click", function() {
                        welcomeMsg.remove();
                        signOutBtn.remove();
                        btnSignin.style.display = "inline-block";
                        if (btnSignUp) btnSignUp.style.display = "inline-block";
                        isLoggedIn = false;
                    });
                } else {
                    loginMessage.textContent = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
                    loginMessage.style.color = "red";
                }
            });
        } else {
            console.error("No se encontró el formulario de inicio de sesión con id 'registroForm'.");
        }
    } else {
        console.error("Falta alguno de los elementos para el modal de inicio de sesión.");
    }
    
    // ----- Formulario de registro -----
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        let registerMessage = document.getElementById("registerMessage");
        if (!registerMessage) {
            registerMessage = document.createElement("div");
            registerMessage.id = "registerMessage";
            registerMessage.style.marginBottom = "10px";
            registerMessage.style.textAlign = "center";
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            registerForm.insertBefore(registerMessage, submitBtn);
        }
    
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
    
            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("register-confirm-password").value;
    
            if (!name || !email || !password || !confirmPassword) {
                registerMessage.textContent = "Por favor, completa todos los campos.";
                registerMessage.style.color = "red";
                return;
            }
    
            if (password !== confirmPassword) {
                registerMessage.textContent = "Las contraseñas no coinciden.";
                registerMessage.style.color = "red";
                return;
            }
    
            try {
                const response = await fetch("register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });
    
                const result = await response.json();
    
                if (result.success) {
                    registerMessage.textContent = "¡Registro exitoso! Ahora puedes iniciar sesión.";
                    registerMessage.style.color = "green";
                    setTimeout(function(){
                        modalRegistro.style.display = "none";
                        registerMessage.textContent = "";
                    }, 2000);
                } else {
                    registerMessage.textContent = result.message;
                    registerMessage.style.color = "red";
                }
            } catch (error) {
                console.error("Error en el registro:", error);
                registerMessage.textContent = "Hubo un problema al enviar los datos.";
                registerMessage.style.color = "red";
            }
        });
    }
});
