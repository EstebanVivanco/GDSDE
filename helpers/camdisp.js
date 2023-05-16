const inputs = document.querySelectorAll('input[id="codelin"]');
const camsExistentes = [];

for (let i = 0; i < inputs.length; i++) {

  const element = inputs[i];
  if (element.value.length > 0) {
    camsExistentes.push(element.value);
  }

}

// console.log('camsExistentes', camsExistentes)

function cargarOption() {

  navigator.mediaDevices.enumerateDevices()
    .then(devices => {

      let arraysOption = [];
      const selectcam = document.getElementById('selectCam');

      devices.forEach(device => {

        if (device.kind == 'videoinput') {
          
          arraysOption.push({
            id: device.deviceId,
            name: device.label
          });

        }

      });

      for (let i = 0; i < arraysOption.length; i++) {
        if (camsExistentes.includes(arraysOption[i].id)) {
          arraysOption.splice(i, 1);
          i--; // Disminuir el contador para ajustar el índice después de eliminar un elemento
        }
      }

      // console.log('arraysOption ELIMINADO', arraysOption)

      arraysOption.forEach(cam => {

        let opcion = document.createElement("option");
        opcion.text = cam.name;
        opcion.value = cam.id; 
        selectcam.appendChild(opcion);
    
      });

      // console.log('objectCams', arraysOption)

    })
    .catch(error => {
      console.error('Error enumerating devices:', error);
    });

}

window.addEventListener('load',cargarOption,false);




