// propiedades.js - Admin

// Seleccionamos los elementos del DOM del modal
const modalOverlay = document.getElementById("modalOverlay");
const btnAbrirModal = document.getElementById("btnAbrirModal");
const modalCerrar = document.getElementById("modalCerrar");
const modalTitulo = document.getElementById("modalTitulo");
const btnAgregarProp = document.getElementById("btnAgregarProp");

// Cargar propiedades al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarPropiedades();
  asignarEventosModalesNotificaciones();  // Para cerrar notificaciones
});

// Si btnAbrirModal existe, le agregamos un listener para abrir el modal en modo "Agregar"
if (btnAbrirModal) {
  btnAbrirModal.addEventListener("click", () => {
    abrirModal("Agregar");
  });
}

// Cerrar modal al hacer clic en la X
modalCerrar.addEventListener("click", cerrarModal);

// Cerrar modal al hacer clic en el overlay (opcional)
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    cerrarModal();
  }
});

function abrirModal(accion, propiedad = null) {
  modalOverlay.classList.add("active");

  if (accion === "Editar" && propiedad) {
    modalTitulo.textContent = "Editar Propiedad";
    btnAgregarProp.textContent = "Guardar";
    document.getElementById("tituloProp").value = propiedad.titulo;
    document.getElementById("descripcionProp").value = propiedad.descripcion;
    document.getElementById("precioProp").value = propiedad.precio;
    document.getElementById("direccionProp").value = propiedad.direccion;
    // Asignar valores a los nuevos campos:
    document.getElementById("correoProp").value = propiedad.correo || '';
    document.getElementById("telefonoProp").value = propiedad.telefono || '';
    // Si tienes el campo para imagen, puedes dejarlo vacío, para que el usuario decida cambiarla
    document.getElementById("imagenProp").value = '';
    window.idPropiedadEnEdicion = propiedad.id;
  } else {
    modalTitulo.textContent = "Agregar Propiedad";
    btnAgregarProp.textContent = "Agregar";
    document.getElementById("tituloProp").value = '';
    document.getElementById("descripcionProp").value = '';
    document.getElementById("precioProp").value = '';
    document.getElementById("direccionProp").value = '';
    document.getElementById("correoProp").value = '';
    document.getElementById("telefonoProp").value = '';
    document.getElementById("imagenProp").value = '';
    window.idPropiedadEnEdicion = null;
  }
}



// Función para abrir el modal en modo Agregar o Editar
function abrirModalDetalle(propiedad) {
  // Obtener los elementos del modal
  const modalDetalle = document.getElementById("detallePropiedadModal");
  const detalleTitulo = document.getElementById("detalleTitulo");
  const detalleImagen = document.getElementById("detalleImagen");
  const detalleDescripcion = document.getElementById("detalleDescripcion");
  const detallePrecio = document.getElementById("detallePrecio");
  const detalleDireccion = document.getElementById("detalleDireccion");
  const detalleTelefono = document.getElementById("detalleTelefono");
  const detalleCorreo = document.getElementById("detalleCorreo");

  // Asigna los valores de la propiedad
  detalleTitulo.textContent = propiedad.titulo;
  detalleImagen.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/400x250";
  detalleDescripcion.innerHTML = `<strong>Descripción:</strong> ${propiedad.descripcion}`;
  const precioNumero = parseFloat(propiedad.precio);
  detallePrecio.innerHTML = `<strong>Precio:</strong> ${!isNaN(precioNumero) ? '$' + precioNumero.toFixed(2) : '$' + propiedad.precio}`;
  detalleDireccion.innerHTML = `<strong>Dirección:</strong> ${propiedad.direccion}`;
  // Si tienes esos campos en la BD, asigna sus valores; si no, muestra un valor por defecto o déjalos vacíos.
  detalleTelefono.innerHTML = `<strong>Teléfono:</strong> ${propiedad.telefono || 'No especificado'}`;
  detalleCorreo.innerHTML = `<strong>Correo:</strong> ${propiedad.correo || 'No especificado'}`;

  // Mostrar el modal
  modalDetalle.classList.add("active");
}

