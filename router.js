const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();
//Settings

router.get('/',  (req, res)=>{

    res.render('login');

})

router.get('/logout',  (req, res)=>{


    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/login'); // Redirige a la página de inicio de sesión u otra página adecuada
        }
    });


})



router.get('/inicio',  (req, res)=>{

    conexion.query('SELECT * FROM salas INNER JOIN estadosalas ON estadosalas.estado_sala_id = salas.estado_sala_id_fk order by numero_sala asc ', (error, results) => {

        if (error){

            throw error; 

        }else{
            res.render('index', {results: results, user: req.session.user});
        }

    });

})

router.get('/registros',  (req, res)=>{

    conexion.query('SELECT solicitud.solicitud_id, solicitud.codigo_solicitud, DATE_FORMAT(solicitud.fecha_solicitud, "%m/%d/%Y") AS fechasoli,solicitud.hora_inicio,solicitud.hora_final, usuarios.nombre, salas.numero_sala, usuarios.rut, usuarios.correo FROM solicitud INNER JOIN usuarios ON solicitud.usuario_id_fk = usuarios.usuario_id INNER JOIN salas ON solicitud.sala_id_fk = salas.sala_id', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('registros', {results: results, user: req.session.user});
        }

    });

})



router.get('/crudsalas',  (req, res)=>{


    conexion.query('SELECT salas.sala_id AS id,salas.numero_sala AS numero, estadosalas.estado AS estado, salas.capacidad FROM salas INNER JOIN estadosalas WHERE salas.estado_sala_id_fk = estadosalas.estado_sala_id  and estadosalas.estado != "Deshabilitada" ', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('crudsalas', {results: results, user: req.session.user});
        }

    });

})

router.get('/crearsalas',  (req, res)=>{


    conexion.query('SELECT * FROM estadosalas where estado != "Ocupada" ', (error, results) => {

        conexion.query('SELECT camcode FROM salas ', (error, results2) => {

            if (error){
                throw error;            
            }else{
                res.render('crearsalas', {results: results, results2:results2 , user: req.session.user});
            }
        

        })
    });

})

//Deshabilitar sala

router.get('/deshabilitarSala/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE salas SET estado_sala_id_fk = 3 where sala_id = ?', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/crudsalas')
        }
    })
})

//Vista Habilitar sala

router.get('/habiSalas', (req, res)=>{


    conexion.query('SELECT salas.sala_id AS id,salas.numero_sala AS numero, estadosalas.estado AS estado, salas.capacidad FROM salas INNER JOIN estadosalas WHERE salas.estado_sala_id_fk = estadosalas.estado_sala_id  and estadosalas.estado = "Deshabilitada" ', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('salasDeshabilitadas', {results: results, user: req.session.user});
        }

    });
            

})

//Funcion habilitar sala
router.get('/habilitarSala/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE salas SET estado_sala_id_fk = 1 where sala_id = ?', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/crudsalas')
        }
    })

})

//Editar Sala
router.get('/editarSalas/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('Select * FROM salas WHERE sala_id = ?', [id], (error, results)=>{
        conexion.query('SELECT camcode FROM salas ', (error, results2) => {

            if(error){
                throw error;
            }else{
                res.render('updateSalas' , {results: results[0], results2:results2, user: req.session.user})
            }

        })

    })


})


router.get('/registrofinalizado',  (req, res)=>{

    res.redirect('registrofinalizado');

})


router.get('/CrudUser',  (req, res)=>{

    res.redirect('CrudUser');

})

router.get('/cola',  (req, res)=>{


    conexion.query('SELECT numero_sala, capacidad, estadosalas.estado, hora_final FROM `salas` left JOIN solicitud ON salas.sala_id = solicitud.sala_id_fk INNER JOIN estadosalas ON estadosalas.estado_sala_id = salas.estado_sala_id_fk GROUP by numero_sala ORDER BY numero_sala ASC;', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('cola', {results: results, user: req.session.user});
        }

    });

})

router.get('/solicitud/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM salas WHERE sala_id = ?', [id] , (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('solicitud', { sala : results[0], user: req.session.user});
        }

    });

})

router.get('/cambioestado/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM salas WHERE sala_id = ?', [id] , (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('cambioestado', { sala : results[0], user: req.session.user});
        }

    });

})

router.get('/error',  (req, res)=>{

        res.render('error',{user: req.session.user});
 
})

router.get('/camaccess',  (req, res)=>{

    res.render('camaccess');

})
 
router.get('/crearNuevoUsuario',(req, res) =>{


    conexion.query('SELECT * FROM tipousuarios where estadoTipoUsuario_id_fk = 1',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crearNuevoUsuario', {results:results, rut: 1, user: req.session.user});
        }
    })

})

