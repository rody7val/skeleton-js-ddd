const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost', // Cambia a la dirección IP del contenedor si no estás usando Docker Desktop
  user: 'root',
  password: 'changeMe', // Reemplaza con la contraseña que estableciste en el archivo docker-compose.yml
  database: 'changeMe' // Reemplaza con el nombre de la base de datos que especificaste en docker-compose.yml
};

let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error;
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('La conexión a la base de datos no ha sido establecida');
  }
  return connection;
}

module.exports = {
  connectToDatabase,
  getConnection
};