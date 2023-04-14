const { query } = require('../database/bd');
const conexion = require('../database/bd');
const router = require('../router');
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
let pasa = 0;


exports.GuardarSolicitud = (req,res)=>{

    const ruts = req.body.contenedordatos;
    const sala_id = req.body.idsala;
    const codigo_solicitud = uuidv4().replace(/-/g, ''); 
    const arrayruts = ruts.split(",");


    let alumno_id;
    
    conexion.query('SELECT COUNT(*) AS count FROM alumnos WHERE rut IN (?)',[arrayruts] , (error, results) => {
            
        const counts = results[0].count;
        const sexo = arrayruts.length;

            if (error){
                console.log('error :>> ', error);
            }else{
                
                if (sexo === counts) {
                    
                    for (const rutovich of arrayruts){
                            conexion.query('SELECT alumno_id FROM alumnos WHERE RUT = ? ', [rutovich] , (error, results) => {

                                if (error){
                                    throw error;            
                                }else{

                                    alumno_id = results[0]['alumno_id'] ;
                                    console.log('alumno_id :>> ', alumno_id);

                                    //https://momentjs.com/ (formatos de fecha)

                                    let fecha_solicitud = moment().add(0, 'hours').format("YYYY:MM:DD");     
                                    let hora_inicio = moment().format("hh:mm:ss");
                                    let hora_final = moment().add(2, 'hours').format('hh:mm:ss')

                                    conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : codigo_solicitud , fecha_solicitud : fecha_solicitud ,hora_inicio : hora_inicio, hora_final : hora_final} , (error, results) => {
                                        
                                        if (error){
                                            throw error;            
                                        }else{
                                            res.render('registrofinalizado');
                                        }
                                
                                    });

                                }


                        }); 
                        
                    }

                }else{
                    res.render('error',{msg : ruts})
                }

            }
            
    });




        
    }
    

    exports.CambioEstadoSala = (req , res) =>{
        const sala_id = req.body.idsala;
        const estado_id = req.body.estadosala;
        
        conexion.query('UPDATE salas SET  ? WHERE sala_id = ?; ', [{estado_id:estado_id}, sala_id], (error, results) => {
            if(error){
                throw error;
            }else{
                res.redirect('/');
            }
        }) 

    }


























//     conexion.query('SELECT alumno_id FROM alumnos WHERE RUT = ? ', [rutovich] , (error, results) => {

//         if (error){
//             throw error;            
//         }else{

//             alumno_id = results[0]['alumno_id'] ;

//             //https://momentjs.com/ (formatos de fecha)


//             let fecha_solicitud = moment().add(0, 'hours').format("YYYY:MM:DD");     
//             let hora_inicio = moment().format("hh:mm:ss");
//             let hora_final = moment().add(2, 'hours').format('hh:mm:ss')



//             conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : codigo_solicitud , fecha_solicitud : fecha_solicitud ,hora_inicio : hora_inicio, hora_final : hora_final} , (error, results) => {
                
//                 if (error){
//                     throw error;            
//                 }else{
//                     res.render('registrofinalizado');
//                 }
        
//             });

//         }

// });
