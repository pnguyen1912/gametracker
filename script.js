
const video = document.getElementById('video');
async function startCapture() {
  let captureStream = null;
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia();
  } catch (err) {
    console.error("Error: " + err);
  }
  video.srcObject = captureStream
  return captureStream;
}
startCapture()
let timerId = null;
const doOCR = async () => {
  const c = document.createElement('canvas');
  c.width = 40;
  c.height = 10;
  c.getContext('2d').drawImage(video, 1100, 1070, 40, 10, 0, 0, 40, 10);
  let imgData = c.getContext('2d').getImageData(10, 5, 1, 1)
  red = imgData.data[0];
  green = imgData.data[1];
  blue = imgData.data[2];
  alpha = imgData.data[3];
  let color = red + green + blue + alpha

  if (color === 770) {
    console.log('X ready')
  } else {
    console.log('Kill more')
  }

  document.body.append(c)
};

video.addEventListener('play', () => {
  timerId = setInterval(doOCR, 300);
});
video.addEventListener('pause', () => {
  clearInterval(timerId);
});