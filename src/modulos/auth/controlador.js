//const db = require('../../db/mysql');

const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');
const TABLA = 'auth';

module.exports = function(dbInyectada) {
  //Controlar errores
  let db = dbInyectada;

  if(!db){
    db = require('../../db/mysql');
  }

  async function login(usuario, password){
    const data = await db.query(TABLA, { usuario: usuario });

    return bcrypt.compare(password, data.password)
      .then(resultado => {
        if(resultado === true){
          return auth.asignarToken({...data});
        }else{
          throw new Error('Informacion Invalida');
        }
      });
  }
  
  async function agregar(data){
    const authData = {
      id: data.id,
    }

    if(data.usuario){
      authData.usuario = data.usuario;
    }

    if(data.password){
      let password = data.password;
      authData.password = await bcrypt.hash(password.toString(), 5);
    }

    return db.agregar(TABLA, authData);
  }
  
  return { agregar, login } 
}