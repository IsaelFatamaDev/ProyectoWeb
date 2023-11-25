//TODO: Conexiones de las tablas : Mysql

const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const web = http.createServer(app);
const port = 3000;

const conexion = mysql.createConnection({
      host: "localhost",
      database: "josecarlosmariategui",
      user: "root",
      password: "admin",
});

conexion.connect(function (err) {
      if (err) {
            throw error;
      } else {
            console.log("Conexion exitosa")
      }
});

//* Configuracion de las rutas

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

//* Configuracion de las carpetas

app.use('/assets', express.static('assets/'));


const staticPath = path.join(__dirname, 'assets');
const pagePath = (section, page) => path.join(__dirname, `../assets/pages/${section}/${page}`);


// Configuración de las rutas y carpetas estáticas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(staticPath));

// Rutas principales
app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/:page', (req, res) => {
      const page = req.params.page;
      res.sendFile(pagePath('', page));
});

// Rutas de las vistas (sección: Academicos, Calendarizacion, Nosotros)
const sections = ['Academicos', 'Calendarizacion', 'Nosotros'];

sections.forEach((section) => {
      app.get(`/${section}/:page`, (req, res) => {
            const page = req.params.page;
            res.sendFile(pagePath(section, page));
      });
});

// Servidor escuchando en el puerto
web.listen(port, () => {
      console.log("Servidor escuchando en el puerto: http://localhost:" + port);
});


//* * * * * * * * * * * CONEXIÓN BASE DE DATOS : FECHAS CÍVICAS * * * * * * * * * * * //

app.get("/api/dates/:current", (req, res) => {
      var request = req.params.current;
      conexion.query("SELECT NOMBRE, LUGAR, date_format(FECHA, '%d/%m/%Y') AS FECHA, DESCRIPCION FROM FECHAS_CIVICAS WHERE FECHA = ?", [request], function (err, row, fields) {
            if (err) {
                  throw err;
            } else if (row[0] != null) {
                  console.log("Respuesta JSON:", row[0]);
                  res.json(row[0]);
            } else {
                  console.log("Respuesta JSON nula");
                  res.json(null);
            }
      })
});

app.post("/validar", function (req, res) {
      const datos = req.body;
      let nombres = datos.name;
      let email = datos.email;
      let asunto = datos.subject;
      let mensaje = datos.message;

      // Pendiente se establece como 'P' (pendiente) por defecto
      let registrar = `INSERT INTO CONTACTO (nombres, email, asunto, mensaje, pendiente) 
                      VALUES ('${nombres}', '${email}', '${asunto}', '${mensaje}', 'P')`;

      conexion.query(registrar, function (error) {
            if (error) {
                  throw error;
            } else {
                  console.log("Datos Recibidos");
                  res.redirect('/');
            }
      });

      console.log(datos);

      let consulta = 'SELECT * FROM CONTACTO'
      console.log(consulta);
});
