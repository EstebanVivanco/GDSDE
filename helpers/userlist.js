 

function addelement(){
    
    var ruts = [];

    let rut = document.getElementById('rut').value;
    let rutinput = document.getElementById('rut');
    ruts.push(rut);
    rutinput.value = "";



    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    var cont = 1;
    for( const ruta of ruts){


        let datoparrafo = document.createElement('input');
        let pretext = document.createElement('p');
        pretext.innerText = cont + '. Datos de ingresante: '
        datoparrafo.value = ruta;
        cont = cont + 1;

        resultado.appendChild(pretext).appendChild(datoparrafo);

    }

    let container = document.getElementById('contenedordatos');
    container.value = ruts;


}









