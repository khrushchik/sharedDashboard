
var socket;

let r = 255;
let g = 255;
let b = 255;
let reset = 0;
let Size = 15;
let lineWeight = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawUi();
   socket = io.connect('http://localhost:3000');
    socket.on('mouse',
   function(data){
    r=data.r; g=data.g; b=data.b;
    reset = data.reset; lineWeight=data.lineWeight;
    drawLine(data.x,data.y,data.px,data.py,data.lineWeight);
  });
}

function draw() {

if (mouseIsPressed) {
  if (mouseX > 25 && mouseX < 65 && mouseY > 60 && mouseY < 100) {
    r = 48;
    g = 70;
    b = 111;
    lineWeight = 2;
    reset=0;
  }
  if (mouseX > 75 && mouseX < 115 && mouseY > 60 && mouseY < 100) {
    r = 246;
    g = 60;
    b = 87;
    lineWeight = 2;
    reset=0;
    
  }
    if (mouseX > 25 && mouseX < 65 && mouseY > 110 && mouseY < 150) {
    r = 241;
    g = 196;
    b = 15;
    lineWeight = 2;
    reset=0;
  }
  if (mouseX > 75 && mouseX < 115 && mouseY > 110 && mouseY < 150) {
    r = 40;
    g = 174;
    b = 27;
    lineWeight = 2;
    reset=0;
    
  }
  if (mouseX > 40 && mouseX < 100 && mouseY > 260 && mouseY < 290) {
    r = 255;
    g = 255;
    b = 255;
    reset=1;
  }
  if (mouseX > 20 && mouseX < 40 && mouseY > 195 && mouseY < 215)  {
    lineWeight = 5;
  }
  if (mouseX > 40 && mouseX < 70 && mouseY > 70 && mouseY < 230)  {
    lineWeight = 15;
  }
  if (mouseX > 60 && mouseX < 100 && mouseY > 185 && mouseY < 225)  {
    lineWeight = 20;
  }
  if(mouseX > 40 && mouseX < 100 && mouseY > 330 && mouseY < 360){
     background(255,255,255);
      drawUi();
     }

  else if (mouseX > 141 && pmouseX >141 ){
   drawLine(mouseX,mouseY,pmouseX,pmouseY,lineWeight);
   emitsocket(mouseX,mouseY,pmouseX,pmouseY,lineWeight);
  }
  }
}
function drawLine(mouseX,mouseY,pmouseX,pmouseY,lineWeight){
  if(reset ==0){
    stroke(r,g,b);
    strokeWeight(lineWeight);
    line(mouseX, mouseY, pmouseX, pmouseY,lineWeight);
  }
  else if(reset==1){
    noStroke();
    fill(255);
    ellipse(mouseX,mouseY,40,40);
  }
}

function emitsocket(mouseX, mouseY){
   var data = {
    x : mouseX,
    y : mouseY,
    px: pmouseX,
    py: pmouseY,
    r:r,
    g:g,
    b:b,
    reset:reset,
    lineWeight:lineWeight
  };
  socket.emit('mouse', data);
}

function drawUi() {

   //Color Selection
    noStroke();
  textSize(18);
  text("Color", 25, 50);

  //Blue  Button 
  fill(48, 70, 111);
  noStroke();
  rect(25, 60, 40, 40);

  //Red Button
  fill(246, 60, 87);
  noStroke();
  rect(75, 60, 40, 40);

  //Yellow Button
  fill(241, 196, 15);
  noStroke();
  rect(25, 110, 40, 40);

  //Green Button
  fill(40, 174, 27);
  noStroke();
  rect(75, 110, 40, 40);
    
  //Brush Params
  fill(0);
  textSize(18);
  text("Brush", 25, 180);
  fill(150);
  noStroke();
  ellipse(30, 205, 5, 5); //5px brush
  ellipse(55, 205, 15, 15); //15px brush
  ellipse(80, 205, 20, 20); //20px brush

  //Eraser Button
  fill(0);
  text("Erase", 25, 250);
  fill(247, 200, 194);
  rect(25, 260, 60, 30);
    
  //Clear Button
  fill(0);
  text("Clear all", 25, 320);
  fill(0,0,0);
  rect(25,330,60,30);
}