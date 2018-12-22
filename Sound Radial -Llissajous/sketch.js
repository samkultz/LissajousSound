var song;
var amp;
var smoo = 0;




function preload() {
  song = loadSound('Voice_20181204_150403.mp3');
}

var volhistory = [];

function mousePressed() {
  if(mouseX > lisaY.width+lisaY.x+5 || mouseY > lisaY.height+lisaY.y+5){
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
}


function keyTyped() {
  if (key === 's') {
    song.stop();
    song.play();
  }
}




function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);


  // lerpa
  lerptylerp = createSlider(0,1, .05,.001);
  lerptylerp.position(20,20)
  //comprimento
  cmp = createSlider(0,360*3, 360,1);
  cmp.position(20,50);
  //lissajoux
  lisaX = createSlider(-10,10, 1,.5);
  lisaX.position(20,80);
  lisaY = createSlider(-10,10, 1,.5);
  lisaY.position(20,110);

  song.play();
  amp = new p5.Amplitude();

}

function draw() {
  strokeWeight(10);
  background(0);

  noFill();

  var vol = amp.getLevel();
  //lerptylerp - define o smoothing do gráfico
  smoo = lerp(smoo, vol, lerptylerp.value());
  volhistory.push(smoo);


  translate(width / 2, height / 2);

  noFill();
  stroke(255);
  strokeWeight(2);
  // noStroke();

  //número de voltas
  vlts = 1 * 360

  var hu = 0;

  beginShape();
  for (var i = 0; i < cmp.value(); i++) {


    var r = map(volhistory[i], 0, 1, 10, height);
    var x = r * cos(i*lisaX.value());
    var y = r * sin(i*lisaY.value());
    vertex(x, y);

    // hu = map(volhistory[i], 0,1, 0,255);
    // fill(hu, 255, 255);

  }
  if(volhistory.length < cmp.value()){
    endShape();
  }

  else{
    // colocar como CLOSE caso queira a linha que une o início ao fim.
    endShape();
    volhistory.splice(0, 1);
  }

  fill(255);
  ellipse(0,0, 2);
}
