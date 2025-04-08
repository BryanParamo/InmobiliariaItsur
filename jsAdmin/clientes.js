// =====================
// Variables Globales
// =====================

// Para la lista de clientes
let clientesData = [];

// Para el modal de confirmación (Eliminar)
const confirmModal = document.getElementById("confirmModal");
const confirmNameSpan = document.getElementById("confirmName");
const confirmYesBtn = document.getElementById("confirmYes");
const confirmNoBtn = document.getElementById("confirmNo");
let idClienteAEliminar = null;

// Para el modal de Agregar/Editar
const modalOverlayCliente = document.getElementById("modalOverlayCliente");
const btnAbrirModalCliente = document.getElementById("btnAbrirModalCliente");
const modalCerrarCliente = document.getElementById("modalCerrarCliente");
const modalTituloCliente = document.getElementById("modalTituloCliente");
const btnAgregarCliente = document.getElementById("btnAgregarCliente");

// =====================
// Función para cargar clientes desde el backend
// =====================
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
      renderClientesAdmin(clientesData);
    })
    .catch(error => console.error('Error al cargar clientes:', error));
}

// =====================
// Función para renderizar la lista de clientes (vista Admin)
// =====================
function renderClientesAdmin(listaClientes) {
  const contenedor = document.querySelector('.clientes-list');
  contenedor.innerHTML = ''; // Limpiar lista

  listaClientes.forEach(cliente => {
    // Contenedor principal del item
    const item = document.createElement('div');
    item.className = 'cliente-item';

    // Contenedor de información (icono + nombre)
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

    // Contenedor para acciones: Editar y Eliminar
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'cliente-actions';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = (e) => {
      e.stopPropagation();
      abrirModalCliente('Editar', cliente);
    };

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = (e) => {
      e.stopPropagation();
      openConfirmModal(cliente);
    };

    actionsContainer.appendChild(btnEditar);
    actionsContainer.appendChild(btnEliminar);

    item.appendChild(infoContainer);
    item.appendChild(actionsContainer);

    // Al hacer clic en el item, mostrar detalles
    item.onclick = () => mostrarDetalles(cliente);

    contenedor.appendChild(item);
  });
}

