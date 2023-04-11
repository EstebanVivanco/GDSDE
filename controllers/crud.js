const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.GuardarSolicitud = (req,res)=>{

    const ruts = req.body.contenedordatos;
    const sala_id = req.body.idsala;
    const arrayruts = ruts.split(",");
    let alumno_id;

    for (const rutovich of arrayruts) {
        
        conexion.query('SELECT alumno_id FROM alumnos WHERE RUT = ? ', [rutovich] , (error, results) => {

            if (error){
                throw error;            
            }else{

                alumno_id = results[0]['alumno_id'] ;

                conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : 'AAA-VC', fecha_solicitud : '2023-11-04' ,hora_inicio : '22:00:00', hora_final : '23:00:00'} , (error, results) => {

                    if (error){
                        throw error;            
                    }else{
                        res.send('Registro finalizado exitosamente épico señores, nada más que decir')
                    }
            
                });

            }
    
    });
        
    }
    


}
