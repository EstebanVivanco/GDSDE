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
                                    let hora_final = moment().add(1, 'minutes').format('hh:mm:ss')

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
                res.redirect('/');
            }
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
            res.redirect('crudtipo');
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
            res.redirect('crudtipo');
        }
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
