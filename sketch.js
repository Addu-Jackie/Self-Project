var ground , groundImage;
var backgroundImage;
var man , manWalking;
var invisibleGround;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstaclesGroup;
var gameState ="play";
var score = 0;
function preload(){
	groundImage =loadImage("Images/ground2.png");
	manWalking =loadAnimation("Images/Walking Frame/walking_1.png","Images/Walking Frame/walking_2.png","Images/Walking Frame/walking_3.png","Images/Walking Frame/walking_4.png","Images/Walking Frame/walking_5.png","Images/Walking Frame/walking_6.png","Images/Walking Frame/walking_7.png","Images/Walking Frame/walking_8.png");
  	backgroundImage = loadImage("Images/Background/bg1.jpg");
  	obstacle1 = loadImage("Images/Obstacles/obstacle1.png");
  	obstacle2 = loadImage("Images/Obstacles/obstacle2.png");
  	obstacle3 = loadImage("Images/Obstacles/obstacle3.png");
  	obstacle4 = loadImage("Images/Obstacles/obstacle4.png");
  	obstacle5 = loadImage("Images/Obstacles/obstacle5.png");
  	obstacle6 = loadImage("Images/Obstacles/obstacle6.png");

}

function setup(){
createCanvas(1200,800);
man = createSprite(100,561,10,20);
man.addAnimation("man",manWalking);
man.scale=0.3 
man.debug = true;
man.setCollider("rectangle",0,0,100,550)

ground = createSprite(600,760,1200,50);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -6 

invisibleGround = createSprite(600,758,1200,20);
invisibleGround.visible = false;
obstaclesGroup = new Group();
}

function draw(){
  background(backgroundImage);
  text("Score: "+ score, 500,50);
  if (gameState === "play") {
  		score = score + Math.round(getFrameRate()/60);
	  	if (ground.x < 0){
	  	ground.x = ground.width/2;
	  }
	  if (keyDown("space")) {
	  	man.velocityY = -6;
	  }
	  man.velocityY = man.velocityY + 0.8
	  spawnObstacles();
	  if (man.isTouching(obstaclesGroup)) {
	  	gameState = "end"
	  }
  } 
  else if (gameState === "end"){
  	ground.velocityX = 0;
  	man.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    score = 0;

  }
  man.collide(invisibleGround);
  console.log(man.y);
  
  drawSprites();
}   

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1200,720,10,40);
    //obstacle.addImage("obstacle" , obstacleImage);
    //obstacle.debug = true;
    obstacle.velocityX = -6
     var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
    }
	   }