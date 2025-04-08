document.addEventListener('DOMContentLoaded', function () {
    // Obtener los botones de subir documento
    const btnSubirContrato = document.getElementById('btnSubirContrato');
    const btnSubirEscritura = document.getElementById('btnSubirEscritura');
    // Elementos del modal
    const modalSubir = document.getElementById('subirDocumentoModal');
    const documentoTipoInput = document.getElementById('documentoTipo');
    const cancelarSubida = document.getElementById('cancelarSubida');
    const formSubir = document.getElementById('formSubirDocumento');

    // Función para abrir el modal y definir el tipo de documento
    function abrirModalSubir(tipo) {
        documentoTipoInput.value = tipo;
        modalSubir.classList.add('active');
    }

    // Asignar eventos a los botones
    if (btnSubirContrato) {
        btnSubirContrato.addEventListener('click', function () {
            abrirModalSubir('contrato_compra'); // Valor esperado en el backend
        });
    }

    if (btnSubirEscritura) {
        btnSubirEscritura.addEventListener('click', function () {
            abrirModalSubir('escritura'); // Valor esperado en el backend
        });
    }

    // Evento para cancelar y cerrar el modal
    if (cancelarSubida) {
        cancelarSubida.addEventListener('click', function () {
            modalSubir.classList.remove('active');
        });
    }

    // Manejar el envío del formulario
    formSubir.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(formSubir);

        fetch('../backend/subirDocumento.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Muestra el modal de éxito con un mensaje personalizado
                    showSuccessModal(data.message || "Documento subido correctamente.");
                    // Opcional: si tienes una función para recargar la lista de documentos, llamarla aquí
                    cargarDocumentos();
                    // Cierra el modal de subida
                    document.getElementById('subirDocumentoModal').classList.remove('active');
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error en la subida:", error);
                alert("Error en la petición.");
            });
    });

});

// Función para mostrar el modal de éxito
function showSuccessModal(message) {
    const successModal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successModal.classList.add("active");
}

// Evento para cerrar el modal de éxito
document.addEventListener('DOMContentLoaded', function () {
    const successClose = document.getElementById("successClose");
    if (successClose) {
        successClose.addEventListener("click", function () {
            document.getElementById("successModal").classList.remove("active");
        });
    }
});



function cargarDocumentos() {
    fetch('../backend/listarDocumentos.php')
      .then(response => response.json())
      .then(data => {
        const contenedor = document.querySelector('.document-list');
        // Limpia el contenido y deja el encabezado
        contenedor.innerHTML = '<h2>Documentos Guardados</h2>';
        
        data.forEach(doc => {
          const item = document.createElement('div');
          item.className = 'document-item';
          
          // Asume que doc.ruta_archivo contiene el nombre de archivo guardado en el servidor
          // y que los archivos se encuentran en "../uploads/documentos/"
          const enlace = `<a href="../uploads/documentos/${doc.ruta_archivo}" target="_blank">
                            <div class="document-info">
                              <i class="fas fa-file-alt"></i>
                              <span>${doc.nombre_archivo}</span>
                            </div>
                          </a>`;
          
          // Agrega el enlace (para visualizar el documento) y el botón para eliminar
          item.innerHTML = `
            ${enlace}
            <button class="btn-eliminar" data-id="${doc.id}">Eliminar</button>
          `;
          
          contenedor.appendChild(item);
        });
        
        // Asignar evento al botón Eliminar de cada documento
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(btn => {
          btn.addEventListener('click', function(e) {
            // Evitar que el click en el botón se propague al enlace
            e.stopPropagation();
            e.preventDefault();
            const idDocumento = this.getAttribute('data-id');
            eliminarDocumento(idDocumento);
          });
        });
      })
      .catch(error => console.error("Error al cargar documentos:", error));
  }
  


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


function eliminarDocumento(idDocumento) {
    if (!confirm("¿Estás seguro de eliminar este documento?")) {
        return; // Si el usuario canceló, no hace nada
    }

    // Enviamos la petición al backend
    const formData = new FormData();
    formData.append('id', idDocumento);

    fetch('../backend/eliminarDocumento.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
              showSuccessModal(data.message || "Documento eliminado correctamente.");
              cargarDocumentos();
            } else {
              showErrorModal("Error: " + (data.message || "No se pudo eliminar el documento."));
            }
          })
          
        .catch(error => {
            console.error("Error al eliminar documento:", error);
            alert("Error en la petición.");
        });
}


document.addEventListener('DOMContentLoaded', function() {
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
  });
  

// Llama a la función al cargar la página o cuando sea necesario
document.addEventListener('DOMContentLoaded', cargarDocumentos);
