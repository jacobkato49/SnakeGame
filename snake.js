//Creating all the global Variables


var snakeX = 2, snakeY = 2; //size of the snake
var tailX = [snakeX]; 
var tailY = [snakeY]; 
var length = 0; 
var fX, fY; 
var running = false; 
var gameOver = false; 
var direction = -1; // up = 0, down = -1, left = 1, right = 2 
var score = 0; 
var width = 25; 
var height = 25; 
var interval = 100; //longer makes game slower 
var increment = 1; 
var int; 


 
/** 
 * entry point of the game 
 */ 
function run(){ 
    init(); 
    var int = setInterval(gameLoop, interval); 

    //Definition
        //setInterval- method calls a function or evaluates an expression at a specified interval
            //Syntax = setInterval(function,milliseconds)
} 
 
function init(){ 
    createMap(); 
    createSnake(); 
    createFruit(); 
} 
 
 
/** 
 * Generates map for snake to roam on 
 */ 
function createMap(){ 
    document.write("<table>"); 
 
    for(var y = 0; y < height; y++){ 
        document.write("<tr>"); 
        for(var x = 0; x < width; x++){ 
            if(y == 0 || y == height-1 || x == 0 || x == width-1) 
                document.write("<td class='wall' id='"+ x + "-" + y + "'></td>"); 
            else 
                document.write("<td class='blank' id='"+ x + "-" + y + "'></td>"); 
        } 
        document.write("</tr>"); 
    } 
 
    document.write("</table>"); 
    document.write("<h1 id='score'>Score: </h1>") 
} 
 
/** 
 * creates first piece of snake 
 */ 
function createSnake(){ 
    document.getElementById("2-2").setAttribute("class", "snake-alive"); 
} 
 
 
/** 
 * sets a random block, which is not a snake, to a fruit type block 
 */ 
function createFruit(){ 
    var found = false; 
    while(!found && (length <  (width-2)*(height-2)+1)) { 
        var fruitX = rand(1,width-1); 
        var fruitY = rand(1,height-1); 
        if(getBlock(fruitX, fruitY) == "blank") 
            found = true; 
    } 
    setBlock(fruitX, fruitY, "fruit"); 
    fX = fruitX; 
    fY = fruitY; 
} 
 
function rand(min, max) { 
    return Math.floor(Math.random() * (max - min) ) + min; 
} 
 


/** 
 * sets the class of that block 
 * @param x 
 * @param y 
 * @param value 
 */ 
function setBlock(x, y, value){ 
    if(x != null && y != null) 
        document.getElementById(x+"-"+y).setAttribute("class", value); 
} 
 


/** 
 * gets the class that the block is at that x-y 
 * @param x location 
 * @param y location 
 * @returns {string} class 
 */ 
function getBlock(x, y){ 
    return document.getElementById(x+"-"+y).getAttribute("class"); 
} 
 
 
/** 
 * key listener of program 
 * uses WASD controls 
 */ 
window.addEventListener("keypress", function key(){ 
    //if key is W set direction up 
    var key = event.keyCode; 
    if(direction != -1 && (key == 119 || key == 87)) 
        direction = 0; 
    //if key is S set direction down 
    else if(direction != 0 && (key == 115 || key == 83)) 
        direction = -1; 
    //if key is A set direction left 
    else if(direction != 2 && (key == 97 || key == 65)) 
        direction = 1; 
    //if key is D set direction right 
    else if(direction != 1 && (key == 100 || key == 68)) 
        direction = 2; 
    else if(key == 114 || key == 82) 
        location.reload(); 
    if(!running) 
        running = true; 
    //pause the game 
    else if(key == 32) 
        running = false; 
}); 
 
 
 
function gameLoop(){ 
    if(running && !gameOver){ 
        update(); 
    }if(gameOver){ 
        clearInterval(int); 
    } 
} 
 
 
function update(){ 
    setBlock(fX, fY, "fruit"); 
    updateTail(); 
    setBlock(tailX[length], tailY[length], "blank"); 
    if(direction == 0) 
        snakeY--; 
    else if(direction == -1) 
        snakeY++; 
    else if(direction == 1) 
        snakeX--; 
    else if(direction == 2) 
        snakeX++; 
    setBlock(snakeX, snakeY, "snake-alive"); 
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) gameOver = true; 
    for(var i = tailX.length-1; i>=0; i--) { 
        if(snakeX == tailX[i] && snakeY == tailY[i]){ 
            gameOver = true; 
            break; 
        } 
    } 
    if(snakeX == fX && snakeY == fY){ 
        score+=4; 
        length+=increment; 
        createFruit(); 
    } 
    var poop = length+1; 
    document.getElementById("score").innerHTML = "Score: " + score + " Length: "+ poop; 
} 
 
function updateTail(){ 
    for(var i = length; i > 0; i--){ 
        tailX[i] = tailX[i - 1]; 
        tailY[i] = tailY[i - 1]; 
    } 
    tailX[0] = snakeX; 
    tailY[0] = snakeY; 
} 
 
 
run();