// =====================
// Función para filtrar clientes según búsqueda
// =====================
function filtrarClientes(query) {
  const filtrados = clientesData.filter(cliente =>
    cliente.nombre.toLowerCase().includes(query.toLowerCase())
  );
  renderClientesAdmin(filtrados);
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
// Modal de confirmación (Eliminar)
// =====================
function openConfirmModal(cliente) {
  idClienteAEliminar = cliente.id;
  confirmNameSpan.textContent = cliente.nombre;
  confirmModal.classList.add("active");
}

function closeConfirmModal() {
  confirmModal.classList.remove("active");
  idClienteAEliminar = null;
}

confirmYesBtn.addEventListener("click", () => {
  if (idClienteAEliminar !== null) {
    eliminarCliente(idClienteAEliminar);
  }
  closeConfirmModal();
});

confirmNoBtn.addEventListener("click", closeConfirmModal);

// =====================
// Función para eliminar cliente
// =====================
function eliminarCliente(idCliente) {
  fetch(`../backend/eliminarCliente.php?id=${idCliente}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Cliente eliminado correctamente");
        cargarClientes();
      } else {
        alert("Error al eliminar el cliente: " + data.message);
      }
    })
    .catch(error => console.error("Error al eliminar cliente:", error));
}

// =====================
// Modal para Agregar/Editar Clientes
// =====================
btnAbrirModalCliente.addEventListener("click", () => {
  abrirModalCliente("Agregar");
});

function abrirModalCliente(accion, cliente = null) {
  modalOverlayCliente.classList.add("active");
  if (accion === "Editar" && cliente) {
    modalTituloCliente.textContent = "Editar Cliente";
    btnAgregarCliente.textContent = "Guardar";
    document.getElementById("nombreCliente").value = cliente.nombre || "";
    document.getElementById("apellidosCliente").value = cliente.apellidos || "";
    document.getElementById("correoCliente").value = cliente.correo || "";
    document.getElementById("telefonoCliente").value = cliente.telefono || "";
    document.getElementById("direccionCliente").value = cliente.direccion || "";
    // En modo edición, dejar el campo de contraseña vacío
    document.getElementById("passwordCliente").value = "";
    window.idClienteEnEdicion = cliente.id;
  } else {
    modalTituloCliente.textContent = "Agregar Cliente";
    btnAgregarCliente.textContent = "Agregar";
    document.getElementById("nombreCliente").value = "";
    document.getElementById("apellidosCliente").value = "";
    document.getElementById("correoCliente").value = "";
    document.getElementById("telefonoCliente").value = "";
    document.getElementById("direccionCliente").value = "";
    document.getElementById("passwordCliente").value = "";
    window.idClienteEnEdicion = null;
  }
}

modalCerrarCliente.addEventListener("click", cerrarModalCliente);
modalOverlayCliente.addEventListener("click", (e) => {
  if (e.target === modalOverlayCliente) {
    cerrarModalCliente();
  }
});
function cerrarModalCliente() {
  modalOverlayCliente.classList.remove("active");
}

// =====================
// Funciones de validación de campos
// =====================

function validateNombre() {
  const input = document.getElementById("nombreCliente");
  const message = document.getElementById("nombreClienteValidation");
  const value = input.value.trim();
  if (value.length < 3) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: Juan";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

function validateApellidos() {
  const input = document.getElementById("apellidosCliente");
  const message = document.getElementById("apellidosClienteValidation");
  const value = input.value.trim();
  if (value.length < 3) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: Pérez";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

function validateCorreo() {
  const input = document.getElementById("correoCliente");
  const message = document.getElementById("correoClienteValidation");
  const value = input.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: correo@ejemplo.com";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

function validateTelefono() {
  const input = document.getElementById("telefonoCliente");
  const message = document.getElementById("telefonoClienteValidation");
  const value = input.value.trim();
  const regex = /^\d{10}$/;
  if (!regex.test(value)) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: 5512345678";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

function validateDireccion() {
  const input = document.getElementById("direccionCliente");
  const message = document.getElementById("direccionClienteValidation");
  const value = input.value.trim();
  if (value.length < 5) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: Calle Falsa 123";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

function validatePassword() {
  const input = document.getElementById("passwordCliente");
  const message = document.getElementById("passwordClienteValidation");
  const value = input.value;
  // Si estamos en edición y el campo está vacío, considerarlo válido (no actualiza la contraseña)
  if (window.idClienteEnEdicion && value.trim() === "") {
    input.style.border = "";
    message.textContent = "";
    return true;
  }
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regex.test(value)) {
    input.style.border = "2px solid red";
    message.textContent = "Ej: abc12345";
    return false;
  } else {
    input.style.border = "2px solid green";
    message.textContent = "";
    return true;
  }
}

// Asignar validación en tiempo real a cada campo
document.getElementById("nombreCliente").addEventListener("blur", validateNombre);
document.getElementById("apellidosCliente").addEventListener("blur", validateApellidos);
document.getElementById("correoCliente").addEventListener("blur", validateCorreo);
document.getElementById("telefonoCliente").addEventListener("blur", validateTelefono);
document.getElementById("direccionCliente").addEventListener("blur", validateDireccion);
document.getElementById("passwordCliente").addEventListener("blur", validatePassword);

function validateForm() {
  return (
    validateNombre() &&
    validateApellidos() &&
    validateCorreo() &&
    validateTelefono() &&
    validateDireccion() &&
    validatePassword()
  );
}

// =====================
// Envío del formulario (Agregar/Editar Cliente)
// =====================
btnAgregarCliente.addEventListener("click", () => {
  if (!validateForm()) return;

  const nombre = document.getElementById("nombreCliente").value.trim();
  const apellidos = document.getElementById("apellidosCliente").value.trim();
  const correo = document.getElementById("correoCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();
  const password = document.getElementById("passwordCliente").value;
  const role = document.getElementById("roleCliente").value;
  
  // Determina la acción según si estamos editando o creando
  let accion = window.idClienteEnEdicion ? "editar" : "crear";
  let url = "../backend/agregarCliente.php";
  if (accion === "editar") {
    url = "../backend/modificarcliente.php";
  }
  
  const formData = new FormData();
  formData.append("accion", accion);
  if (accion === "editar") {
    formData.append("id", window.idClienteEnEdicion);
  }
  formData.append("nombre", nombre);
  formData.append("apellidos", apellidos);
  formData.append("correo", correo);
  formData.append("telefono", telefono);
  formData.append("direccion", direccion);
  formData.append("password", password);
  formData.append("role", role);
  
  // Depuración en consola
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  
  fetch(url, {
    method: "POST",
    body: formData 
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(accion === "crear" ? "Cliente agregado con éxito" : "Cliente editado con éxito");
        cerrarModalCliente();
        cargarClientes();
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();
  // Asignar búsqueda en tiempo real
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.trim() === "") {
      renderClientesAdmin(clientesData);
    } else {
      filtrarClientes(query);
    }
  });
});

// =====================
// Función para renderizar clientes en vista usuario (sin botones)
// =====================
function renderClientesUsuario(listaClientes) {
  const contenedor = document.querySelector('.clientes-list');
  contenedor.innerHTML = '';

  listaClientes.forEach(cliente => {
    const item = document.createElement('div');
    item.className = 'cliente-item';

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
    item.appendChild(infoContainer);

    item.onclick = () => mostrarDetalles(cliente);

    contenedor.appendChild(item);
  });
}

// Función para cargar clientes y renderizar en vista usuario
function cargarClientesUsuario() {
  fetch('../backend/clientes.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      clientesData = data;
      renderClientesUsuario(clientesData);
    })
    .catch(error => console.error('Error al cargar clientes:', error));
}
