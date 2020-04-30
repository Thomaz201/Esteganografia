var hideimage = null;
var firstimage = null;
var mystimage = null;
var secretimage = null;
var outputimage = null;
var canvas1 = document.getElementById("can1");
var canvas2 = document.getElementById("can2");
var canoutput = document.getElementById("canvasoutput");
var canvas4 = document.getElementById("can4");
var canvas5 = document.getElementById("can5");

function upload1(){
  var filename = document.getElementById("finput");
  firstimage = new SimpleImage(filename);
  firstimage.drawTo(canvas1);
}

function upload2(){
  var filename = document.getElementById("finput2");
  hideimage = new SimpleImage(filename);
  hideimage.drawTo(canvas2);
}

function firstimagefunc(image){
  for(var pixel of image.values()){
    pixel.setRed(Math.floor(pixel.getRed()/16)*16);
    pixel.setGreen(Math.floor(pixel.getGreen()/16)*16);
    pixel.setBlue(Math.floor(pixel.getBlue()/16)*16);
  }
  return image;
}

function hideimagefunc(image){
  for(var pixel of image.values()){
    pixel.setRed(Math.floor(pixel.getRed()/16));
    pixel.setGreen(Math.floor(pixel.getGreen()/16));
    pixel.setBlue(Math.floor(pixel.getBlue()/16));
  }
  return image;
}

function dohide(){
  if(firstimage === null || ! firstimage.complete()){
    alert("Show image not loaded!");
    return;
  }
  if(hideimage === null || ! hideimage.complete()){
    alert("Image to hide not loaded!");
    return;
  }
  hideimage.setSize(firstimage.getWidth(),firstimage.getHeight());
  outputimage = new SimpleImage(firstimage.getWidth(),firstimage.getHeight());
  hideimagefunc(hideimage);
  firstimagefunc(firstimage);
  for(var pixel of outputimage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var pix1 = firstimage.getPixel(x,y);
    var pix2 = hideimage.getPixel(x,y);
    pixel.setRed(pix1.getRed()+pix2.getRed());
    pixel.setGreen(pix1.getGreen()+pix2.getGreen());
    pixel.setBlue(pix1.getBlue()+pix2.getBlue());
  }
  outputimage.drawTo(canoutput);
}

function upload3(){
  var filename = document.getElementById("finput3");
  mystimage = new SimpleImage(filename);
  mystimage.drawTo(canvas4);
}
 
function moddopixel(image){
   for(var pixel of image.values()){
     pixel.setRed(Math.floor(pixel.getRed()%16)*16);
     pixel.setGreen(Math.floor(pixel.getGreen()%16)*16);
     pixel.setBlue(Math.floor(pixel.getBlue()%16)*16);
   }
   return image;
 }

function douncover(){
  secretimage = new SimpleImage(mystimage.getWidth(),mystimage.getHeight());
  moddopixel(mystimage);
  for(var pixel of secretimage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var pix1 = mystimage.getPixel(x,y);
    pixel.setRed(pix1.getRed());
    pixel.setGreen(pix1.getGreen());
    pixel.setBlue(pix1.getBlue());
  }
  secretimage.drawTo(canvas5);
}