//LISTAR USUARIOS Y DESHABILITARLOS
router.get('/crudusuario',(req, res) =>{

    conexion.query('SELECT usuarios.usuario_id, usuarios.rut, usuarios.nombre, usuarios.correo, usuarios.estado_usuario_id_fk, usuarios.tipo_id_fk, usuarios.admin_pass, tipousuarios.tipo_id, tipousuarios.nombre AS tiponombre FROM usuarios INNER JOIN tipousuarios ON tipousuarios.tipo_id = usuarios.tipo_id_fk WHERE estado_usuario_id_fk = 1 ',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crudusuario', {results:results, user: req.session.user});
        }
    })
})
//CRUD DE USUARIOS
//LISTAR USUARIOS DESHABILITADOS
router.get('/usuarioDeshabilitado',(req, res) =>{

    conexion.query('SELECT usuarios.usuario_id, usuarios.rut, usuarios.nombre, usuarios.correo, usuarios.estado_usuario_id_fk, usuarios.tipo_id_fk, usuarios.admin_pass, tipousuarios.tipo_id, tipousuarios.nombre AS tiponombre FROM usuarios INNER JOIN tipousuarios ON tipousuarios.tipo_id = usuarios.tipo_id_fk WHERE estado_usuario_id_fk = 2',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuarioDeshabilitado', {results:results, user: req.session.user});
        }
    })
})


//RUTA PARA EDITAR USUARIO
router.get('/editarUsuarios/:id', (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM usuarios WHERE usuario_id = ? ', [id], (error, results)=>{

        if(error) throw error;

        conexion.query('SELECT * FROM tipousuarios where estadoTipoUsuario_id_fk = 1',(errortipo, tipos)=>{

            if (errortipo) throw errortipo;


            conexion.query('SELECT tipo_id_fk FROM usuarios where usuario_id = ?',[id],(errortipo, aidi)=>{

                if (errortipo) throw errortipo;
    
                res.render('editarUsuarios', { results : results[0] , tipox:tipos, aidi:aidi, user: req.session.user} )
    
            })
         

        })
    })
})


//DESHABILITAR USUARIO
router.get('/deshabilitarUsuario/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE usuarios SET estado_usuario_id_fk = 2 WHERE usuario_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/crudusuario')
        }
    })
})

//HABILITAR USUARIOS
router.get('/habilitarUsuario/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE usuarios SET estado_usuario_id_fk = 1 WHERE usuario_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/usuarioDeshabilitado')
        }
    })
})
//FIN CRUD DE USUARIOS

router.get('/login', (req, res) =>{
    res.render('login');
})

//CRUD DE TIPO
router.get('/crudtipo', (req,res)=>{

    conexion.query('SELECT * FROM tipousuarios WHERE NOT tipo_id = 1 and estadoTipoUsuario_id_fk = 1;',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crudtipo', {results:results, user: req.session.user});
        }
    })
})

//RUTA PARA CAMBIAR EL ESTADO DEL TIPO DE USUARIO

router.get('/deleteUserType/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE tipousuarios SET estadoTipoUsuario_id_fk = 2 WHERE tipo_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/crudtipo')
        }
    })
})

//RUTA PARA EDITAR TIPO DE USUARIO
router.get('/editusertype/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('SELECT * FROM tipousuarios WHERE tipo_id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('editusertype', {tipo:results[0], user: req.session.user});
        }
    })
})

//RUTA PARA CAMBIAR EL ESTADO DEL TIPO DE USUARIO

router.get('/deleteUserType/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE tipousuarios SET estadoTipoUsuario_id_fk = 2 WHERE tipo_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/crudtipo')
        }
    })
})

//RUTA PARA AÑADIR UN NUEVO TIPO DE USUARIO

router.get('/ingresarTipoUsuario', (req,res)=>{
    res.render('ingresarTipoUsuario',{ user: req.session.user});
})


//RUTA PARA TIPOS DE USUARIOS DESHABILITADOS

router.get('/tipoUserDeshabilitado', (req,res)=>{

    conexion.query('SELECT * FROM tipousuarios WHERE estadoTipoUsuario_id_fk = 2;',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('tipoUsuariosDeshabilitados', {results:results, user: req.session.user});
        }
    })
})

//RUTA PARA HABILITAR TIPOS DE USUARIO

router.get('/habilitar/:id', (req, res)=>{

    const id = req.params.id;
    conexion.query('UPDATE tipousuarios SET estadoTipoUsuario_id_fk = 1 WHERE tipo_id = ? ', [id], (error)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/tipoUserDeshabilitado')
        }
    })
})
//FIN CRUD DE TIPOUSUARIOS

router.get('/denegado',  (req, res)=>{

    res.render('denegado');

})

//RUTA MANUAL DE USUARIO

router.get('/manual', (req, res)=>{

    res.render('manual', { user: req.session.user} );

})

const crud = require('./controllers/crud');
const { defineLocale } = require('moment');

router.post('/GuardarSolicitud',crud.GuardarSolicitud);
router.post('/CambioEstadoSala',crud.CambioEstadoSala);

router.post('/CrearNuevoUsuario',crud.CrearNuevoUsuario);
router.post('/updateUsuario', crud.updateUsuario);

router.post('/updateUserType', crud.updateUserType);
router.post('/createUserType',crud.createUserType);
router.post('/createsalas',crud.createsalas);
router.post('/updateSalas',crud.updateSalas);

router.post('/login', crud.login);



module.exports = router;