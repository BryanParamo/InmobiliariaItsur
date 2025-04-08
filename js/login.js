// Validación en tiempo real y al enviar el formulario de login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    let valid = true;

    // Validar usuario (no vacío)
    const usernameInput = document.getElementById("username");
    const usernameMsg = document.getElementById("usernameValidation");
    if (usernameInput.value.trim() === "") {
        usernameMsg.textContent = "El usuario es obligatorio.";
        valid = false;
    } else {
        usernameMsg.textContent = "";
    }
    
    // Validar contraseña (mínimo 8 caracteres)
    const passwordInput = document.getElementById("password");
    const passwordMsg = document.getElementById("passwordValidation");
    if (passwordInput.value.length < 8) {
        passwordMsg.textContent = "La contraseña debe tener al menos 8 caracteres.";
        valid = false;
    } else {
        passwordMsg.textContent = "";
    }
    
    if (!valid) {
        e.preventDefault(); // Evita el envío si hay errores
    }
});
