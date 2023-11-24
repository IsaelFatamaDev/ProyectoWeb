const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventCloseBtn = document.querySelector(".close "),
    addEventTitle = document.querySelector(".event-name "),
    addEventFrom = document.querySelector(".event-descripcion "),
    addEventTo = document.querySelector(".event-time-to "),
    addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//añadir fechas
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true;
            }
        });
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day today active">${i}</div>`;
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day ">${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

//fir de mes en mes con los botones 
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//funcion para ir al dia actual
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            activeDay = Number(e.target.innerHTML);
            //borrar dia activo
            days.forEach((day) => {
                day.classList.remove("active");
            });
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Dato Inválido");
}
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayIndex = day.getDay(); // Obtiene el índice del día de la semana (0: Domingo, 1: Lunes, etc.)
    const dayNames = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];
    const dayName = dayNames[dayIndex];

    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}


function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach((event) => {
                events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
            <h3>Sin Eventos</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove("active");
    }
});

addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
    var osccred = document.createElement("div");
    osccred.style.position = "absolute";
    osccred.style.bottom = "0";
    osccred.style.right = "0";
    osccred.style.fontSize = "10px";
    osccred.style.color = "#ccc";
    osccred.style.fontFamily = "sans-serif";
    osccred.style.padding = "5px";
    osccred.style.background = "#fff";
    osccred.style.borderTopLeftRadius = "5px";
    osccred.style.borderBottomRightRadius = "5px";
    osccred.style.boxShadow = "0 0 5px #ccc";
    document.body.appendChild(osccred);
}

defineProperty();

addEventFrom.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^a-zA-Z0-9@._%+-]/g, "");

});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
});


// Función para convertir eventos en un formato de texto
// Función para convertir eventos en un formato de texto
function eventsToText() {
    let text = '';
    eventsArr.forEach(eventObj => {
        eventObj.events.forEach(event => {
            const eventDate = new Date(eventObj.year, eventObj.month - 1, eventObj.day); // Restar 1 al mes ya que los meses en JavaScript comienzan desde 0
            const day = eventDate.toLocaleDateString('es-ES', { weekday: 'long' });

            text += `Fecha: ${eventObj.day}/${eventObj.month}/${eventObj.year}\n`;
            text += `Día: ${day}\n`;
            text += `Título: ${event.title}\n`;
            text += `Descripción: ${event.time.split(" - ")[0]}\n`;
            text += `Lugar: ${event.time.split(" - ")[1]}\n\n`;
        });
    });
    return text;
}

// Función para guardar los eventos como un archivo de texto
function saveEventsAsTextToFile() {
    const text = eventsToText();

    // Crear un enlace temporal para descargar el archivo
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventos.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Llamar a la función para guardar los eventos como archivo de texto



// Función para descargar el archivo de texto
function downloadEventsAsText() {
    const text = eventsToText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventos.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Convert text content to JSON
    const eventsJson = textToEvents(text);

    // Save as JSON file
    const jsonText = JSON.stringify(eventsJson, null, 2);
    const jsonBlob = new Blob([jsonText], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonA = document.createElement('a');
    jsonA.href = jsonUrl;
    jsonA.download = 'eventos.json';
    jsonA.style.display = 'none';
    document.body.appendChild(jsonA);
    jsonA.click();
    URL.revokeObjectURL(jsonUrl);
    document.body.removeChild(jsonA);
}

function textToEvents(text) {
    const lines = text.split('\n');
    const eventsJson = [];

    for (let i = 0; i < lines.length; i += 5) {
        if (i + 4 < lines.length) {
            const dateLine = lines[i].trim();
            const dayLine = lines[i + 1].trim();
            const titleLine = lines[i + 2].trim();
            const descriptionLine = lines[i + 3].trim();
            const locationLine = lines[i + 4].trim();

            // Extract the text after the colon
            const date = dateLine.split(': ')[1];
            const day = dayLine.split(': ')[1];
            const title = titleLine.split(': ')[1];
            const description = descriptionLine.split(': ')[1];
            const location = locationLine.split(': ')[1];

            // Create an event object and add it to the eventsJson array
            const event = {
                date: date,
                day: day,
                title: title,
                description: description,
                location: location,
            };

            eventsJson.push(event);
        }
    }

    return eventsJson;
}



addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // Validación de campos obligatorios
    if (eventTitle === "" || eventTimeFrom === "") {
        alert("Completa todos los campos");
        return;
    }

    // Check si el evento ya ha sido agregado
    let eventExist = false;
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((event) => {
                if (event.title === eventTitle) {
                    eventExist = true;
                }
            });
        }
    });
    if (eventExist) {
        alert("Evento ya añadido");
        return;
    }
    // Mantenemos el formato del evento como lo ingresa el usuario
    const newEvent = {
        title: eventTitle,
        time: eventTimeFrom + (eventTimeTo ? " - " + eventTimeTo : ""), // Añadir `eventTimeTo` solo si no está vacío
    };
    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    updateEvents(activeDay);

    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
        activeDayEl.classList.add("event");
    }
    // Llamar a la función para descargar eventos
});


eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        if (confirm("¿Estás seguro de que quieres borrar este evento?")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
            eventsArr.forEach((event) => {
                if (
                    event.day === activeDay &&
                    event.month === month + 1 &&
                    event.year === year
                ) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                        const activeDayEl = document.querySelector(".day.active");
                        if (activeDayEl.classList.contains("event")) {
                            activeDayEl.classList.remove("event");
                        }
                    }
                }
            });
            updateEvents(activeDay);
        }
    }
});

function saveEvents() {
    const guardado = localStorage.setItem("events", JSON.stringify(eventsArr));
    console.log(guardado)

}

function getEvents() {
    if (localStorage.getItem("events") === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function deleteAllEvents() {
    eventsArr.length = 0;

    updateEvents(activeDay);

    localStorage.removeItem("events");
}

const deleteEventsBtn = document.querySelector(".delete-events-btn");
deleteEventsBtn.addEventListener("click", deleteAllEvents);
