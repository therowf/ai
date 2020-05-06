"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require('dotenv').config();
var faceapi = require("face-api.js");
var classes = ["amy", "therowf", "leonard", "penny", "raj", "bernadette"];
var commons_1 = require("./commons");
//import {createBbtFaceMatcher} from "./controllers/bbt"
var final = [];
var path = require('path');
var REFERENCE_IMAGE = './images/bbt6.jpg';
var QUERY_IMAGE = './images/bbt3.jpg';
var faceDetectionControls_1 = require("./controllers/faceDetectionControls");
var express = require("express");
var fs = require("fs");
var app = express();
var moveFile = require('move-file');
var bodyParser = require('body-parser');
var faceMatcher = null;
var mongoose = require('mongoose');
mongoose.connect('mongodb://therowf:Abc9980@ds061681.mlab.com:61681/rakibnaiot', { useNewUrlParser: true });
var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './views');
var fileUpload = require("express-fileupload");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'uploads/'
}));
app.use(express.static(path.join(__dirname, './public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json({ limit: "50mb" });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected");
    run2();
});
var logSchema = new mongoose.Schema({
    time: Date
});
var Now = mongoose.model('logSchema', logSchema);
app.get("/", function (req, res) {
    run2();
    updateResults(QUERY_IMAGE);
    // updateExtraction(QUERY_IMAGE, "null", 0)
    res.render("index");
});
var person = { time: Date.now(), name: {} };
var frontEnd = { result: [] };
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
app.post("/r", jsonParser, function (req, res) {
    //
    updateResults(req.body.img);
    res.json({ status: frontEnd });
});
run2();
function getFaceImageUri(className, idx) {
    return "./images/" + className + "/" + className + idx + ".png";
}
function createBbtFaceMatcher(numImagesForTraining) {
    if (numImagesForTraining === void 0) { numImagesForTraining = 5; }
    return __awaiter(this, void 0, void 0, function () {
        var maxAvailableImagesPerClass, labeledFaceDescriptors;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxAvailableImagesPerClass = 5;
                    numImagesForTraining = Math.min(numImagesForTraining, maxAvailableImagesPerClass);
                    return [4 /*yield*/, Promise.all(classes.map(function (className) { return __awaiter(_this, void 0, void 0, function () {
                            var descriptors, i, img, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        descriptors = [];
                                        i = 1;
                                        _c.label = 1;
                                    case 1:
                                        if (!(i <= (numImagesForTraining + 1))) return [3 /*break*/, 5];
                                        return [4 /*yield*/, commons_1.canvas.loadImage(getFaceImageUri(className, i))];
                                    case 2:
                                        img = _c.sent();
                                        _b = (_a = descriptors).push;
                                        return [4 /*yield*/, faceapi.computeFaceDescriptor(img)];
                                    case 3:
                                        _b.apply(_a, [_c.sent()]);
                                        _c.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/, new faceapi.LabeledFaceDescriptors(className, descriptors)];
                                }
                            });
                        }); }))];
                case 1:
                    labeledFaceDescriptors = _a.sent();
                    return [2 /*return*/, new faceapi.FaceMatcher(labeledFaceDescriptors)];
            }
        });
    });
}
function updateResults(img) {
    return __awaiter(this, void 0, void 0, function () {
        var inputImgEl, options, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!faceDetectionControls_1.isFaceDetectionModelLoaded) {
                        console.log("-------");
                    }
                    return [4 /*yield*/, commons_1.canvas.loadImage(img)];
                case 1:
                    inputImgEl = _a.sent();
                    return [4 /*yield*/, faceDetectionControls_1.getFaceDetectorOptions];
                case 2:
                    options = _a.sent();
                    return [4 /*yield*/, faceapi
                            .detectAllFaces(inputImgEl, options)
                            .withFaceLandmarks()
                            .withAgeAndGender()
                            .withFaceDescriptors()
                            .withFaceExpressions()];
                case 3:
                    results = _a.sent();
                    drawFaceRecognitionResults(results, img);
                    return [2 /*return*/];
            }
        });
    });
}
function drawFaceRecognitionResults(results, img) {
    return __awaiter(this, void 0, void 0, function () {
        var inputImgEl, resizedResults, totRes, ind;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commons_1.canvas.loadImage(img)];
                case 1:
                    inputImgEl = _a.sent();
                    frontEnd.result = [];
                    results.forEach(function (element) {
                        console.log("gender :", element.gender);
                        console.log("age :", element.age);
                        console.log("express :", element.expressions);
                        frontEnd.result.push({
                            age: element.age,
                            gender: element.gender,
                            sad: element.expressions.sad,
                            angry: element.expressions.angry,
                            happy: element.expressions.happy
                        });
                    });
                    return [4 /*yield*/, faceapi.resizeResults(results, inputImgEl)];
                case 2:
                    resizedResults = _a.sent();
                    totRes = [];
                    ind = 0;
                    console.log(resizedResults.length, " persons been detected");
                    resizedResults.forEach(function (_a) {
                        var detection = _a.detection, descriptor = _a.descriptor;
                        return __awaiter(_this, void 0, void 0, function () {
                            var discript, label, options;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, descriptor];
                                    case 1:
                                        discript = _b.sent();
                                        return [4 /*yield*/, faceMatcher.findBestMatch(discript).toString()];
                                    case 2:
                                        label = _b.sent();
                                        options = { label: label };
                                        totRes.push(options);
                                        if (resizedResults.length === ind + 1) {
                                            person.name = totRes;
                                        }
                                        ind++;
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function run2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classes = [];
                    fs.readdir("./images", { withFileTypes: true }, function (err, files) {
                        if (err)
                            console.log(err);
                        files
                            .filter(function (d) { return d.isDirectory(); })
                            .map(function (m, i, c) {
                            classes.push(m.name);
                            if (i + 1 === c.length) {
                            }
                        });
                    });
                    // load face detection, face landmark model and face recognition models
                    // await fdc.changeFaceDetector()
                    return [4 /*yield*/, commons_1.faceDetectionNet.loadFromDisk('./weights')];
                case 1:
                    // load face detection, face landmark model and face recognition models
                    // await fdc.changeFaceDetector()
                    _a.sent();
                    return [4 /*yield*/, faceapi.nets.faceLandmark68Net.loadFromDisk('./weights')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, faceapi.nets.faceRecognitionNet.loadFromDisk('./weights')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, faceDetectionControls_1.getCurrentFaceDetectionNet.loadFromDisk('./weights')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, faceapi.nets.ageGenderNet.loadFromDisk('./weights')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, faceapi.nets.faceExpressionNet.loadFromDisk('./weights')
                        // initialize face matcher with 1 reference descriptor per bbt character
                    ];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, createBbtFaceMatcher(1)
                        // start processing image
                    ];
                case 7:
                    // initialize face matcher with 1 reference descriptor per bbt character
                    faceMatcher = _a.sent();
                    // start processing image
                    updateResults(REFERENCE_IMAGE);
                    return [2 /*return*/];
            }
        });
    });
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
function updateExtraction(img, model, i) {
    return __awaiter(this, void 0, void 0, function () {
        var inputImgEl, options, detections, faceImages, base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!faceDetectionControls_1.isFaceDetectionModelLoaded) {
                        console.log(777);
                    }
                    return [4 /*yield*/, commons_1.canvas.loadImage(img)];
                case 1:
                    inputImgEl = _a.sent();
                    options = faceDetectionControls_1.getFaceDetectorOptions;
                    return [4 /*yield*/, faceapi.detectAllFaces(inputImgEl, options)];
                case 2:
                    detections = _a.sent();
                    return [4 /*yield*/, faceapi.extractFaces(inputImgEl, detections)];
                case 3:
                    faceImages = _a.sent();
                    if (faceImages[0]) {
                        grayscale(faceImages[0]);
                        base64 = faceImages[0].toDataURL("image/png");
                        commons_1.saveFile("./images/" + model + "/" + model + i + ".png", Buffer.from(base64.replace(/^data:image\/png;base64,/, ""), 'base64'));
                    }
                    console.log(faceImages);
                    return [2 /*return*/];
            }
        });
    });
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
app.listen(process.env.PORT || 5000), function (err) { return console.log("app is listening 5000"); };
