const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();
//Settings

router.get('/',  (req, res)=>{

    conexion.query('SELECT * FROM salas INNER JOIN estadosalas ON estadosalas.estado_sala_id = salas.estado_sala_id_fk order by numero_sala asc ', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('index', {results: results});
        }

    });

})

router.get('/registros',  (req, res)=>{

    conexion.query('SELECT solicitud.solicitud_id, solicitud.codigo_solicitud, DATE_FORMAT(solicitud.fecha_solicitud, "%m/%d/%Y") AS fechasoli,solicitud.hora_inicio,solicitud.hora_final, usuarios.nombre, salas.numero_sala, usuarios.rut, usuarios.correo FROM solicitud INNER JOIN usuarios ON solicitud.usuario_id_fk = usuarios.usuario_id INNER JOIN salas ON solicitud.sala_id_fk = salas.sala_id', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('registros', {results: results});
        }

    });

})



router.get('/registrofinalizado',  (req, res)=>{

    res.redirect('registrofinalizado');

})


router.get('/CrudUser',  (req, res)=>{

    res.redirect('CrudUser');

})

router.get('/solicitud/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM salas WHERE sala_id = ?', [id] , (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('solicitud', { sala : results[0]});
        }

    });

})

router.get('/cambioestado/:id',  (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM salas WHERE sala_id = ?', [id] , (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('cambioestado', { sala : results[0]});
        }

    });

})

router.get('/error',  (req, res)=>{

       res.render('error');
 
})

router.get('/camaccess',  (req, res)=>{

    res.render('camaccess');

})

router.get('/crearNuevoUsuario',(req, res) =>{

    res.render('crearNuevoUsuario');
})

//LISTAR USUARIOS Y DESHABILITARLOS
router.get('/crudusuario',(req, res) =>{

    conexion.query('SELECT * FROM usuarios WHERE estado_usuario_id_fk = 1',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crudusuario', {results:results});
        }
    })
})
//CRUD DE USUARIOS
//LISTAR USUARIOS DESHABILITADOS
router.get('/usuarioDeshabilitado',(req, res) =>{

    conexion.query('SELECT * FROM usuarios WHERE estado_usuario_id_fk = 2',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuarioDeshabilitado', {results:results});
        }
    })
})


//RUTA PARA EDITAR USUARIO
router.get('/editarUsuarios/:id', (req, res)=>{

    const id = req.params.id;

    conexion.query('SELECT * FROM usuarios WHERE usuario_id = ? ', [id], (error, results)=>{

        if(error) throw error;

        conexion.query('SELECT * FROM tipousuarios',(errortipo, tipos)=>{

            if (errortipo) throw errortipo;

            res.render('editarUsuarios', { results : results[0] , tipox:tipos} )

            console.log(results)

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

    conexion.query('SELECT * FROM tipousuarios WHERE estadoTipoUsuario_id_fk = 1;',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crudtipo', {results:results});
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
            res.render('editusertype', {tipo:results[0]});
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
    res.render('ingresarTipoUsuario');
})


//RUTA PARA TIPOS DE USUARIOS DESHABILITADOS

router.get('/tipoUserDeshabilitado', (req,res)=>{

    conexion.query('SELECT * FROM tipousuarios WHERE estadoTipoUsuario_id_fk = 2;',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('tipoUsuariosDeshabilitados', {results:results});
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

const crud = require('./controllers/crud');

router.post('/GuardarSolicitud',crud.GuardarSolicitud);
router.post('/CambioEstadoSala',crud.CambioEstadoSala);

router.post('/CrearNuevoUsuario',crud.CrearNuevoUsuario);
router.post('/updateUsuario', crud.updateUsuario);

router.post('/updateUserType', crud.updateUserType);
router.post('/createUserType',crud.createUserType)

router.post('/login', crud.login);



module.exports = router;