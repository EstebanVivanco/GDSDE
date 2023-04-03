const express = require('express');
const { json } = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(json));

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log("server corriendo aloo");
});