// Asigna eventos para cerrar el modal de detalle
document.addEventListener('DOMContentLoaded', function () {
  const detalleCerrar = document.getElementById("detalleCerrar");
  const detalleModalCerrar = document.getElementById("detalleModalCerrar");

  if (detalleCerrar) {
    detalleCerrar.addEventListener("click", () => {
      document.getElementById("detallePropiedadModal").classList.remove("active");
    });
  }

  if (detalleModalCerrar) {
    detalleModalCerrar.addEventListener("click", () => {
      document.getElementById("detallePropiedadModal").classList.remove("active");
    });
  }
});


// Función para cerrar el modal
function cerrarModal() {
  modalOverlay.classList.remove("active");
}

// Función para manejar la acción de "Agregar/Guardar"
btnAgregarProp.addEventListener("click", function () {
  const titulo = document.getElementById("tituloProp").value.trim();
  const descripcion = document.getElementById("descripcionProp").value.trim();
  const precio = document.getElementById("precioProp").value;
  const direccion = document.getElementById("direccionProp").value.trim();
  // Nuevos campos:
  const correo = document.getElementById("correoProp").value.trim();
  const telefono = document.getElementById("telefonoProp").value.trim();

  if (!titulo || !precio) {
    showErrorModal('Por favor, completa los campos obligatorios.');
    return;
  }

  const url = window.idPropiedadEnEdicion 
    ? '../backend/editarPropiedad.php' 
    : '../backend/agregarPropiedad.php';

  const formData = new FormData();
  formData.append("titulo", titulo);
  formData.append("descripcion", descripcion);
  formData.append("precio", precio);
  formData.append("direccion", direccion);
  // Agregar los nuevos campos:
  formData.append("correo", correo);
  formData.append("telefono", telefono);

  if (window.idPropiedadEnEdicion) {
    formData.append("id", window.idPropiedadEnEdicion);
  }

  const imagenFile = document.getElementById("imagenProp").files[0];
  if (imagenFile) {
    formData.append("imagenProp", imagenFile);
  }

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showSuccessModal(window.idPropiedadEnEdicion ? 'Propiedad actualizada con éxito' : 'Propiedad agregada con éxito');
        cerrarModal();
        cargarPropiedades();
      } else {
        showErrorModal('Error: ' + (data.message || 'Ocurrió un error.'));
      }
    })
    .catch(error => {
      console.error('Error al agregar/editar la propiedad:', error);
      showErrorModal("Error en la petición.");
    });
});


// Función para cargar propiedades desde el backend y renderizarlas
function cargarPropiedades() {
  fetch('../backend/propiedades.php')
    .then(response => response.json())
    .then(data => {
      const propiedadesContainer = document.querySelector('.content-section');
      propiedadesContainer.innerHTML = ''; // Limpiar contenido previo

      data.forEach(propiedad => {
        // Crear la tarjeta de propiedad
        const propertyCard = document.createElement('div');
        propertyCard.classList.add('property-card');

        // Crear la imagen de la propiedad
        const propertyImage = document.createElement('img');
        // Ajusta la ruta según cómo guardes la imagen en la BD
        propertyImage.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/150";
        propertyImage.alt = propiedad.titulo;
        propertyImage.classList.add('property-image');

        // Crear el contenedor de detalles
        const propertyDetails = document.createElement('div');
        propertyDetails.classList.add('property-details');

        // Crear elementos de detalle
        const title = document.createElement('p');
        title.textContent = `Título: ${propiedad.titulo}`;

        const descripcion = document.createElement('p');
        descripcion.textContent = `Descripción: ${propiedad.descripcion}`;

        const precio = document.createElement('p');
        const precioNumero = parseFloat(propiedad.precio);
        precio.textContent = `Precio: ${!isNaN(precioNumero) ? '$' + precioNumero.toFixed(2) : '$' + propiedad.precio}`;

        const direccion = document.createElement('p');
        direccion.textContent = `Dirección: ${propiedad.direccion}`;

        // Botón "Me interesa!"
        const btnInteresa = document.createElement('button');
        btnInteresa.classList.add('btn-interesa-green');
        btnInteresa.textContent = "Me interesa!";
        btnInteresa.addEventListener('click', () => {
          // Llama al modal con detalles ampliados de la propiedad
          abrirModalDetalle(propiedad);
        });



        // Botón de "Editar"
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn-editar');
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log("Botón editar clickeado para la propiedad:", propiedad);
          abrirModal("Editar", propiedad);
        });
        

        // Botón de "Eliminar"
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener('click', (e) => {
          e.stopPropagation();
          eliminarPropiedad(propiedad.id);
        });

        // Agregar elementos de detalles al contenedor
        propertyDetails.appendChild(title);
        propertyDetails.appendChild(descripcion);
        propertyDetails.appendChild(precio);
        propertyDetails.appendChild(direccion);
        propertyDetails.appendChild(btnInteresa);
        propertyDetails.appendChild(btnEditar);
        propertyDetails.appendChild(btnEliminar);

        // Armar la tarjeta de propiedad
        propertyCard.appendChild(propertyImage);
        propertyCard.appendChild(propertyDetails);

        // Agregar la tarjeta al contenedor principal
        propiedadesContainer.appendChild(propertyCard);
      });
    })
    .catch(error => {
      console.error('Error al cargar las propiedades:', error);
    });
}

