require('dotenv').config()
import * as faceapi from 'face-api.js';
let classes = ["rakib", "amy", "leonard"]
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './commons';
import { func } from '@tensorflow/tfjs-data';
//import {createBbtFaceMatcher} from "./controllers/bbt"
let final = [];
const path = require('path')
const REFERENCE_IMAGE = './images/bbt6.jpg';
const QUERY_IMAGE = './images/bbt3.jpg';
import { getFaceDetectorOptions, isFaceDetectionModelLoaded, getCurrentFaceDetectionNet } from "./controllers/faceDetectionControls";
import { Dirent } from 'fs';
const express = require("express");
const fs = require("fs")
const app = express();
const moveFile = require('move-file');
var bodyParser = require('body-parser')
let faceMatcher = null;
var mongoose = require('mongoose');
mongoose.connect('mongodb://therowf:Abc9980@ds061681.mlab.com:61681/rakibnaiot', {useNewUrlParser: true});

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './views');
const fileUpload = require("express-fileupload");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'uploads/'
}));
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './images')))
app.use(express.static(path.join(__dirname, './media')))
app.use(express.static(path.join(__dirname, './weights')))
app.use(express.static(path.join(__dirname, './dist')))
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json({ limit: "50mb" });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected")
});



var logSchema = new mongoose.Schema({
  time: Date
});


var Now = mongoose.model('logSchema', logSchema);



app.get("/", (req, res) => {
  updateResults(QUERY_IMAGE)
  updateExtraction(QUERY_IMAGE)
  
var silence = new Now({ time: new Date() });


silence.save(function (err, silence) {
  if (err) return console.error(err);
  console.log(silence.time); // 'Silence'
});
res.render("process");
})

var person = { time: Date.now(), name: {} }

app.get("/s", (req, res) => {


  updateResults(QUERY_IMAGE)
  updateExtraction(QUERY_IMAGE)
  res.render("process");

})


app.post("/r", jsonParser, (req, res) => {

  updateResults(req.body.img)

  res.json({ status: person })
})

app.get("/models", (req,res)=>{
  classes= []
  fs.readdir("./images", { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)
    files
      .filter(d => d.isDirectory())
      .map((m, i, c) =>{
         classes.push(m.name)
        if(i+1===c.length){
          res.send({classes})
        }
        })
  })
run2()

})


app.post("/extract", async(req, res) => {
 

let tmpPath, model, dir, newPath, i=0;
 
    for (let file in req.files){
      if(i<5){
      i++;
       tmpPath = req.files[file].tempFilePath;
       model = req.body.model
       dir = "./images/"+model
       newPath = "./images/"+model+"/"+model+i + ".png";

      await moveFile(tmpPath, newPath);
      let bitw = await updateExtraction(newPath)
  
    var base64 = bitw;
    saveFile("./images/"+model+"/"+model+i + ".png", Buffer.from(base64.replace(/^data:image\/png;base64,/, ""), 'base64'))
  }else{
    null
  }
    }
    

      res.send("ok")
 

})

run2()




function getFaceImageUri(className, idx) {
  return `./images/${className}/${className}${idx}.png`
}
async function createBbtFaceMatcher(numImagesForTraining = 5) {
  const maxAvailableImagesPerClass = 5
  numImagesForTraining = Math.min(numImagesForTraining, maxAvailableImagesPerClass)

  const labeledFaceDescriptors = await Promise.all(classes.map(
    async className => {
      const descriptors = []
      for (let i = 1; i <= (numImagesForTraining + 1); i++) {
        const img = await canvas.loadImage(getFaceImageUri(className, i))

        descriptors.push(await faceapi.computeFaceDescriptor(img))
      }

      return new faceapi.LabeledFaceDescriptors(
        className,
        descriptors
      )
    }
  ))

  return new faceapi.FaceMatcher(labeledFaceDescriptors)
}

async function updateResults(img) {
  if (!isFaceDetectionModelLoaded) {
    console.log(9999)
  }

  const inputImgEl = await canvas.loadImage(img)

  const options = getFaceDetectorOptions
  const results = await faceapi
    .detectAllFaces(inputImgEl, options)
    .withFaceLandmarks()
    .withFaceDescriptors()
  drawFaceRecognitionResults(results, img)
}


async function drawFaceRecognitionResults(results, img) {
  // const canvas = $('#showlbl').get(0)
  // const inputImgEl = $('#inputImg').get(0)
  const inputImgEl = await canvas.loadImage(img)

  //faceapi.matchDimensions(canvas, inputImgEl)
  // resize detection and landmarks in case displayed image is smaller than
  // original size
  const resizedResults = faceapi.resizeResults(results, inputImgEl)

  resizedResults.forEach(({ detection, descriptor }) => {
    const label = faceMatcher.findBestMatch(descriptor).toString()
    const options = { label }
    person.name = options;
    console.log(options)
    // const drawBox = new faceapi.draw.DrawBox(detection.box, options)
    // drawBox.draw(canvas)
  })
}


async function run2() {
  // load face detection, face landmark model and face recognition models
  // await fdc.changeFaceDetector()
  await faceDetectionNet.loadFromDisk('./weights');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights');
  await getCurrentFaceDetectionNet.loadFromDisk('./weights')
  // initialize face matcher with 1 reference descriptor per bbt character
  faceMatcher = await createBbtFaceMatcher(1)

  // start processing image
  updateResults(REFERENCE_IMAGE)

  updateExtraction(REFERENCE_IMAGE)
}

var grayscale = function (canvas) {
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};



async function updateExtraction(img) {
  if (!isFaceDetectionModelLoaded) {
    console.log(777)
  }

  const inputImgEl = await canvas.loadImage(img)
  const options = getFaceDetectorOptions

  const detections = await faceapi.detectAllFaces(inputImgEl, options)
  const faceImages = await faceapi.extractFaces(inputImgEl, detections)
if(faceImages[0]){
  grayscale(faceImages[0])
   return faceImages[0].toDataURL("image/png");
}

console.log(faceImages)
   
 //grayscale(c)
   //displayExtractedFaces(faceImages, img)
  
}



//  function displayExtractedFaces(faceImages, img) {
//   const cnvs = canvas.createCanvas(150, 150)
//   const ctx = cnvs.getContext('2d')

//    faceapi.matchDimensions(ctx,  img)
// console.log(faceImages)
//   faceImages.forEach((c, i, a) => {
//     grayscale(c)
//     final.push(c.toDataURL("image/png"))
//     console.log(i, a.length)
//     if (i + 1 === a.length) {
//       console.log(final)
//       return final;
//     }
//   })
// }




app.listen(process.env.PORT || 5000), err => console.log("app is listening 5000");

