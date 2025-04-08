document.addEventListener('DOMContentLoaded', function() {
    cargarDocumentosUsuario();
  });
  
  function cargarDocumentosUsuario() {
    fetch('../backend/listarDocumentos.php')
      .then(response => response.json())
      .then(data => {
        const contenedor = document.querySelector('.document-list');
        // Limpia el contenido y deja el encabezado
        contenedor.innerHTML = '<h2>Documentos Guardados</h2>';
  
        data.forEach(doc => {
          const item = document.createElement('div');
          item.className = 'document-item';
  
          // Genera el enlace para ver el documento en una nueva pestaña
          const enlace = `
            <a href="../uploads/documentos/${doc.ruta_archivo}" target="_blank">
              <div class="document-info">
                <i class="fas fa-file-alt fa-2x"></i>
                <span>${doc.nombre_archivo}</span>
              </div>
            </a>
          `;
  
          // En la vista usuario no incluimos el botón de eliminar
          item.innerHTML = enlace;
          contenedor.appendChild(item);
        });
      })
      .catch(error => console.error("Error al cargar documentos:", error));
  }
  