const { query } = require('../database/bd');
const conexion = require('../database/bd');
const { validate, clean, format, getCheckDigit } = require('rut.js')
const router = require('../router');
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
let pasa = 0;


exports.GuardarSolicitud = (req,res)=>{

    const ruts = req.body.contenedordatos;
    const sala_id = req.body.idsala;
    const codigo_solicitud = uuidv4().replace(/-/g, ''); 
    const arrayruts = ruts.split(",");
    let usuario_id;
    
    conexion.query('SELECT COUNT(*) AS count FROM usuarios WHERE rut IN (?)',[arrayruts] , (error, results) => {
            
        const counts = results[0].count;
        const sexo = arrayruts.length;

            if (error){
                console.log('error :>> ', error);
            }else{
                

                if (sexo === counts) {
                    
                    for (const rutovich of arrayruts){


                        console.log(rutovich);

                            conexion.query('SELECT usuario_id FROM usuarios WHERE RUT = ? ', [rutovich] , (error, results) => {

                                if (error){
                                    throw error;            
                                }else{

                                    usuario_id = results[0]['usuario_id'] ;

                                    //https://momentjs.com/ (formatos de fecha)

                                    let fecha_solicitud = moment().add(0, 'hours').format("YYYY:MM:DD");     
                                    let hora_inicio = moment().format("hh:mm:ss");
                                    let hora_final = moment().add(30, 'seconds').format('hh:mm:ss')

                                    conexion.query('INSERT INTO solicitud SET ?', { usuario_id_fk: usuario_id, sala_id_fk: sala_id, codigo_solicitud : codigo_solicitud , fecha_solicitud : fecha_solicitud ,hora_inicio : hora_inicio, hora_final : hora_final} , (error, results) => {
                                        
                                        if (error){
                                            throw error;            
                                        }else{
                                            

                                            conexion.query('UPDATE salas SET estado_sala_id_fk = 2 WHERE sala_id = ?; ', [ sala_id], (error, results) => {
                                                if(error){
                                                    throw error;
                                                }
                                            }); 

                                        }
                                    });

                                }


                        }); 
                        
                    }

                    res.render('registrofinalizado');  


                }else{
                    res.render('error',{msg : ruts})
                }

            }
            
    });




        
}


exports.CambioEstadoSala = (req , res) =>{
        const sala_id = req.body.idsala;
        const estado_id = req.body.estadosala;

        console.log(estado_id);
        conexion.query('UPDATE salas SET ? WHERE sala_id = ?; ', [{estado_sala_id_fk:estado_id}, sala_id], (error, results) => {
            if(error){
                throw error;
            }
            else{
                res.redirect('/inicio');
            }
        }) 

}

//CREAR NUEVO USUARIO
exports.CrearNuevoUsuario = (req, res)=>{
    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const estado = 1;
    const correo = req.body.correo;
    const pass = req.body.pass;
    console.log(nombre);
    //INSERT INTO usuarios SET rut = "22222", nombre= "adminnn", correo = "a@o", estado_usuario_id_fk = 1, tipo_id_fk = 1, admin_pass = "12345";
    conexion.query('SELECT * FROM tipousuarios where estadoTipoUsuario_id_fk = 1',(error, results)=>{
 
    conexion.query('INSERT INTO usuarios SET ?',{rut: rut, nombre:nombre, correo:correo, estado_usuario_id_fk:estado, tipo_id_fk: tipo, admin_pass:pass}, (error, results2)=>{
        if(error) throw(error);
        
        if(error){
            console.log(error);
        }else{
           // res.redirect('/inicio');
           res.render('crearNuevoUsuario',{
            alert:true,
            alertTitle: 'Todo correcto',
            alertMessage: 'Nuevo usuario ingresado correctamente!',
            alertIcon:'succes',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'crudusuario',
            results:results
        })
        }
    })
    })
}

//EDITAR USUARIO
exports.updateUsuario = (req, res)=>{

    const id = req.body.id;
    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const estado = 1;
    const correo = req.body.correo;
    const pass = req.body.pass;

    conexion.query('SELECT * FROM usuarios WHERE usuario_id = ? ', [id], (error, results)=>{
        conexion.query('SELECT * FROM tipousuarios where estadoTipoUsuario_id_fk = 1',(errortipo, tipos)=>{
            conexion.query('SELECT tipo_id_fk FROM usuarios where usuario_id = ?',[id],(errortipo, aidi)=>{

                conexion.query('UPDATE usuarios SET ? WHERE usuario_id = ?', [{rut:rut, nombre:nombre, correo:correo, estado_usuario_id_fk: estado, tipo_id_fk:tipo, admin_pass:pass}, id], (error, results)=>{
                    if(error){
                        throw error;
                    }
                    else{
                        //res.redirect('crudusuario');
                        res.render('editarUsuarios',{
                            alert:true,
                            alertTitle: 'Todo correcto',
                            alertMessage: 'Nuevo usuario ingresado correctamente!',
                            alertIcon:'succes',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'crudusuario',
                            results:results,
                            tipox:tipos,
                            aidi:aidi
                        })
                    }
                })

            })


        })


    })

}

