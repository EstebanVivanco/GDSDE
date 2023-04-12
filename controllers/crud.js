const { query } = require('../database/bd');
const conexion = require('../database/bd');

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

<<<<<<< HEAD
                //https://momentjs.com/ (formatos de fecha)
                let currentDate = moment().format("hh:mm:ss");

                conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : 'AAA-VC', hora_inicio : '2024-10-12' ,hora_termino: '2024-12-12'} , (error, results) => {
=======
                conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : 'AAA-VC', fecha_solicitud : '2023-11-04' ,hora_inicio : '22:00:00', hora_final : '23:00:00'} , (error, results) => {
>>>>>>> 9b610646e47b919a6cbfdb2e3ce139fd53f7badf

                    if (error){
                        throw error;            
                    }else{
                        res.send('Registro finalizado exitosamente épico señores, nada más que decir' + currentDate)
                    }
            
                });

            }
    
    });
        
    }
    


}
