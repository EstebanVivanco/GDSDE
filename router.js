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


const crud = require('./controllers/crud');
router.post('/GuardarSolicitud',crud.GuardarSolicitud);

module.exports = router;