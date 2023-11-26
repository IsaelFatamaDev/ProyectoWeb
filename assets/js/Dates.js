const ip = 'localhost';
const MAIN_PATH = "http://localhost:3000" + "/api/";
const date = new Date();
let currentDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const dayOfWeek = daysOfWeek[date.getDay()];

const currentDateFormatted = dayOfWeek + " - " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
const imageDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
const imageUrl = `/assets/img/banner/${imageDate}.jpg`;

let dates = fetch(MAIN_PATH + "dates/" + currentDate)
      .then((res) => {
            if (!res.ok) {
                  throw new Error(`¡Error HTTP! Estado: ${res.status}`);
            }
            return res.json();
      })
      .then((data) => {
            if (!data) {
                  console.log("¡Respuesta vacía!");
                  // Manejar de alguna manera, como asignar un valor predeterminado a data
                  data = { NOMBRE: "Hoy no se celebra nada", LUGAR: "--", DESCRIPCION: "Sin descripción" };
            }

            console.log("Mostrando Data ", data);

            document.getElementById("contentModal").innerHTML = `
            <header>Hoy es ${currentDateFormatted}</header>
            <p class="parrafo1">${data.NOMBRE}</p>
            <p class="parrafo1">${data.LUGAR}</p>
        `;
            document.getElementById("modal_container").innerHTML = `
            <h2 class="modal__title">${data.NOMBRE} <br> ${formattedDate} </h2>
            <p class="modal__paragraph">${data.DESCRIPCION}</p>
        `;
      })
      .catch((error) => {
            console.error("Error al obtener datos: ", error);
      });
