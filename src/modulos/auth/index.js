//Constructor para inyectar la DB

const db = require('../../db/mysql');
const ctrl = require('./controlador');

module.exports = ctrl(db);