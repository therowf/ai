require('dotenv').config()
import * as faceapi from 'face-api.js';
let classes = ["amy", "therowf", "leonard", "penny", "raj", "bernadette"]
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './commons';

import * as yolo from 'tfjs-tiny-yolov2';
//import {createBbtFaceMatcher} from "./controllers/bbt"
let final = [];
const util = require('util');
const path = require('path')
var cors = require('cors');
var whitelist = ['http://localhost:5000','http://localhost:'+process.env.PORT,  'http://runapro.com']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const REFERENCE_IMAGE = './images/bbt6.jpg';
const QUERY_IMAGE = './images/bbt3.jpg';
import { getFaceDetectorOptions, isFaceDetectionModelLoaded, getCurrentFaceDetectionNet } from "./controllers/faceDetectionControls";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const canvas2 = require("canvas");
const { Canvas, Image, ImageData } = canvas2
yolo.env.monkeyPatch({ Canvas, Image, ImageData })
const express = require("express");
const fs = require("fs")
const readFile = util.promisify(fs.readFile);
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
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json({ limit: "50mb" });
// app.use(cors(corsOptions))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected")
  run2()
});



var logSchema = new mongoose.Schema({
  time: Date
});


var Now = mongoose.model('logSchema', logSchema);

var net;


app.get("/", (req, res) => {
  run2()
  updateResults(QUERY_IMAGE)
 // updateExtraction(QUERY_IMAGE, "null", 0)
res.render("index");
})
var person = { time: Date.now(), name: {} }
var frontEnd = {result:[]}
/*

app.get("/see", (req, res) => {
res.render("process");
})



app.get("/s", (req, res) => {


  updateResults(QUERY_IMAGE)
 // updateExtraction(QUERY_IMAGE, "null", 0)
  res.render("process");

})




app.get("/models", (req,res)=>{
  res.send({classes})
          run2()
  

})

app.get("/n", (req,res)=>{
  var silence = new Now({ time: new Date() });


silence.save(function (err, silence) {
  if (err) return console.error(err);
  console.log(silence.time); // 'Silence'
});
res.send("100 ko")
});
app.post("/extract", async(req, res) => {

   let tmpPath;
   let model;
    let dir;
    let newPath;
    let i=0;
 //console.log(req.files)
    
 
 for (var file in req.files) {
  // skip loop if the property is from prototype
  if (!req.files.hasOwnProperty(file)) continue;
i++;
  var obj =  await file;
  

       tmpPath = req.files[obj].tempFilePath;
      
       model = req.body.model
       dir = "./images/"+model
       newPath = "./images/"+model+"/"+model+i + ".png";

       moveFile(tmpPath, newPath);
     updateExtraction(newPath, model, i)
  
 
      
 }


   


    



     res.send("ok")
 

})


*/

app.post("/r", cors(corsOptions), jsonParser, (req, res) => {
  //
    updateResults(req.body.img)
    res.json({ status: frontEnd })
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
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
async function updateResults(img) {
  if (!isFaceDetectionModelLoaded) {
    console.log("-------")
  }

  const inputImgEl = await canvas.loadImage(img)
  const inputImgEl2 = await canvas2.loadImage(img)

  let fp = {inputSize: 416, scoreThreshold: 0.5}


  const detections = await net.detect(inputImgEl2, fp)
  console.log(detections)
  //yolo.drawDetection('overlay', detections.map(det => det.forSize(width, height), { color: 'red' }))



  const options = await getFaceDetectorOptions
  const results = await faceapi
    .detectAllFaces(inputImgEl, options)
    .withFaceLandmarks()
    .withAgeAndGender()
    .withFaceDescriptors()
    .withFaceExpressions()
drawFaceRecognitionResults(results, img)
}


async function drawFaceRecognitionResults(results, img) {
  // const canvas = $('#showlbl').get(0)
  // const inputImgEl = $('#inputImg').get(0)
  const inputImgEl = await canvas.loadImage(img)
  frontEnd.result = []
  results.forEach(element => {
   console.log("gender :", element.gender)
   console.log("age :", element.age)
   console.log("express :", element.expressions)
    frontEnd.result.push({
      age:element.age, 
      gender: element.gender,
      sad: element.expressions.sad,
    angry:element.expressions.angry,
  happy:element.expressions.happy})
  });

  //faceapi.matchDimensions(canvas, inputImgEl)
  // resize detection and landmarks in case displayed image is smaller than
  // original size
  const resizedResults = await faceapi.resizeResults(results, inputImgEl)
  let totRes = []
  let ind = 0;
  console.log(resizedResults.length, " persons been detected")
  resizedResults.forEach(async({ detection, descriptor }) => {

    let discript = await descriptor;

    const label = await faceMatcher.findBestMatch(discript).toString()
    const options = { label }

   totRes.push(options)
   if(resizedResults.length===ind+1){
    person.name = totRes;
   }
   ind++;
    
    // const drawBox = new faceapi.draw.DrawBox(detection.box, options)
    // drawBox.draw(canvas)
  })
}


async function run2() {
  classes= []
  fs.readdir("./images", { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)
    files
      .filter(d => d.isDirectory())
      .map((m, i, c) =>{
         classes.push(m.name)
        if(i+1===c.length){
          
        }
        })
  })

  // load face detection, face landmark model and face recognition models
  // await fdc.changeFaceDetector()
  await faceDetectionNet.loadFromDisk('./weights');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights');
  await getCurrentFaceDetectionNet.loadFromDisk('./weights')
  await faceapi.nets.ageGenderNet.loadFromDisk('./weights')
  await faceapi.nets.faceExpressionNet.loadFromDisk('./weights')
  // initialize face matcher with 1 reference descriptor per bbt character
  faceMatcher = await createBbtFaceMatcher(1)


  function getStuff(path) {
    return readFile(path);
  }
  const config = await getStuff("./models/voc_model_config.json")
  net = new yolo.TinyYolov2(JSON.parse(config))
  await net.loadFromDisk(`./models/voc_model-weights_manifest.json`)
  // start processing image
  updateResults(QUERY_IMAGE)

 // updateExtraction(REFERENCE_IMAGE, "null", 0)
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



async function updateExtraction(img, model, i) {
  if (!isFaceDetectionModelLoaded) {
    console.log(777)
  }

  const inputImgEl = await canvas.loadImage(img)
  const options = getFaceDetectorOptions

  const detections = await faceapi.detectAllFaces(inputImgEl, options)
  const faceImages = await faceapi.extractFaces(inputImgEl, detections)
if(faceImages[0]){
  grayscale(faceImages[0])
    

       var base64 = faceImages[0].toDataURL("image/png");
 saveFile("./images/"+model+"/"+model+i + ".png", Buffer.from(base64.replace(/^data:image\/png;base64,/, ""), 'base64'))

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

