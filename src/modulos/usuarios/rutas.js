const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

//usando promesas
/* router.get('/', function(req, res){
  //res.send('Clientes OK');
  const todos =  controlador.todos()
  .then((items) => {

    respuesta.success(req, res, items, 200);
  });

}); */

//Rutas
router.get('/', todos);
router.get('/:id', uno);
router.put('/', eliminar);
router.post('/', agregar);


//Funcionalidad de las rutas
//usando async
async function todos (req, res, next) {
  try{

    const items =  await controlador.todos();
    respuesta.success(req, res, items, 200);
  }catch(err){
    next(err);
    //respuesta.error(req, res, err, 500);
  }
};

async function uno (req, res, next) {
  try{

    const items =  await controlador.uno(req.params.id);
    respuesta.success(req, res, items, 200);
  }catch(err){
    next(err);
    //respuesta.error(req, res, err, 500);
  }
};

async function eliminar (req, res, next) {
  try{

    const items =  await controlador.eliminar(req.body);
    respuesta.success(req, res, 'Item eliminado satisfactoriamente!', 200);
  }catch(err){
    next(err);
    //respuesta.error(req, res, err, 500);
  }
};

async function agregar (req, res, next) {
  try{

    const items =  await controlador.agregar(req.body);
    if(req.body.id == 0){
      mensaje = 'Item guardado con exito!';
    }else{
      mensaje = 'Item actualizado con exito';
    }
    respuesta.success(req, res, mensaje, 201);
  }catch(err){
    next(err);
    //respuesta.error(req, res, err, 500);
  }
};

module.exports = router;