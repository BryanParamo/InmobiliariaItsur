document.getElementById("registroForm").addEventListener("submit", function(e) {
    let valid = true;
    
    // Validar nombre (mínimo 3 caracteres)
    const nombre = document.getElementById("nombre");
    const nombreMsg = document.getElementById("nombreValidation");
    if (nombre.value.trim().length < 3) {
        nombreMsg.textContent = "Mínimo 3 caracteres.";
        valid = false;
    } else {
        nombreMsg.textContent = "";
    }
    
    // Validar apellidos (mínimo 3 caracteres)
    const apellidos = document.getElementById("apellidos");
    const apellidosMsg = document.getElementById("apellidosValidation");
    if (apellidos.value.trim().length < 3) {
        apellidosMsg.textContent = "Mínimo 3 caracteres.";
        valid = false;
    } else {
        apellidosMsg.textContent = "";
    }
    
    // Validar correo
    const correo = document.getElementById("correo");
    const correoMsg = document.getElementById("correoValidation");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.value.trim())) {
        correoMsg.textContent = "Correo inválido.";
        valid = false;
    } else {
        correoMsg.textContent = "";
    }
    
    // Validar teléfono (10 dígitos)
    const telefono = document.getElementById("telefono");
    const telefonoMsg = document.getElementById("telefonoValidation");
    const telRegex = /^\d{10}$/;
    if (!telRegex.test(telefono.value.trim())) {
        telefonoMsg.textContent = "Debe contener 10 dígitos.";
        valid = false;
    } else {
        telefonoMsg.textContent = "";
    }
    
    // Validar contraseña
    const password = document.getElementById("password");
    const passwordMsg = document.getElementById("passwordValidation");
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passRegex.test(password.value)) {
        passwordMsg.textContent = "Mínimo 8 caracteres, 1 letra y 1 dígito.";
        valid = false;
    } else {
        passwordMsg.textContent = "";
    }
    
    // Validar confirmación de contraseña
    const confirmPassword = document.getElementById("confirm_password");
    const confirmPasswordMsg = document.getElementById("confirmPasswordValidation");
    if (password.value !== confirmPassword.value) {
        confirmPasswordMsg.textContent = "Las contraseñas no coinciden.";
        valid = false;
    } else {
        confirmPasswordMsg.textContent = "";
    }
    
    if (!valid) {
        e.preventDefault(); // Cancelar el envío si hay errores
    }
});
