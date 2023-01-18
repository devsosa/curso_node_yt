//const db = require('../../db/mysql');

const auth = require('../auth');

const TABLA = 'usuarios';

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
  
  async function agregar(body){
    const usuario = {
      id: body.id,
      nombre: body.nombre,
      activo: body.activo
    }
    const respuesta = await db.agregar(TABLA, usuario);

    let insertId = 0;
    if(body.id == 0){
      insertId = respuesta.insertId;
    }else{
      insertId = body.id;
    }

    let respuestaDos = '';
    if(body.usuario || body.password){
      respuestaDos = await auth.agregar({
        id: insertId,
        usuario: body.usuario,
        password: body.password
      });
    }

    return respuestaDos;
  }
  
  function eliminar(body){
    return db.eliminar(TABLA, body);
  }
  
  return { todos, uno, eliminar, agregar } 
}