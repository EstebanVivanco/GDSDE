const express = require('express');
const router = express.Router();

//Settings

router.get('/',  (req, res)=>{

    res.render('index');

})

module.exports = router;