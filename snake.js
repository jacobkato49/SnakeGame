

//settings
var snakeX=2;
var snakeY= 2;

// size of the screen
var height= 30; 
var width=30;

//how often the game updates
var interval=100; // make the game update every 1/10th of a second

//how much our snake grows each tie
var increment=2;

//game variables
var tailX = [snakeX];
var tailY= [snakeY];

//coordinates of the fruits
var fx;
var fy;




var running;
var gameOver;

//direction of the snake
var direction = -1; // up=0, down=-1, left=1, right=2


// identifier for stopping the game loop
var int;



/**
entry point of the game
*/
function run(){
	init();
	// runs the gameLoop(method) and runs it every interval
	int= setInterval(gameLoop,interval);

}


function init() {
	createMap();
	createSnake();
	createFruit();

}



/**
*Generate the map for the snake
*/
function createMap() {

	//table create a multidimensional array of loops
	//table cells to create pixels of the game
	document.write("<table>");

	for(var y=0; y < height; y++){
		document.write("<tr>");

		for (var x=0; x < width; x++){
			//checks for the wall 
			if( x==0 || x== width -1 || y==0 || y== height -1){ //this is the border of our map
				document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");

			}else{
				document.write("<td class='blank' id='"+ x + "-" + y +"'></td>")
			}
		}
		document.write("</tr>");
	}

	document.write("<table>");	

}


function createSnake() {
	set(snakeX, snakeY, "snake");
}


function get(x,y){
	return document.getElementById(x+"-"+y);
}


function set(x,y,value){
	get(x,y).setAttribute("class", value);
}


function rand(min,max){
	return Math.floor(Math.random() * (max - min) + min);
}


function getType(x,y) {
	return get(x,y).getAttribute("class");
}



function createFruit(){
	var found=false;
	while(!found && (length< (width-2)*(height-2)+1)){
		var fruitX = rand(1, width-1);
		var fruitY= rand(1, height-1);

		// see if element at that location is a fruit
		if(getType(fruitX,fruitY) == "blank")
			found=true;
	}
	// see if the snake has gone over the fruit block
	set(fruitX, fruitY, "fruit");
	fx= fruitX;
	fy= fruitY;
}

run();
