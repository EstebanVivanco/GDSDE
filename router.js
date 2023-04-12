const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();
//Settings

router.get('/',  (req, res)=>{

    conexion.query('SELECT * FROM salas INNER JOIN estadosalas ON estadosalas.estado_id = salas.estado_id', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('index', {results: results});
        }

    });

})

router.get('/solicitud',  (req, res)=>{

    res.render('solicitud');

})


router.get('/registros',  (req, res)=>{

    conexion.query('SELECT solicitud.solicitud_id, solicitud.codigo_solicitud, solicitud.fecha_solicitud,solicitud.hora_inicio,solicitud.hora_final, alumnos.nombre, salas.numero_sala, admin.nombre AS "nombreadm" FROM solicitud INNER JOIN alumnos ON solicitud.alumno_id = alumnos.alumno_id INNER JOIN salas ON solicitud.sala_id = salas.sala_id INNER JOIN admin ON solicitud.admin_id = admin.admin_id', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('registros', {results: results});
        }

    });

})

router.get('/registrofinalizado',  (req, res)=>{

    res.render('registrofinalizado');

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



const crud = require('./controllers/crud');
router.post('/GuardarSolicitud',crud.GuardarSolicitud);

module.exports = router;