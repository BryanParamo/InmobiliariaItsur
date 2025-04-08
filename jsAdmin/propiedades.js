// propiedades.js

// Seleccionamos los elementos del DOM
const modalOverlay = document.getElementById("modalOverlay");
const btnAbrirModal = document.getElementById("btnAbrirModal");
const modalCerrar = document.getElementById("modalCerrar");
const modalTitulo = document.getElementById("modalTitulo");
const btnAgregarProp = document.getElementById("btnAgregarProp");

// Si btnAbrirModal existe, le agregamos un listener
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

// Función para abrir el modal
function abrirModal(accion) {
  // Mostramos el overlay
  modalOverlay.classList.add("active");

  // Si la acción es "Editar", cambiamos el título y el texto del botón
  if (accion === "Editar") {
    modalTitulo.textContent = "Editar Propiedad";
    btnAgregarProp.textContent = "Guardar";
  } else {
    modalTitulo.textContent = "Agregar Propiedad";
    btnAgregarProp.textContent = "Agregar";
  }
}

// Seleccionamos el botón de "Agregar/Guardar" (ya definido como btnAgregarProp)
btnAgregarProp.addEventListener("click", function() {

    cerrarModal();
  });
  

// Función para cerrar el modal
function cerrarModal() {
  modalOverlay.classList.remove("active");
}


// propiedades.js

// Seleccionamos el input de archivo y la imagen de vista previa
const inputImagenProp = document.getElementById("imagenProp");
const previewImagen = document.getElementById("previewImagen");

// Cada vez que cambie el input de archivo, cargamos la imagen
if (inputImagenProp) {
  inputImagenProp.addEventListener("change", () => {
    const archivo = inputImagenProp.files[0]; // El primer (y único) archivo seleccionado
    if (archivo) {
      const reader = new FileReader();
      reader.onload = function(e) {
        // e.target.result es la URL base64 de la imagen
        previewImagen.src = e.target.result;
      };
      // Leemos el archivo como DataURL (base64)
      reader.readAsDataURL(archivo);
    } else {
      // Si no hay archivo, podemos resetear la imagen
      previewImagen.src = "../img/placeholder.png";
    }
  });
}
