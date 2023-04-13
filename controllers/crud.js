const { query } = require('../database/bd');
const conexion = require('../database/bd');
const router = require('../router');

exports.GuardarSolicitud = (req,res)=>{

    const ruts = req.body.contenedordatos;
    const sala_id = req.body.idsala;
    const arrayruts = ruts.split(",");
    const moment = require('moment')
    let alumno_id;

    for (const rutovich of arrayruts) {
        
        conexion.query('SELECT alumno_id FROM alumnos WHERE RUT = ? ', [rutovich] , (error, results) => {



            if (error){
                throw error;            
            }else{

                alumno_id = results[0]['alumno_id'] ;

                //https://momentjs.com/ (formatos de fecha)


                let fecha_solicitud = moment().add(0, 'hours').format("YYYY:MM:DD");     
                let hora_inicio = moment().format("hh:mm:ss");
                let hora_final = moment().add(2, 'hours').format('hh:mm:ss')


                conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : 'AAA-VC', fecha_solicitud : fecha_solicitud ,hora_inicio : hora_inicio, hora_final : hora_final} , (error, results) => {
                    
                    if (error){
                        throw error;            
                    }else{
                        res.render('registrofinalizado');
                    }
            
                });

            }
    
    });
        
    }
    


}
