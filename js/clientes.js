// =====================
// Variables Globales
// =====================

// Lista de clientes
let clientesData = [];

// =====================
// Función para cargar clientes
// =====================
function cargarClientesUsuario() {
  fetch('../backend/clientes.php')  // Ajusta la ruta si es necesario
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      clientesData = data;
      const lista = document.querySelector('.clientes-list');
      lista.innerHTML = '';

      data.forEach(cliente => {
        // Contenedor principal para cada cliente
        const item = document.createElement('div');
        item.className = 'cliente-item';

        // Contenedor para icono + nombre
        const infoContainer = document.createElement('div');
        infoContainer.className = 'cliente-info';

        // Icono según el rol (opcional)
        const icon = document.createElement('i');
        if (cliente.role === 'admin') {
          icon.className = 'fas fa-user-shield';
        } else if (cliente.role === 'usuario') {
          icon.className = 'fas fa-user';
        } else {
          icon.className = 'fas fa-user-friends';
        }
        icon.style.marginRight = '8px';

        // Nombre del cliente
        const span = document.createElement('span');
        span.textContent = cliente.nombre || 'Sin nombre';

        // Agregar icono y nombre al contenedor
        infoContainer.appendChild(icon);
        infoContainer.appendChild(span);

        // Agregar infoContainer al elemento principal
        item.appendChild(infoContainer);

        // Al hacer clic en el item, mostrar detalles del cliente
        item.onclick = () => mostrarDetalles(cliente);

        // Finalmente, agregar el item a la lista
        lista.appendChild(item);
      });
    })
    .catch(error => console.error('Error al cargar clientes:', error));
}

// =====================
// Funciones para mostrar y cerrar detalles
// =====================
function mostrarDetalles(cliente) {
  document.getElementById("nombre-cliente").textContent = cliente.nombre || "N/A";
  document.getElementById("correo-cliente").textContent = cliente.correo || "N/A";
  document.getElementById("telefono-cliente").textContent = cliente.telefono || "N/A";
  document.getElementById("direccion-cliente").textContent = cliente.direccion || "N/A";
}

function cerrarDetalles() {
  document.getElementById("nombre-cliente").textContent = "Selecciona un cliente";
  document.getElementById("correo-cliente").textContent = "---";
  document.getElementById("telefono-cliente").textContent = "---";
  document.getElementById("direccion-cliente").textContent = "---";
}

// =====================
// Cargar la lista al iniciar
// =====================
document.addEventListener('DOMContentLoaded', cargarClientesUsuario);

// Función para renderizar la lista de clientes (usada también por cargarClientes)
function renderClientes(listaClientes) {
    const lista = document.querySelector('.clientes-list');
    lista.innerHTML = ''; // Limpiar la lista actual
  
    listaClientes.forEach(cliente => {
      // Contenedor principal
      const item = document.createElement('div');
      item.className = 'cliente-item';
  
      // Contenedor para icono y nombre
      const infoContainer = document.createElement('div');
      infoContainer.className = 'cliente-info';
  
      const icon = document.createElement('i');
      if (cliente.role === 'admin') {
        icon.className = 'fas fa-user-shield';
      } else if (cliente.role === 'usuario') {
        icon.className = 'fas fa-user';
      } else {
        icon.className = 'fas fa-user-friends';
      }
      icon.style.marginRight = '8px';
  
      const span = document.createElement('span');
      span.textContent = cliente.nombre || 'Sin nombre';
  
      infoContainer.appendChild(icon);
      infoContainer.appendChild(span);
  
      // Contenedor para acciones (en vista de usuario, puede que no se requieran botones)
      // Por ejemplo, en la vista de usuario no se muestran editar/eliminar:
      // Puedes omitir actionsContainer y agregar simplemente infoContainer al item
  
      item.appendChild(infoContainer);
  
      // Al hacer clic en el item, mostrar detalles
      item.onclick = () => mostrarDetalles(cliente);
  
      lista.appendChild(item);
    });
  }
  
  // Función para cargar todos los clientes desde el backend y renderizarlos
  function cargarClientes() {
    fetch('../backend/clientes.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        clientesData = data;
        renderClientes(clientesData);
      })
      .catch(error => console.error('Error al cargar clientes:', error));
  }
  
  // Función para filtrar clientes según el término de búsqueda
  function filtrarClientes(query) {
    // Filtrar por nombre (puedes agregar más campos si lo deseas)
    const filtrados = clientesData.filter(cliente => {
      return cliente.nombre.toLowerCase().includes(query.toLowerCase());
    });
    renderClientes(filtrados);
  }
  
  // Asignar evento al input de búsqueda
  document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
  
    const searchInput = document.querySelector('.search-input');
    // Escuchar el evento "input" para filtrar en tiempo real
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      // Si la búsqueda está vacía, muestra todos los clientes
      if (query.trim() === "") {
        renderClientes(clientesData);
      } else {
        filtrarClientes(query);
      }
    });
  });
  