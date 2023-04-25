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

    conexion.query('SELECT solicitud.solicitud_id, solicitud.codigo_solicitud, solicitud.fecha_solicitud,solicitud.hora_inicio,solicitud.hora_final, usuarios.nombre, salas.numero_sala, usuarios.rut FROM solicitud INNER JOIN usuarios ON solicitud.usuario_id_fk = usuarios.usuario_id INNER JOIN salas ON solicitud.sala_id_fk = salas.sala_id', (error, results) => {

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

router.get('/crudusuario',(req, res) =>{

    res.render('crudusuario');
})


router.get('/login', (req, res) =>{

    res.render('login');
})


router.get('/crudtipo', (req,res)=>{

    conexion.query('SELECT * FROM tipousuarios',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crudtipo', {results:results});
        }
    })
})


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



const crud = require('./controllers/crud');

router.post('/GuardarSolicitud',crud.GuardarSolicitud);
router.post('/CambioEstadoSala',crud.CambioEstadoSala);

router.post('/updateUserType', crud.updateUserType);

module.exports = router;