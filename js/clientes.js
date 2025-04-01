// =====================
// Variables Globales
// =====================

// Para la lista de clientes
let clientesData = [];

// Para el modal de confirmación
let confirmModal = document.getElementById("confirmModal");
let confirmNameSpan = document.getElementById("confirmName");
let confirmYesBtn = document.getElementById("confirmYes");
let confirmNoBtn = document.getElementById("confirmNo");
let idClienteAEliminar = null;

// =====================
// Función para cargar clientes
// =====================
function cargarClientes() {
  fetch('../backend/clientes.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta: ' + response.status);
      }
      return response.json(); // Parsea el JSON
    })
    .then(data => {
      clientesData = data; // Guardamos la lista en memoria
      const lista = document.querySelector('.clientes-list');
      lista.innerHTML = ''; // Limpiar la lista actual

      data.forEach(cliente => {
        // Crear contenedor principal para el cliente
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

        // Contenedor de acciones (botones)
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'cliente-actions';

        // Botón Editar
        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn-editar';
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = (e) => {
          e.stopPropagation();
          abrirModalCliente('Editar', cliente);
        };

        // Botón Eliminar: se usa el modal de confirmación en lugar de confirm()
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = (e) => {
          e.stopPropagation();
          openConfirmModal(cliente);
        };

        actionsContainer.appendChild(btnEditar);
        actionsContainer.appendChild(btnEliminar);

        // Armar el item final: info a la izquierda, acciones a la derecha
        item.appendChild(infoContainer);
        item.appendChild(actionsContainer);

        // Opcional: al hacer clic en el item, mostrar detalles
        item.onclick = () => mostrarDetalles(cliente);

        lista.appendChild(item);
      });
    })
    .catch(error => {
      console.error('Error al cargar clientes:', error);
    });
}

// =====================
// Función para eliminar cliente
// =====================
function eliminarCliente(idCliente) {
  fetch(`../backend/eliminarCliente.php?id=${idCliente}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        //alert("Cliente eliminado correctamente");
        cargarClientes(); // Recarga la lista actualizada
      } else {
        //alert("Error al eliminar el cliente: " + data.message);
      }
    })    
    .catch(error => console.error("Error al eliminar cliente:", error));
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
// Modal para Agregar/Editar Clientes
// =====================
const modalOverlayCliente = document.getElementById("modalOverlayCliente");
const btnAbrirModalCliente = document.getElementById("btnAbrirModalCliente");
const modalCerrarCliente = document.getElementById("modalCerrarCliente");
const modalTituloCliente = document.getElementById("modalTituloCliente");
const btnAgregarCliente = document.getElementById("btnAgregarCliente");

// Abrir modal para Agregar Cliente
btnAbrirModalCliente.addEventListener("click", () => {
  abrirModalCliente("Agregar");
});

function abrirModalCliente(accion, cliente = null) {
  modalOverlayCliente.classList.add("active");
  if (accion === "Editar" && cliente) {
    modalTituloCliente.textContent = "Editar Cliente";
    btnAgregarCliente.textContent = "Guardar";
    document.getElementById("nombreCliente").value = cliente.nombre || "";
    document.getElementById("correoCliente").value = cliente.correo || "";
    document.getElementById("telefonoCliente").value = cliente.telefono || "";
    document.getElementById("direccionCliente").value = cliente.direccion || "";
    window.idClienteEnEdicion = cliente.id;
  } else {
    modalTituloCliente.textContent = "Agregar Cliente";
    btnAgregarCliente.textContent = "Agregar";
    document.getElementById("nombreCliente").value = "";
    document.getElementById("correoCliente").value = "";
    document.getElementById("telefonoCliente").value = "";
    document.getElementById("direccionCliente").value = "";
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
  if (!validateForm()) {
    return;
  }

  const nombre = document.getElementById("nombreCliente").value.trim();
  const apellidos = document.getElementById("apellidosCliente").value.trim();
  const correo = document.getElementById("correoCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();
  const password = document.getElementById("passwordCliente").value;
  const role = document.getElementById("roleCliente").value;

  let accion = "crear";
  if (modalTituloCliente.textContent === "Editar Cliente") {
    accion = "editar";
  }

  const formData = new FormData();
  formData.append("accion", accion);
  if (accion === "editar" && window.idClienteEnEdicion) {
    formData.append("id", window.idClienteEnEdicion);
  }
  formData.append("nombre", nombre);
  formData.append("apellidos", apellidos);
  formData.append("correo", correo);
  formData.append("telefono", telefono);
  formData.append("direccion", direccion);
  formData.append("password", password);
  formData.append("role", role);

  // Mostrar en consola para depuración
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  fetch("../backend/agregarCliente.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del backend:", data);
      if (data.success) {
        alert(accion === "crear" ? "Cliente agregado con éxito" : "Cliente editado con éxito");
        cerrarModalCliente();
        cargarClientes(); // Recargar la lista actualizada
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

document.addEventListener('DOMContentLoaded', cargarClientes);
