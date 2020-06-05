
const loadImage = url => new Promise(resolve => {
  const image = new Image();
  image.src = url;
  image.onload = () => resolve(image);
});
Promise.all([
  loadImage('sky.png'),
  loadImage('rocket.png'),
  loadImage('mars.png'),
  loadImage('earth.png'),
  loadImage('enemy.png'),
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
 class EnemyShip extends Rect
 {
   constructor()
   {
      super(50, 20);

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
    this.enemyShip = new EnemyShip();
    this.enemyShip.pos.x = 450;
    this.enemyShip.pos.y = 250;
    this.enemyShip2 = new EnemyShip();
    this.enemyShip2.pos.x = 250;
    this.enemyShip2.pos.y = 250;
    this.enemyShip3 = new EnemyShip();
    this.enemyShip3.pos.x = 850;
    this.enemyShip3.pos.y = 250;
    this.enemyShip4 = new EnemyShip();
    this.enemyShip4.pos.x = 1050;
    this.enemyShip4.pos.y = 250;
    
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
    //CHECK IF BACKROUND IS CLEAR!!!
    //this._context.fillStyle = '#000';
    //this._context.fillRect(0,0, this._canvas.width, this._canvas.height);
    this._context.drawImage(images[0], 0, 0, this._canvas.width, this._canvas.height);
    
    
    this.drawMars(this.mars);
    this.drawEarth(this.earth);
    this.drawEnemyShip(this.enemyShip);
    this.drawEnemyShip(this.enemyShip2);
    this.drawEnemyShip(this.enemyShip3);
    this.drawEnemyShip(this.enemyShip4);
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
  drawEnemyShip(rect)
  {
    this._context.drawImage(images[4], rect.left, rect.top, rect.size.x, rect.size.y);
  }
  
  update() {
    //console.log(gameOver);
    if (gameOver === false){
    timeRemaining = timeRemaining - 0.015;
    displayResults();
     if(this.rocket.bottom > this.earth.top && this.rocket.top < this.earth.bottom && this.rocket.right > this.earth.left && this.rocket.left < this.earth.right ) {
      cargo = true;
      cargoFill = "full";
      displayResults();
    }
    }
    if (timeRemaining <= 1){
      gameOver = true;
      displayResults();
    }
    if (this.rocket.pos.y < 0){
        this.rocket.pos.y = this._canvas.height;
        }
    if (this.rocket.pos.y > this._canvas.height){
        this.rocket.pos.y = 0;
        }
    if (this.rocket.pos.x < 0){
        this.rocket.pos.x = this._canvas.width;
        }
    if (this.rocket.pos.x > this._canvas.width){
        this.rocket.pos.x = 0;
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
   if(this.rocket.bottom > this.enemyShip.top && this.rocket.top < this.enemyShip.bottom && this.rocket.right > this.enemyShip.left && this.rocket.left < this.enemyShip.right ) {
      timeRemaining = 0;
    }
  if(this.rocket.bottom > this.enemyShip2.top && this.rocket.top < this.enemyShip2.bottom && this.rocket.right > this.enemyShip2.left && this.rocket.left < this.enemyShip2.right ) {
      timeRemaining = 0;
    }
  if(this.rocket.bottom > this.enemyShip3.top && this.rocket.top < this.enemyShip3.bottom && this.rocket.right > this.enemyShip3.left && this.rocket.left < this.enemyShip3.right ) {
      timeRemaining = 0;
    }
  if(this.rocket.bottom > this.enemyShip4.top && this.rocket.top < this.enemyShip4.bottom && this.rocket.right > this.enemyShip4.left && this.rocket.left < this.enemyShip4.right ) {
      timeRemaining = 0;
    }
    this.draw();
    
    if (gameOver === false){
     document.onkeydown = checkKey;
    }else{
      document.onkeydown = null;
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



function randomPlanetPos(){
  SPACEXPLORERS.mars.pos.x = Math.floor(Math.random() * 1200)+ 50;
  SPACEXPLORERS.earth.pos.x = Math.floor(Math.random() *1200)+ 50;
  SPACEXPLORERS.mars.pos.y = Math.floor(Math.random() * 400) +50 ;
  SPACEXPLORERS.earth.pos.y = Math.floor(Math.random() *400) +50;
  SPACEXPLORERS.enemyShip.pos.x = Math.floor(Math.random() *1200) +50;
  SPACEXPLORERS.enemyShip.pos.y = Math.floor(Math.random() *400) +50;
  SPACEXPLORERS.enemyShip2.pos.x = Math.floor(Math.random() *1200) +50;
  SPACEXPLORERS.enemyShip2.pos.y = Math.floor(Math.random() *400) +50;
  SPACEXPLORERS.enemyShip3.pos.x = Math.floor(Math.random() *1200) +50;
  SPACEXPLORERS.enemyShip3.pos.y = Math.floor(Math.random() *400) +50;
  SPACEXPLORERS.enemyShip4.pos.x = Math.floor(Math.random() *1200) +50;
  SPACEXPLORERS.enemyShip4.pos.y = Math.floor(Math.random() *400) +50;
  if(SPACEXPLORERS.rocket.bottom > SPACEXPLORERS.enemyShip.top && SPACEXPLORERS.rocket.top < SPACEXPLORERS.enemyShip.bottom && SPACEXPLORERS.rocket.right > SPACEXPLORERS.enemyShip.left && SPACEXPLORERS.rocket.left < SPACEXPLORERS.enemyShip.right ) {
      randomPlanetPos();
    }
  if(SPACEXPLORERS.rocket.bottom > SPACEXPLORERS.enemyShip2.top && SPACEXPLORERS.rocket.top < SPACEXPLORERS.enemyShip2.bottom && SPACEXPLORERS.rocket.right > SPACEXPLORERS.enemyShip2.left && SPACEXPLORERS.rocket.left < SPACEXPLORERS.enemyShip2.right ) {
      randomPlanetPos();
    }
  if(SPACEXPLORERS.rocket.bottom > SPACEXPLORERS.enemyShip3.top && SPACEXPLORERS.rocket.top < SPACEXPLORERS.enemyShip3.bottom && SPACEXPLORERS.rocket.right > SPACEXPLORERS.enemyShip3.left && SPACEXPLORERS.rocket.left < SPACEXPLORERS.enemyShip3.right ) {
      randomPlanetPos();
    }
  if(SPACEXPLORERS.rocket.bottom > SPACEXPLORERS.enemyShip4.top && SPACEXPLORERS.rocket.top < SPACEXPLORERS.enemyShip4.bottom && SPACEXPLORERS.rocket.right > SPACEXPLORERS.enemyShip4.left && SPACEXPLORERS.rocket.left < SPACEXPLORERS.enemyShip4.right ) {
      randomPlanetPos();
    }
  

}
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function resetGame(){
  cargo = false;
  cargoFill ="empty";
  prevScore = 0;
  gameOver = true;
  timeRemaining = 60;
  displayResults();
  SPACEXPLORERS.rocket.pos.x = 650;
  SPACEXPLORERS.rocket.pos.y = 250;
  SPACEXPLORERS.earth.pos.x = 650;
  SPACEXPLORERS.earth.pos.y = 425;
  SPACEXPLORERS.enemyShip.pos.x = 450;
  SPACEXPLORERS.enemyShip.pos.y = 250;
  SPACEXPLORERS.enemyShip2.pos.x = 250;
  SPACEXPLORERS.enemyShip2.pos.y = 250;
  SPACEXPLORERS.enemyShip3.pos.x = 850;
  SPACEXPLORERS.enemyShip3.pos.y = 250;
  SPACEXPLORERS.enemyShip4.pos.x = 1050;
  SPACEXPLORERS.enemyShip4.pos.y = 250;
  SPACEXPLORERS.mars.pos.x = 650;
  SPACEXPLORERS.mars.pos.y = 75;
 
}
function startGame(){
  if(timeRemaining === 60){
  cargo = false;
  prevScore = 0;
  gameOver = false;
  timeRemaining = 61;
  }
}


function displayResults(){
document.getElementById("Results").innerHTML = "Score:"+ prevScore + " Top Score:"+ topScore +" Cargo:" + cargoFill + " Time:" + Math.floor(timeRemaining) +"s";

}

});
