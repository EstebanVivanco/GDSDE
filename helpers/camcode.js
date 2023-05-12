// "beeb11c69da92e16f06d70003de0ee4c090ed7a995377e95dae15e3ec04e94a1"
// "e017938e6b4ec457942a2eb323f7fde14f89aa5ec3e692785d9b7ab9e37c6381"

navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        console.log('Camera ID:', device.deviceId);
      }
    });
  })
  .catch(error => {
    console.error('Error enumerating devices:', error);
  });


function startup() {
    const camcode = document.getElementsByName('camcodes');
    const cards = document.querySelectorAll('.camera-card');
  
    for (let i = 0; i < camcode.length; i++) {
      const id = camcode[i].value;
  
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { 
          width: 445, 
          height: 250,
          deviceId: { exact: id }
        }
      })
      .then((stream) => {
        const video = document.createElement('video');
        video.id = id;
        video.autoplay = true;
        video.srcObject = stream;
  
        // encuentra el contenedor del card correspondiente utilizando el atributo data-id
        const cardContainer = document.querySelector(`[data-id="${id}"]`);
  
        // encuentra el contenedor de video del card correspondiente
        const videoContainer = cardContainer.querySelector(`#containerv_${id}`);
  
        // agrega el elemento de video al contenedor de video del card correspondiente
        videoContainer.appendChild(video);
      })
      .catch(console.error);
    }
  }
  

window.addEventListener('load',startup,false);