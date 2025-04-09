document.getElementById('hipotecaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Obtener los valores de los campos
    const precio = parseFloat(document.getElementById('precio').value);
    const enganche = parseFloat(document.getElementById('enganche').value);
    const interes = parseFloat(document.getElementById('interes').value) / 100 / 12; // Tasa mensual
    const plazo = parseInt(document.getElementById('plazo').value) * 12; // Número de pagos (en meses)
  
    // Calcular el monto del préstamo
    const montoPrestado = precio - enganche;
  
    // Fórmula para calcular el pago mensual
    const pagoMensual = montoPrestado * (interes * Math.pow(1 + interes, plazo)) / (Math.pow(1 + interes, plazo) - 1);
  
    // Mostrar el resultado en el HTML
    if (!isNaN(pagoMensual) && (pagoMensual > 0)) {
      document.getElementById('pagoMensual').textContent = `$${pagoMensual.toFixed(2)}`;
    } else {
      document.getElementById('pagoMensual').textContent = '0';
    }
  });
  