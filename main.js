
const loadImage = url => new Promise(resolve => {
  const image = new Image();
  image.src = url;
  image.onload = () => resolve(image);
});
Promise.all([
  loadImage('sky.png'),
  loadImage('rocket.png'),
  loadImage('mars.png'),
  loadImage('earth.png')
  ]).then(function main(images) {
 
var cargo = false;
var prevScore = 0;
var topScore = 0;
var gameOver = true;
var timeRemaining = 60;
var cargoFill = "empty";

displayResults();

    class Vec
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }
}

class Rect
{
  constructor(w, h)
  {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left()
  {
    return this.pos.x - this.size.x / 2;
  }
  get right()
  {
    return this.pos.x + this.size.x / 2;
  }
  get top()
  {
    return this.pos.y - this.size.y / 2;
  }
  get bottom()
  {
    return this.pos.y + this.size.y / 2;
  }
}

class Rocket extends Rect
{
  constructor()
  {
    super(20,50);
 
  }
}
class Planet extends Rect
 {
   constructor()
   {
      super(100, 100);

   }
 }
 class spaceXplorers
{
  constructor(canvas)
  {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this.rocket = new Rocket();
    this.rocket.pos.x = 650;
    this.rocket.pos.y = 250;
    this.mars = new Planet();
    this.earth = new Planet();
    this.earth.pos.x = 650;
    this.earth.pos.y = 425;
    this.mars.pos.x = 650;
    this.mars.pos.y = 75;
    
    let lastTime;
    const callback = (millis) => {
        if (lastTime) {
          this.update((millis - lastTime) / 1000);
        }
        lastTime = millis;
        requestAnimationFrame(callback);
      };
      callback();
  }
  draw(){
    //this._context.fillStyle = '#000';
    //this._context.fillRect(0,0, this._canvas.width, this._canvas.height);
    this._context.drawImage(images[0], 0, 0, this._canvas.width, this._canvas.height);
    
    
    this.drawMars(this.mars);
    this.drawEarth(this.earth);
    this.drawRocket(this.rocket);
  }
  drawRocket(rect)
    {
    //this._context.fillStyle = 'white';
    //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    this._context.drawImage(images[1], rect.left, rect.top, rect.size.x, rect.size.y);
    }
    //
  drawMars(rect)
    {
    //this._context.fillStyle = 'red';
   // this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
   this._context.drawImage(images[2], rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawEarth(rect)
    {
    //this._context.fillStyle = 'blue';
    //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    this._context.drawImage(images[3], rect.left, rect.top, rect.size.x, rect.size.y);
    }
  
  update() {
    //console.log(gameOver);
    if (gameOver === false){
    timeRemaining = timeRemaining - 0.015;
    displayResults();
    }
    if (timeRemaining <= 1){
      gameOver = true;
      displayResults();
    }
    if (this.rocket.pos.y < 0){
        this.rocket.pos.y = 0;
        }
    if (this.rocket.pos.y > this._canvas.height){
        this.rocket.pos.y = this._canvas.height;
        }
    if (this.rocket.pos.x < 0){
        this.rocket.pos.x = 0;
        }
    if (this.rocket.pos.x > this._canvas.width){
        this.rocket.pos.x = this._canvas.width;
        }
    if(this.rocket.bottom > this.earth.top && this.rocket.top < this.earth.bottom && this.rocket.right > this.earth.left && this.rocket.left < this.earth.right ) {
      cargo = true;
      cargoFill = "full";
      displayResults();
    }
    if(this.rocket.bottom > this.mars.top && this.rocket.top < this.mars.bottom && this.rocket.right > this.mars.left && this.rocket.left < this.mars.right && cargo===true){
     cargo = false;
     cargoFill = "empty";
     prevScore = prevScore +1;
     randomPlanetPos();
     displayResults();
     if (prevScore > topScore){
     topScore = prevScore;
     displayResults();
          }
      }
    this.draw();
    
    if (gameOver === false){
     document.onkeydown = checkKey;
    }else{
      document.onkeydown = checkKey2;
      }
    }
}
const canvas = document.getElementById('theCanvas');
const SPACEXPLORERS = new spaceXplorers(canvas);

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
      SPACEXPLORERS.rocket.pos.y = SPACEXPLORERS.rocket.pos.y -40;
    }
    else if (e.keyCode == '65') {
      SPACEXPLORERS.rocket.pos.x = SPACEXPLORERS.rocket.pos.x -40;
    }
    else if (e.keyCode == '83') {
      SPACEXPLORERS.rocket.pos.y = SPACEXPLORERS.rocket.pos.y +40;
    }
    else if (e.keyCode == '68') {
      SPACEXPLORERS.rocket.pos.x = SPACEXPLORERS.rocket.pos.x +40;
    }

  }
function checkKey2(e) {

    e = e || window.event;

    if (e.keyCode == '76') {
      resetGame();
    }
  }



function randomPlanetPos(){
  SPACEXPLORERS.mars.pos.x = Math.floor(Math.random() * 1300) ;
  
  SPACEXPLORERS.earth.pos.x = Math.floor(Math.random() *1300);

}


function resetGame(){
  cargo = false;
  prevScore = 0;
  gameOver = false;
  timeRemaining = 61;
  SPACEXPLORERS.earth.pos.x = 650;
  SPACEXPLORERS.earth.pos.y = 425;
  SPACEXPLORERS.mars.pos.x = 650;
  SPACEXPLORERS.mars.pos.y = 75;
  SPACEXPLORERS.rocket.pos.x = 650;
  SPACEXPLORERS.rocket.pos.y = 250;
}


function displayResults(){
document.getElementById("Results").innerHTML = "Score:"+ prevScore + " Top Score:"+ topScore +" Cargo:" + cargoFill + " Time:" + Math.floor(timeRemaining) +"s";

}

});
