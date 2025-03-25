
  // Array para guardar ítems de la cesta (cada ítem se agrupa por título)
  let cart = [];
  
  // Función para actualizar el contador visual de la cesta (total de ítems, considerando cantidades)
  function updateCartCount() {
      const countElement = document.querySelector('.cart-count');
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      countElement.textContent = totalCount;
  }

  // Función para formatear números a moneda (dos decimales)
  function formatCurrency(amount) {
      return Number(amount).toFixed(2);
  }

  // Función para refrescar el contenido del modal de la cesta
  function updateCartModal() {
      const cartItemsContainer = document.getElementById('cartItems');
      cartItemsContainer.innerHTML = ''; // Limpiar contenido previo

      let total = 0;
      cart.forEach((item, index) => {
          total += item.price * item.quantity;
          // Crear un contenedor para el ítem
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
      
      // Actualizar y estilizar el contenedor del Total para que sea más llamativo
      document.getElementById('totalAmount').textContent = formatCurrency(total);
      const cartTotalElement = document.getElementById('cartTotal');
      cartTotalElement.style.cssText = "font-size: 1.4rem; font-weight: bold; color: #e63946; text-align: right; margin-top: 1rem; background: #f8f8f8; padding: 10px; border-radius: 5px;";
  }

  // Función para buscar un ítem en el carrito por título
  function findCartItem(title) {
      return cart.find(item => item.title === title);
  }

  // Agregar evento a cada botón "Añadir a la Cesta"
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
          // Se asume que dentro del .menu-item se tiene:
          // - un h3 con el título
          // - un span con el precio, ejemplo "Precio: 3,95 €"
          // - una imagen del plato en una etiqueta <img>
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

  // Abrir el modal al hacer clic en el icono de la cesta
  document.querySelector('.cart-icon').addEventListener('click', (e) => {
      e.preventDefault();
      updateCartModal();
      document.getElementById('cartModal').style.display = 'flex';
  });

  // Cerrar el modal al hacer clic en el botón de cierre
  document.getElementById('closeCart').addEventListener('click', () => {
      document.getElementById('cartModal').style.display = 'none';
  });

  // Manejo de eventos en el modal: incremento, decremento o eliminación mediante delegación
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

  // Manejar el botón de "Realizar Pedido"
  document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (cart.length === 0) {
          alert('Tu cesta está vacía.');
      } else {
          alert('Procediendo a realizar el pedido...');
      }
  });

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener('click', (e) => {
      const cartModal = document.getElementById('cartModal');
      if (e.target === cartModal) {
          cartModal.style.display = 'none';
      }
  });
  
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
