const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();
//Settings

router.get('/',  (req, res)=>{

    conexion.query('SELECT * FROM salas INNER JOIN estadosalas ON estadosalas.estado_id = salas.estado_id order by numero_sala asc ', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('index', {results: results});
        }

    });

})

router.get('/registros',  (req, res)=>{

    conexion.query('SELECT solicitud.solicitud_id, solicitud.codigo_solicitud, solicitud.fecha_solicitud,solicitud.hora_inicio,solicitud.hora_final, alumnos.nombre, salas.numero_sala, admin.nombre AS "nombreadm" FROM solicitud INNER JOIN alumnos ON solicitud.alumno_id = alumnos.alumno_id INNER JOIN salas ON solicitud.sala_id = salas.sala_id INNER JOIN admin ON solicitud.admin_id = admin.admin_id', (error, results) => {

        if (error){
            throw error;            
        }else{
            res.render('registros', {results: results});
            console.log('results :>> ', results);
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



const crud = require('./controllers/crud');

router.post('/GuardarSolicitud',crud.GuardarSolicitud);
router.post('/CambioEstadoSala',crud.CambioEstadoSala);

module.exports = router;