//EDITAR TIPO DE USUARIO
exports.updateUserType = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;

    conexion.query('UPDATE tipousuarios SET ? WHERE tipo_id = ?', [{nombre:nombre}, id], (error, results)=>{
        if(error){
            throw error;
        }
        else{
            res.render('ingresarTipoUsuario',{
                alert:true,
                alertTitle: 'Todo correcto',
                alertMessage: 'Tipo de usuario actualizado correctamente!',
                alertIcon:'succes',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'crudtipo'
            })
        }
    })
}

//CREAR NUEVO TIPO DE USUARIO

exports.createUserType = (req, res)=>{
    const nombre = req.body.nombre;
    const fk = 1;

    conexion.query('INSERT INTO tipousuarios SET ?',{nombre:nombre, estadoTipousuario_id_fk:fk}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('ingresarTipoUsuario',{
                alert:true,
                alertTitle: 'Todo correcto',
                alertMessage: 'Tipo de usuario ingresado correctamente!',
                alertIcon:'succes',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'crudtipo'
            })
            //res.redirect('crudtipo');
        }
    })
}

//RUTA DE VALIDACION

exports.login = (req,res)=>{
    const email = req.body.correo;
    const pass = req.body.password;

    if(email && pass){
        conexion.query('SELECT * FROM usuarios WHERE correo = ? and admin_pass = ? and tipo_id_fk = 1', [email, pass], (error, results)=>{
            if(error){
                console.log('error :>> ', error);
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: 'Credenciales correctas!',
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'inicio'
                    })
                
                }else{

                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }


            }
        })
    }
}

exports.createsalas = (req, res)=>{

    const numero = req.body.numero;
    const capacidad = req.body.capacidad;
    const estado = req.body.estado;

    conexion.query('INSERT INTO salas SET ?',{numero_sala:numero, estado_sala_id_fk :estado, capacidad:capacidad}, (error, results)=>{

        conexion.query('SELECT salas.sala_id AS id,salas.numero_sala AS numero, estadosalas.estado AS estado, salas.capacidad FROM salas INNER JOIN estadosalas WHERE salas.estado_sala_id_fk = estadosalas.estado_sala_id ', (error, results) => {

            if(error){
                console.log(error);
            }else{
                res.render('crearsalas',{
                    alert:true,
                    alertTitle: 'Todo correcto',
                    alertMessage: 'Sala registrada correctamente!',
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'crudsalas',
                    results:results
                })
                //res.redirect('crudtipo');
            }

        })
    })
}

//EDITAR TIPO DE USUARIO
exports.updateSalas = (req, res)=>{

    const id = req.body.id;
    const capacidad = req.body.capacidad;
    const numero = req.body.numero;

    conexion.query('SELECT salas.sala_id AS id,salas.numero_sala AS numero, estadosalas.estado AS estado, salas.capacidad FROM salas INNER JOIN estadosalas WHERE salas.estado_sala_id_fk = estadosalas.estado_sala_id  and estadosalas.estado != "Deshabilitada" ', (error, results) => {


        conexion.query('UPDATE salas SET ? WHERE sala_id = ?', [{capacidad:capacidad, numero_sala:numero}, id], (error, resultsa)=>{
            if(error){
                throw error;
            }
            else{
                res.render('updateSalas',{
                    alert:true,
                    alertTitle: 'Todo correcto',
                    alertMessage: 'Sala actualizada correctamente!',
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'crudsalas',
                    results:results
                })
            }
        })

    })
}

























//     conexion.query('SELECT usuario_id FROM usuarios WHERE RUT = ? ', [rutovich] , (error, results) => {

//         if (error){
//             throw error;            
//         }else{

//             usuario_id = results[0]['usuario_id'] ;

//             //https://momentjs.com/ (formatos de fecha)


//             let fecha_solicitud = moment().add(0, 'hours').format("YYYY:MM:DD");     
//             let hora_inicio = moment().format("hh:mm:ss");
//             let hora_final = moment().add(2, 'hours').format('hh:mm:ss')



//             conexion.query('INSERT INTO solicitud SET ?', { usuario_id: usuario_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : codigo_solicitud , fecha_solicitud : fecha_solicitud ,hora_inicio : hora_inicio, hora_final : hora_final} , (error, results) => {
                
//                 if (error){
//                     throw error;            
//                 }else{
//                     res.render('registrofinalizado');
//                 }
        
//             });

//         }

// });
