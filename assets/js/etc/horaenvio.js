// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Tu código aquí
    function obtenerHoraActual() {
        const now = new Date();
        const horas = String(now.getHours()).padStart(2, '0');
        const minutos = String(now.getMinutes()).padStart(2, '0');
        const segundos = String(now.getSeconds()).padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }

    document.querySelector('form').addEventListener('submit', function (event) {
        const horaEnvioInput = document.getElementById('horaEnvio');
        horaEnvioInput.value = obtenerHoraActual();
    });
});