// Función para eliminar propiedad (utilizando confirm y modales de notificación)
function eliminarPropiedad(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) {
    fetch(`../backend/eliminarPropiedad.php?id=${id}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showSuccessModal(data.message || "Propiedad eliminada con éxito");
          cargarPropiedades();
        } else {
          showErrorModal('Error al eliminar la propiedad: ' + (data.message || ''));
        }
      })
      .catch(error => {
        console.error('Error al eliminar la propiedad:', error);
        showErrorModal("Error en la petición.");
      });
  }
}

// Funciones de notificación
function showSuccessModal(message) {
  const successModal = document.getElementById("successModal");
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;
  successModal.classList.add("active");
}

function showErrorModal(message) {
  const errorModal = document.getElementById("errorModal");
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorModal.classList.add("active");
}

// Asignar eventos para cerrar modales de notificación
function asignarEventosModalesNotificaciones() {
  const successClose = document.getElementById("successClose");
  const errorClose = document.getElementById("errorClose");

  if (successClose) {
    successClose.addEventListener("click", () => {
      document.getElementById("successModal").classList.remove("active");
    });
  }

  if (errorClose) {
    errorClose.addEventListener("click", () => {
      document.getElementById("errorModal").classList.remove("active");
    });
  }
}


// Función para mostrar el modal con detalles de la propiedad
function mostrarDetalle(propiedad) {
  // Seleccionamos los elementos del modal de detalle
  const modal = document.getElementById("propertyDetailModal");
  const modalTitulo = document.getElementById("modalDetailTitulo");
  const modalImagen = document.getElementById("modalDetailImagen");
  const modalDescripcion = document.getElementById("modalDetailDescripcion");
  const modalPrecio = document.getElementById("modalDetailPrecio");
  const modalDireccion = document.getElementById("modalDetailDireccion");

  // Asignamos valores
  modalTitulo.textContent = propiedad.titulo;
  modalImagen.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/400x200";
  modalImagen.alt = propiedad.titulo;
  modalDescripcion.textContent = "Descripción: " + propiedad.descripcion;

  // Asegurarse que el precio sea numérico para formatearlo
  const precio = parseFloat(propiedad.precio);
  modalPrecio.textContent = "Precio: " + (!isNaN(precio) ? "$" + precio.toFixed(2) : propiedad.precio);
  modalDireccion.textContent = "Dirección: " + propiedad.direccion;

  // Abre el modal (utilizando la misma clase .active que usas en otros modales)
  modal.classList.add("active");
}

// Asignar eventos para cerrar el modal de detalle
document.addEventListener('DOMContentLoaded', function () {
  const modalDetailCerrar = document.getElementById("modalDetailCerrar");
  const modalDetailCerrarBtn = document.getElementById("modalDetailCerrarBtn");

  if (modalDetailCerrar) {
    modalDetailCerrar.addEventListener("click", () => {
      document.getElementById("propertyDetailModal").classList.remove("active");
    });
  }
  if (modalDetailCerrarBtn) {
    modalDetailCerrarBtn.addEventListener("click", () => {
      document.getElementById("propertyDetailModal").classList.remove("active");
    });
  }
});
