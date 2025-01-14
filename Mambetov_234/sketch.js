/*

The Game Project

2b - using variables

*/


var floorPos_y;

var scrollPos;

var gameChar_x;
var gameChar_y;
var charDircLeft = true; 
var jumpPos;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;

var health = 100;

var gameState = "game";

var deathSound;
var platforms;

var game_score;	


/*function preload() {
	soundFormats('mp3', 'ogg');
    deathSound = loadSound('death.mp3');
}*/


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position
	
	scrollPos = 0

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = [150,400,500,600,900]
	treePos_y = height/2-75;
	
	cloud = {
		x: [100, 400,700],
		y: [50, 100, 200],
		a: 200,
		b: 100,
		
	};
	
	mountain = [100,400,700]
	
	collectable ={
		x_pos: [150,300, 450],
		y_pos: 450, 
		size: 30,
        isFound: [false, false, false],
	};
	
	canyon = {
		x_pos: [0,200,700],
		width: 100,
	};
	
	 platforms = {
        x_pos: [400, 500 ,800],
        y_pos: 350,
        length: 100,
        width: 10,
        isOnPlatform: [false,false,false],
	 };
    
	
	isLeft=false;
    isRight=false;
	isUp=false;
    isDown=false;
    isFalling=false;
    isPlummeting=false;
	game_score = 0;
	
}

function drawCharLeft(){
	//gameChar
	fill(255,0,0)
	ellipse(gameChar_x, gameChar_y,20,20)
	rect(gameChar_x-10,gameChar_y+20,20,-20)
	rect(gameChar_x-10,gameChar_y+20,5,10)
	rect(gameChar_x+5,gameChar_y+20,5,10)
	rect(gameChar_x+5,gameChar_y,10,15)
	fill(128,128,128)
	ellipse(gameChar_x-2, gameChar_y,12,7)
}

function drawCharRight(){
	//gameChar
	fill(255,0,0)
	ellipse(gameChar_x, gameChar_y,20,20)
	rect(gameChar_x-10,gameChar_y+20,20,-20)
	rect(gameChar_x-10,gameChar_y+20,5,10)
	rect(gameChar_x+5,gameChar_y+20,5,10)
	rect(gameChar_x-15,gameChar_y,10,15)
	fill(128,128,128)
	ellipse(gameChar_x+2, gameChar_y,12,7)
}

function drawCharJumpLeft(){
	//gameChar
	fill(255,0,0)
	ellipse(gameChar_x, gameChar_y+5,30,30)
	fill(128,128,128)
	ellipse(gameChar_x-2, gameChar_y,14,9)
}

function drawCharJumpRight(){
	//gameChar
	fill(255,0,0)
	ellipse(gameChar_x, gameChar_y+5,30,30)
	fill(128,128,128)
	ellipse(gameChar_x+2, gameChar_y,14,9)
}


function drawChar(){
	if(isFalling || isPlummeting){
		if (charDircLeft){
			drawCharJumpLeft()
		}
		else{
			drawCharJumpRight()
		}
	}
	else{
		if (charDircLeft){
			drawCharLeft()
		}
		else{
			drawCharRight()
		}
	}
}

function drawCollect(i){
	fill(228,165,32);
    ellipse(collectable.x_pos[i],collectable.y_pos,collectable.size+4,collectable.size+4);
    fill(228,130,32);
    ellipse(collectable.x_pos[i],collectable.y_pos,collectable.size,collectable.size);
	fill(150,20,20)
	ellipse(collectable.x_pos[i], collectable.y_pos, collectable.size/2, collectable.size)
}



