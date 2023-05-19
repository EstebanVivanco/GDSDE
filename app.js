const express = require('express');
const { json } = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(json));

//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Permitir ver imagenes señores
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/imgmanual')));
app.use(express.static(path.join(__dirname,'helpers')));

//Sessions
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log("Server corriendo en el puerto 5000, buenas");
});
