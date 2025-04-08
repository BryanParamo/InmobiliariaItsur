// propiedadesUser.js - Vista Usuario

// Variable global para almacenar las propiedades
let propiedadesData = [];

// Función para cargar las propiedades desde el backend
function cargarPropiedadesUsuario() {
  fetch('../backend/propiedades.php')
    .then(response => response.json())
    .then(data => {
      propiedadesData = data;
      renderPropiedadesUsuario(propiedadesData);
    })
    .catch(error => console.error('Error al cargar las propiedades:', error));
}

// Función para renderizar las propiedades en la vista usuario
function renderPropiedadesUsuario(listaPropiedades) {
  const container = document.getElementById('propiedadesContainer');
  container.innerHTML = ''; // Limpiar contenido previo

  listaPropiedades.forEach(propiedad => {
    // Crear la tarjeta de propiedad
    const propertyCard = document.createElement('div');
    propertyCard.classList.add('property-card');

    // Crear la imagen
    const propertyImage = document.createElement('img');
    // Ajusta la ruta según cómo almacenes la imagen; uso un placeholder si no hay imagen
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

    // Botón "Me interesa!" que abre el modal con detalles ampliados
    const btnInteresa = document.createElement('button');
    btnInteresa.classList.add('btn-interesa-green');
    btnInteresa.textContent = "Me interesa!";
    btnInteresa.addEventListener('click', () => {
      abrirModalDetalle(propiedad);
    });

    // Agregar los detalles al contenedor de la propiedad
    propertyDetails.appendChild(title);
    propertyDetails.appendChild(descripcion);
    propertyDetails.appendChild(precio);
    propertyDetails.appendChild(direccion);
    propertyDetails.appendChild(btnInteresa);

    // Armar la tarjeta de propiedad
    propertyCard.appendChild(propertyImage);
    propertyCard.appendChild(propertyDetails);

    // Agregar la tarjeta al contenedor principal
    container.appendChild(propertyCard);
  });
}

// Función para abrir el modal de detalle de la propiedad
function abrirModalDetalle(propiedad) {
  const modalDetalle = document.getElementById("detallePropiedadModal");
  const detalleTitulo = document.getElementById("detalleTitulo");
  const detalleImagen = document.getElementById("detalleImagen");
  const detalleDescripcion = document.getElementById("detalleDescripcion");
  const detallePrecio = document.getElementById("detallePrecio");
  const detalleDireccion = document.getElementById("detalleDireccion");
  const detalleTelefono = document.getElementById("detalleTelefono");
  const detalleCorreo = document.getElementById("detalleCorreo");

  detalleTitulo.textContent = propiedad.titulo;
  detalleImagen.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/400x250";
  detalleDescripcion.innerHTML = `<strong>Descripción:</strong> ${propiedad.descripcion}`;
  const precioNumero = parseFloat(propiedad.precio);
  detallePrecio.innerHTML = `<strong>Precio:</strong> ${!isNaN(precioNumero) ? '$' + precioNumero.toFixed(2) : '$' + propiedad.precio}`;
  detalleDireccion.innerHTML = `<strong>Dirección:</strong> ${propiedad.direccion}`;
  // Suponiendo que en la BD también se tengan estos campos (si no, se muestran valores por defecto)
  detalleTelefono.innerHTML = `<strong>Teléfono:</strong> ${propiedad.telefono || 'No especificado'}`;
  detalleCorreo.innerHTML = `<strong>Correo:</strong> ${propiedad.correo || 'No especificado'}`;

  modalDetalle.classList.add("active");
}

// Cerrar el modal de detalle
document.addEventListener('DOMContentLoaded', function() {
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

// Cargar las propiedades al iniciar
document.addEventListener('DOMContentLoaded', cargarPropiedadesUsuario);
