const faceapi = require('face-api.js');


SSD_MOBILENETV1 = 'ssd_mobilenetv1';
TINY_FACE_DETECTOR = 'tiny_face_detector';
selectedFaceDetector = SSD_MOBILENETV1;

// ssd_mobilenetv1 options
minConfidence = 0.9;


// tiny_face_detector options
inputSize = 512;
scoreThreshold = 0.5;












function getFaceDetectorOptions() {
  return selectedFaceDetector === SSD_MOBILENETV1 ?
    new faceapi.SsdMobilenetv1Options({
      minConfidence: minConfidence
    }) :
    new faceapi.TinyFaceDetectorOptions({
      inputSize: inputSize,
      scoreThreshold: scoreThreshold
    })
}





function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1;
  }
  if (selectedFaceDetector === TINY_FACE_DETECTOR) {
    return faceapi.nets.tinyFaceDetector;
  }
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function changeFaceDetector() {

  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().loadFromDisk('../weights');
  }


}

exports.isFaceDetectionModelLoaded = isFaceDetectionModelLoaded();
exports.getFaceDetectorOptions = getFaceDetectorOptions();
exports.getCurrentFaceDetectionNet = getCurrentFaceDetectionNet();
