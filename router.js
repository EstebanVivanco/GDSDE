const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();
//Settings

router.get('/',  (req, res)=>{

    conexion.query('SELECT * FROM salas', (error, results) => {

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