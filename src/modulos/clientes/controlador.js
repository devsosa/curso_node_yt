//const db = require('../../db/mysql');

const TABLA = 'clientes';

module.exports = function(dbInyectada) {
  //Controlar errores
  let db = dbInyectada;

  if(!db){
    db = require('../../db/mysql');
  }
  
  function todos(){
    return db.todos(TABLA);
  }
  
  function uno(id){
    return db.uno(TABLA, id);
  }
  
  function agregar(body){
    return db.agregar(TABLA, body);
  }
  
  function eliminar(body){
    return db.eliminar(TABLA, body);
  }
  
  return { todos, uno, eliminar, agregar } 
}