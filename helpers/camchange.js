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

      arraysOption.forEach(cam => {

        let opcion = document.createElement("option");
        opcion.text = cam.name;
        opcion.value = cam.id; 
        selectcam.appendChild(opcion);
    
      });


    })
    .catch(error => {
      console.error('Error enumerating devices:', error);
    });

}

window.addEventListener('load',cargarOption,false);




