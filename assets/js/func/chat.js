// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");

                    var content = this.nextElementSibling;

                    if (content.style.maxHeight) {
                              content.style.maxHeight = null;
                    } else {
                              content.style.maxHeight = content.scrollHeight + "px";
                    }

          });
}


function getTime() {
          let date = new Date();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          // Formatear la hora como desees (puede necesitar ajustes según tus preferencias)
          let timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
          return '<p class="botTimeStamp">' + timeString + '</p>';
}
function mensajes() {
          let firstMessage = "Buenos días, ¿qué consulta deseas realizar?";
          let secondMessage = "Elige una de las opciones para brindarte ayuda:<br>1. Número de Teléfono de la institución.<br>2. Formulario de Contacto.<br>3. Si eres un estudiante egresado de nuestra institución, tenemos el formulario de envío de testimonios.";

          document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

          let time = getTime();
          $("#chat-timestamp").append(time);
          document.getElementById("userInput").scrollIntoView(false);

          // Agregamos un retraso de 1 segundo (puedes ajustar este valor según tus necesidades)
          setTimeout(function () {
                    // Después del retraso, mostramos el segundo mensaje
                    appendBotMessage(secondMessage);
          }, 3000);
}

function appendBotMessage(message) {
          let botMessage = '<p class="botText"><span>' + message + '</span></p>';
          document.getElementById("botStarterMessage").innerHTML += botMessage;

}



mensajes();

// Retrieves the response
function getHardResponse(userText) {
          let botResponse = getBotResponse(userText);
          let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
          $("#chatbox").append(botHtml);

          document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function obtenerRespuesta() {
          let textoUsuario = $("#textInput").val();

          if (textoUsuario == "") {
                    textoUsuario = "I love Code Palace!";
          }

          let userHtml = '<p class="userText"><span>' + textoUsuario + '</span></p>';

          $("#textInput").val("");
          $("#chatbox").append(userHtml);
          document.getElementById("chat-bar-bottom").scrollIntoView(true);

          setTimeout(() => {
                    getHardResponse(textoUsuario);
          }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
          let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

          $("#textInput").val("");
          $("#chatbox").append(userHtml);
          document.getElementById("chat-bar-bottom").scrollIntoView(true);

          //Uncomment this if you want the bot to respond to this buttonSendText event
          // setTimeout(() => {
          //     getHardResponse(sampleText);
          // }, 1000)
}

function sendButton() {
          obtenerRespuesta();
}

function heartButton() {
          buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
          if (e.which == 13) {
                    obtenerRespuesta();
          }
});