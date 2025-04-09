document.getElementById('hipotecaForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores y elementos de validación
  const precioInput = document.getElementById('precio');
  const engancheInput = document.getElementById('enganche');
  const interesInput = document.getElementById('interes');
  const plazoInput = document.getElementById('plazo');

  const precio = parseFloat(precioInput.value);
  const enganche = parseFloat(engancheInput.value);
  const interes = parseFloat(interesInput.value);
  const plazo = parseInt(plazoInput.value);

  const precioMsg = document.getElementById('precioValidation');
  const engancheMsg = document.getElementById('engancheValidation');
  const interesMsg = document.getElementById('interesValidation');
  const plazoMsg = document.getElementById('plazoValidation');

  // Limpiar mensajes anteriores
  precioMsg.textContent = "";
  engancheMsg.textContent = "";
  interesMsg.textContent = "";
  plazoMsg.textContent = "";

  let error = false;

  // Validar que precio sea mayor o igual a 0 (aunque por lo general se rellena automáticamente)
  if (precio < 0 || isNaN(precio)) {
    precioMsg.textContent = "El precio no puede ser negativo.";
    error = true;
  }
  
  // Validar que enganche sea mayor o igual a 0
  if (enganche < 0 || isNaN(enganche)) {
    engancheMsg.textContent = "El pago inicial no puede ser negativo.";
    error = true;
  }
  
  // Validar que la tasa de interés anual sea mayor o igual a 0
  if (interes < 0 || isNaN(interes)) {
    interesMsg.textContent = "La tasa de interés no puede ser negativa.";
    error = true;
  }
  
  // Validar que el plazo (años) sea mayor a 0
  if (plazo <= 0 || isNaN(plazo)) {
    plazoMsg.textContent = "El plazo debe ser mayor que 0.";
    error = true;
  }
  
  // Si hubo algún error, detener el proceso y no calcular nada.
  if (error) {
    return;
  }
  
  // Convertir la tasa anual a tasa mensual
  const tasaMensual = interes / 100 / 12;
  const numPagos = plazo * 12;
  const montoPrestado = precio - enganche;
  
  // Fórmula para calcular el pago mensual (PMT)
  const pagoMensual = montoPrestado * (tasaMensual * Math.pow(1 + tasaMensual, numPagos)) / (Math.pow(1 + tasaMensual, numPagos) - 1);
  
  if (!isNaN(pagoMensual) && (pagoMensual > 0)) {
    document.getElementById('pagoMensual').textContent = `$${pagoMensual.toFixed(2)}`;
  } else {
    document.getElementById('pagoMensual').textContent = '0';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  cargarPropiedadesHipoteca();

  // Manejo del envío del formulario de hipoteca (ya existente)
  document.getElementById('hipotecaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const precio = parseFloat(document.getElementById('precio').value);
    const enganche = parseFloat(document.getElementById('enganche').value);
    const interes = parseFloat(document.getElementById('interes').value) / 100 / 12; // Tasa mensual
    const plazo = parseInt(document.getElementById('plazo').value) * 12; // Número de pagos en meses

    const montoPrestado = precio - enganche;

    const pagoMensual = montoPrestado * (interes * Math.pow(1 + interes, plazo)) / (Math.pow(1 + interes, plazo) - 1);

    if (!isNaN(pagoMensual) && (pagoMensual > 0)) {
      document.getElementById('pagoMensual').textContent = `$${pagoMensual.toFixed(2)}`;
    } else {
      document.getElementById('pagoMensual').textContent = '0';
    }
  });
});

// Función para cargar la lista de propiedades
function cargarPropiedadesHipoteca() {
  fetch('../backend/propiedades.php')
    .then(response => response.json())
    .then(data => {
      const listaContainer = document.getElementById('listaPropiedades');
      listaContainer.innerHTML = '';

      data.forEach(propiedad => {
        const item = document.createElement('div');
        item.classList.add('propiedad-item');

        // Imagen
        const img = document.createElement('img');
        img.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/150";
        item.appendChild(img);

        // Título
        const titulo = document.createElement('p');
        titulo.textContent = propiedad.titulo;
        item.appendChild(titulo);

        // Al hacer clic: setear precio en el input
        item.addEventListener('click', () => {
          document.getElementById('precio').value = propiedad.precio;
        });

        listaContainer.appendChild(item);
      });
    })
    .catch(error => console.error("Error al cargar las propiedades:", error));
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPropiedadesHipoteca();

  // Manejo del formulario para calcular la hipoteca, etc.
});



item.classList.add('propiedad-item');
const img = document.createElement('img');
img.src = propiedad.imagen ? `../backend/${propiedad.imagen}` : "https://via.placeholder.com/150";
img.alt = propiedad.titulo;
item.appendChild(img);
