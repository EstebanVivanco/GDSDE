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

                conexion.query('INSERT INTO solicitud SET ?', { alumno_id: alumno_id, sala_id: sala_id, admin_id : '1', codigo_solicitud : 'AAA-VC', hora_inicio : '2023-10-10',hora_termino: '2024-12-12'} , (error, results) => {

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