function draw()
{
	
	if (gameState === "menu") {
        background(100, 155, 255);
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Главное меню", width / 2, height / 2 - 20);
        textSize(16);
        text("Нажмите 'Enter' для начала игры", width / 2, height / 2 + 20);
		text("Нажмите 'R' для рестарта игры", width / 2, height / 2 + 40);
    } 
	else if (gameState	=== "win"){
		background(10, 255, 10);
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("ТЫ ВЫИГРАЛ!!!!", width / 2, height / 2 - 20);
        textSize(16);
        text("Нажмите 'R' для рестарта игры", width / 2, height / 2 + 20);
		
	}
	
	else if (gameState === "game") {
		background(100, 155, 255); //fill the sky blue

		noStroke();
		fill(0, 155, 0);
		rect(0, floorPos_y, height*10, width - floorPos_y); //draw some green ground

		push()
		translate(scrollPos, 0)

		 //cloud
		for (var i =0; i < cloud.x.length; i++){
			fill(255);
			ellipse(cloud.x[i], cloud.y[i], cloud.a, cloud.b);
			ellipse(cloud.x[i]+100, cloud.y[i], cloud.a, cloud.b);
			ellipse(cloud.x[i]+100, cloud.y[i], cloud.a, cloud.b);
		}
			for(let i = 0; i<cloud.x.length; i++) {
			if(cloud.x[i] <= 0)
				cloud.x[i] = width;
		}


		//mountain
		for (var i = 0; i < mountain.length; i++){
			fill(100);
			triangle(mountain[i],400+32,mountain[i]+75,400-200,mountain[i]+150,400+32);
			fill(255);
			triangle(mountain[i]+55,400-140,mountain[i]+75,400-200,mountain[i]+95,400-140)
		}
		for(let i = 0; i<mountain.length; i++) {
			if(mountain[i]+150 <= 0)
				mountain[i] = width;
		}

		//canyon
		for (var i = 0; i < canyon.x_pos.length; i++){
			fill(160,82,45);
			rect(canyon.x_pos[i], floorPos_y, canyon.width, canyon.width*2)
		}
		for(let i=0; i<canyon.x_pos.length; i++) {
			if(canyon.x_pos[i]+canyon.width<=0)
				canyon.x_pos[i]=width+canyon.width;
		}




		//collectible
		/*if(dist(gameChar_x,gameChar_y,collectable.x_pos,collectable.y_pos)<=25)
			isFound=true;
		if(isFound==false) {
			drawCollect()
		}*/

		for(var i = 0; i<collectable.x_pos.length; i++) {
			if(dist(gameChar_x,gameChar_y,collectable.x_pos[i],collectable.y_pos)<=25){ 
				collectable.isFound[i] = true;
			}
			if(collectable.isFound[i]==false) {
				drawCollect(i);
				game_score = i ;
				console.log(typeof i);
				console.log(typeof game_score);
			}

			if(collectable.x_pos[i] <= 0) {
				collectable.x_pos[i] = canyon.x_pos[i]+150;
				collectable.isFound[i] = false;
			}
		}
		


				//tree
		for (var i = 0; i < treePos_x.length; i++){
			fill(128,64,16);
			rect(treePos_x[i]-10,treePos_y+220,30,-50);
			fill(50,200,50);
			ellipse(treePos_x[i]+5,treePos_y+150,40,70);
			ellipse(treePos_x[i]+5,treePos_y+100,40,50);
		}
		for(let i = 0; i<treePos_x.length; i++) {
			if(treePos_x[i] <= 0)
				treePos_x[i] = width;
		}

		pop()
		
		 //platforms
		fill(225, 193, 110);
		for(let i = 0; i<platforms.x_pos.length; i++) {
			rect(platforms.x_pos[i],platforms.y_pos,platforms.length,platforms.width)
			if(gameChar_y <= platforms.y_pos && gameChar_x>=platforms.x_pos[i] && gameChar_x<=platforms.x_pos[i]+platforms.length) {
				platforms.isOnPlatform[i] = true; 
				isFalling=false;
			}
			else
				platforms.isOnPlatform[i] = false;
			if(collectable.x_pos[i]>=platforms.x_pos[i] && collectable.x_pos[i]<=platforms.x_pos[i]+platforms.length) {
				collectable.y_pos[i] = platforms.y_pos-15;
			} else {
				collectable.y_pos[i] = 410;
			}
		}
		
		
		if(platforms.isOnPlatform.includes(true)) {
        	isFalling=false;
			isPlummeting =false;
        	gameChar_y = platforms.y_pos-25;
    	}
		else
			if(gameChar_y == platforms.y_pos-25 ){isFalling = true;}
    


		if((isLeft==false && isRight==false) || (isLeft==true && isRight==true)) {
			drawChar()
		}
		else if (isLeft==true && isRight==false){
			charDircLeft = true
			gameChar_x -=5
			drawChar()
			if (gameChar_x < 100){
				//scrollPos += 10
				gameChar_x = 100
			}
		}

		else if (isLeft==false && isRight==true){
			charDircLeft = false
			gameChar_x +=5
			drawChar()
			if(gameChar_x>width-150){
				scrollPos=5
				gameChar_x=width-150;
				for(var i = 0; i<canyon.x_pos.length; i++) {
					canyon.x_pos[i]-=10;
					mountain[i]-=10;
					cloud.x[i]-=10;
					collectable.x_pos[i]-=10;
					platforms.x_pos[i]-=10;
				}
				for(let i = 0; i<treePos_x.length; i++)
					treePos_x[i]-=10;
			}
		}


		if((isUp==false && isDown==false) || (isUp==true && isDown==true)) {
			drawChar()
		}
		else if (isUp==true && isDown==false && gameChar_y > floorPos_y-25){
			gameChar_y -=5
			drawChar()
		}

		else if (isUp==false && isDown==true  && gameChar_y < 576-30){
			gameChar_y +=5
			drawChar()
		}

		if(gameChar_y <= jumpPos && isFalling &&  gameChar_y <= floorPos_y) {
			console.log("Fine");
			gameChar_y+=3;
			if (gameChar_y >= jumpPos){
				isFalling = false;
			}
		}

		for(var i=0; i<canyon.x_pos.length; i++) {

			if((gameChar_x>=canyon.x_pos[i]+5 && gameChar_x<=canyon.x_pos[i]+canyon.width-5 && !(platforms.isOnPlatform == true) && gameChar_y >= platforms.y_pos-25) || (gameChar_y>=height))  
			{isPlummeting=true;
			 console.log("Test");
			 break;
			}
			if((gameChar_x<=canyon.x_pos[i]+5 || gameChar_x>=canyon.x_pos[i]+canyon.width-5) && (gameChar_y<=height) || (!(platforms.isOnPlatform == false) && gameChar_y < platforms.y_pos-25)){
				isPlummeting=false;
				console.log("None test");
			}
		}
		
		
		for(let i = 0; i<platforms.x_pos.length; i++) {
        if(platforms.x_pos[i]+platforms.length <= 0)
            platforms.x_pos[i] = width+random(0,200);
		}
		
		
		if(isPlummeting==true) {
			gameChar_y+=3;
		}


		/*if((gameChar_x>=canyon.x_pos && gameChar_x<=canyon.x_pos+canyon.width) || (gameChar_x >= height) )  
			isPlummeting=true;
		if((gameChar_x<=canyon.x_pos || gameChar_x>=canyon.x_pos+canyon.width) && (gameChar_x <= height) )  
			isPlummeting=false;
		if(isPlummeting == true && isFalling == false)
			gameChar_y+=3;*/


		//health
		fill(255, 0, 0);
		rect(10, 10, 100, 20); // Фон для здоровья
		fill(0, 255, 0);
		rect(10, 10, health, 20); // Здоровье
		
		text(`-Collect ${game_score} coins.`, width - 190, 60);
		if (game_score == 0) {
			gameState = "win";
		}
		
	}
	
}

