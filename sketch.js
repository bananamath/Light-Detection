let classifier;

let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/model.json';

let video;
let flippedVideo;

let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(320, 260);

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)

  classifyVideo();
}

function draw() {
  background(0);

  image(flippedVideo, 0, 0);


  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}


function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}


function gotResult(error, results) {

  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;

  classifyVideo();
}
