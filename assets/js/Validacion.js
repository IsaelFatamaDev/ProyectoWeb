document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function (event) {
        let valid = true;

        // Validación de Nombres
        const nombresInput = document.getElementById("nombres");
        if (nombresInput.value.trim() === "") {
            valid = false;
            alert("Por favor, ingrese su nombre.");
            nombresInput.focus();
        }

        // Validación de Apellidos
        const apellidosInput = document.getElementById("apellidos");
        if (apellidosInput.value.trim() === "") {
            valid = false;
            alert("Por favor, ingrese sus apellidos.");
            apellidosInput.focus();
        }

        // Validación de Correo Electrónico
        const emailInput = document.getElementById("email");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            valid = false;
            alert("Por favor, ingrese una dirección de correo electrónico válida.");
            emailInput.focus();
        }

        // Validación de Teléfono
        const telefonoInput = document.getElementById("telefono");
        if (telefonoInput.value.trim() === "") {
            valid = false;
            alert("Por favor, ingrese su número de teléfono.");
            telefonoInput.focus();
        }

        // Validación de Asunto
        const subjectInput = document.getElementById("subject");
        if (subjectInput.value.trim() === "") {
            valid = false;
            alert("Por favor, ingrese un asunto.");
            subjectInput.focus();
        }

        // Validación de Mensaje
        const messageInput = document.getElementById("message");
        if (messageInput.value.trim() === "") {
            valid = false;
            alert("Por favor, ingrese un mensaje.");
            messageInput.focus();
        }

        if (!valid) {
            event.preventDefault();
        }
    });
});