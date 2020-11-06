//Create variables here
var dog,happyDog,database,foodS,foodStock,snacks,fedTime,lastFed,foodObj,currHour
function preload()
{
  dogImage = loadImage("images/dogImg.png")
  dogImageHappy = loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(1000, 1000);
  var feedButton = createButton('Feed')
  feedButton.position(700,95)
  feedButton.mousePressed(feedDog)
  var addButton = createButton('Add Food')
  addButton.position(800,95)
  addButton.mousePressed(addFood)
  foodObj = new Food()
  
  database = firebase.database();
  dog = createSprite(500,500,50,50)
  dog.addImage(dogImage)
 // getState()
 snacks = database.ref("food")
 snacks.on("value",function(data){foodS = data.val()})

 lastFedTime = database.ref("feedTime")
 lastFedTime.on("value",function(data){lastFed = data.val()})
}


function draw() {  
  background(46,139,87)
  
/*if(keyWentDown(UP_ARROW)){
  dog.addImage(dogImageHappy)
  if(foodS){
  console.log(foodS)
  update(foodS)
}
}*/
if(foodS){
  foodObj.foodNo = foodS
  foodObj.display()
}
  
  drawSprites();
  //add styles here
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Fed : " +lastFed%12 +"P.M.",350,30)
}else if(lastFed === 0){
  text("Last Fed : 12 A.M.",350,30)
}else{
  text("Last Fed : " + lastFed + "A.M.",350,30)
}
}
function getState(){
  foodStock = database.ref('food')
  foodStock.on("value",function(data){
  foodS = data.val()
})
}
function update(x,hour){
  if(x<=0){
      x = 0
  }else{
      x = x-1
  }
  database.ref('/').update({food:x,feedTime:hour})
  
}
function feedDog(){
  dog.addImage(dogImageHappy)
  currHour = new Date().getHours()
  update(foodS,currHour)
}
function addFood(x){
 foodS++
database.ref('/').update({food:foodS})
}