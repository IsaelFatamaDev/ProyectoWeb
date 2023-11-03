//TODO: Conexiones de las tablas : Mysql

const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const web = http.createServer(app);
const port = 5500;
const ip = 'localhost';

const dbConfig = {
      host: 'localhost',
      user: 'root',
      database: 'jcmProyecto',
      password: 'admin',
};

//* Configuracion de las rutas

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

//* Configuracion de las carpetas

app.use('/assets', express.static('assets/'));
app.use('/assets/css', express.static('assets/css/'));
app.use('/assets/js', express.static('assets/js/'));
app.use('/assets/img', express.static('assets/img/'))
app.use('/assets/pages', express.static('assets/pages/'));

const staticPath = path.join(__dirname, 'assets');
const pagePath = (section, page) => path.join(__dirname, `../assets/pages/${section}/${page}`);

// Configuración de la base de datos
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
      if (err) throw err;
      console.log('Conexión exitosa');
});

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
web.listen(port, ip, () => {
      console.log(`Servidor escuchando en el puerto: http://${ip}:${port}`);
});
