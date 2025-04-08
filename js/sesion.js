// Función para actualizar el botón de sesión según el estado de la sesión
function actualizarEstadoSesion() {
    fetch('../backend/checkSession.php')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('userContainer');
  
        if (data.logged_in) {
          // Si el usuario está logueado, crea un botón con su nombre
          container.innerHTML = `<button id="userButton">${data.nombre}</button>`;
          
          // Asigna evento para el modal de cierre de sesión
          const userButton = document.getElementById('userButton');
          userButton.addEventListener('click', () => {
            document.getElementById('logoutModal').classList.add('active');
          });
        } else {
          container.innerHTML = '<a href="html/login.html">Iniciar Sesión</a>';
        }
      })
      .catch(error => {
        console.error("Error consultando la sesión:", error);
      });
  }
  
  // Ejecutar la función al cargar el DOM
  document.addEventListener('DOMContentLoaded', actualizarEstadoSesion);
  

  document.addEventListener('DOMContentLoaded', () => {
    const logoutConfirm = document.getElementById('logoutConfirm');
    const logoutCancel = document.getElementById('logoutCancel');
    const logoutModal = document.getElementById('logoutModal');
  
    logoutConfirm.addEventListener('click', () => {
      // Redirige a logout.php que destruirá la sesión
      window.location.href = "../backend/logout.php";
    });
  
    logoutCancel.addEventListener('click', () => {
      logoutModal.classList.remove('active');
    });
  });
  