/*function die() {
       if (deathSound.isLoaded()) {
           deathSound.play();
       } else {
           console.error("Sound not loaded yet!");
       }
   }*/

function keyPressed() {
	 if (keyCode === 13 && gameState === "menu") {
        gameState = "game"; // Переход в игру
    }
    if (keyCode === 27 && gameState === "game") {
        gameState = "menu"; // Возврат в меню
    }
	if (keyCode === 82 && (gameState === "menu" || gameState === "win")){
		setup();
		gameState = "game";
	}
	
    if(keyCode===LEFT_ARROW)
        isLeft=true;
    if(keyCode===RIGHT_ARROW)
        isRight=true;
	if(keyCode===UP_ARROW && isPlummeting == false)
        isUp=true;
    if(keyCode===DOWN_ARROW)
        isDown=true;
    if(keyCode==32 && isPlummeting == false && isFalling == false) {
		jumpPos = gameChar_y
		isFalling = true
		gameChar_y-=102;
    }
}
function keyReleased() {
    if(keyCode===LEFT_ARROW)
        isLeft=false;
    if(keyCode===RIGHT_ARROW)
        isRight=false;
	if(keyCode===UP_ARROW)
        isUp=false;
    if(keyCode===DOWN_ARROW)
        isDown=false;
    console.log(dist(gameChar_x,gameChar_y,collectable.x_pos,collectable.y_pos));
}



