const express = require('express');
const conexion = require('./database/bd');

const router = express.Router();

//Settings

router.get('/',  (req, res)=>{

    res.render('form');

})

module.exports = router;