var dog,happyDog,database,foodS,foodStock
var dog_img,happyDog_img;
var milk,milk_img;

function preload(){
  //load images here
  dog_img=loadImage("dogImg.png");
  happyDog_img=loadImage("dogImg1.png");
  milk_img=loadImage("milk.png");
  
}

function setup() {
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock,showError);
 
  createCanvas(500,500);
  dog=createSprite(250,300);
  dog.addImage(dog_img);
  dog.scale=0.2;
  
  milk=createSprite(200,340);
  milk.addImage(milk_img);
  milk.scale=0.15
  milk.visible=false;

  for(var i=10;i<=500;i=i+15){
    var dots=createSprite(i,10,5,5);
    dots.shapeColor="white";
  }

  for(var i=10;i<=500;i=i+15){
    var dots1=createSprite(i,490,5,5);
    dots1.shapeColor="white";
  }

  for(var i=10;i<=500;i=i+15){
    var dots2=createSprite(10,i,5,5);
    dots2.shapeColor="white";
  }

  for(var i=10;i<=500;i=i+15){
    var dots3=createSprite(490,i,5,5);
    dots3.shapeColor="white";
  }

}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
    milk.visible=true;
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dog_img);
    milk.visible=false;
  }

  drawSprites();
  
  strokeWeight(2);
  stroke("black")
  textSize(24);
  fill("white");
  text("Food Remaining : "+foodS,130,140);
  textSize(20);
  text("NOTE: Press UP ARROW Key To Feed Drago Milk!",25,50);

  if(foodS%2===0){
    textSize(24);
    text("Great! Drago is Happy",140,450);
  }

  if(foodS===undefined){
    textSize(25);
    text("Loading.........",170,430);
  }

  if(foodS===0){
    foodS=20;
  }

}

function readStock(data){ 
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').set({
      Food:x
    }
  )

}

function showError(){
  text("Server is not working, Try again later!",200,200);
}



