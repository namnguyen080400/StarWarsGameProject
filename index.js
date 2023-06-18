// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 2000;
canvas.height = 1000;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/space.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/x-wing.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Rebel crusier image
var crusierReady = false;
var crusierImage = new Image();
crusierImage.onload = function () {
    crusierReady = true;
};
crusierImage.src = "images/rebelCrusierTransparent.png";
var CRUSIER_WIDTH = 150;
var CRUSIER_HEIGHT = 72;
// done with load image ================================================================


// define objects and variables we need =================================================

// lots of variables to keep track of sprite geometry
//  I have 8 rows and 3 cols in my space ship sprite sheet
var rows = 6;
var cols = 5;

//second row for the right movement (counting the index from 0)
var trackRight = 5;
//third row for the left movement (counting the index from 0)
var trackLeft = 2;
var trackUp = 4;   // not using up and down in this version, see next version
var trackDown = 0;

var spriteWidth = 510; // also  spriteWidth/cols; 511
var spriteHeight = 505;  // also spriteHeight/rows; 
var width = spriteWidth / cols; 
var height = spriteHeight / rows; 

var curXFrame = 0; // start on left side
var frameCount = 1;  // 5 frames per row
//x and y coordinates of the overall sprite image to get the single frame  we want
var srcX = 0;  // our image has no borders or other stuff
var srcY = 0;

//Assuming that at start the character will move right side 
var left = false;
var right = false;
var up = false;
var down = false;


// Game objects
var hero = {
    speed: 100, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var monstersCaught = 0;
var crusier = {
    
    x: canvas.width - 800,
    y: 200 
};

var reachDestination = 0;

// end define objects and variables we need ==============================================

// keyboard control =====================================================================

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// end keyboard control ===================================================================




// define function =====================================================================

// Update game objects
var update = function (modifier) {

    // then decide if they are moving left or right and set those
    if (37 in keysDown && hero.x > (32 + 4)) { // holding left key
        hero.x -= hero.speed * modifier;
        left = true;   // for animation
        right = false; // for animation
        up = false;
        down = false;
    }

    else if (38 in keysDown && hero.x < canvas.width - (96 + 2)) { // holding up key
        hero.y -= hero.speed * modifier;
        left = false;   // for animation
        right = false; // for animation
        up = true;
        down = false;
    }

    //if (39 in keysDown && hero.x < canvas.width - (64 + 6)) { // holding right key
    else if (39 in keysDown && hero.x < canvas.width - (96 + 2)) { // holding right key
        hero.x += hero.speed * modifier;
        left = false;   // for animation
        right = true; // for animation
        up = false;
        down = false;
    }

    else if (40 in keysDown && hero.x < canvas.width - (96 + 2)) { // holding down key
        hero.y += hero.speed * modifier;
        left = false;   // for animation
        right = false; // for animation
        up = false;
        down = true;
    }
    else {
        left = false;   // for animation
        right = false; // for animation
        up = false;
        down = false;
    }

    // Are they touching?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + width)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + height)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }

    if (
        hero.x <= (crusier.x + CRUSIER_WIDTH)
        && crusier.x <= (hero.x + width)
        && hero.y <= (crusier.y + CRUSIER_HEIGHT)
        && crusier.y <= (hero.y + height)
    ) {
        ++reachDestination;       // keep track of our “score”
        reset();       // start a new cycle
    }

    curXFrame = ++curXFrame % frameCount; 	//Updating the sprite frame index 
    // it will count 0,1,2,0,1,2,0, etc
    srcX = curXFrame * width;   	//Calculating the x coordinate for spritesheet 
    //if left is true,  pick Y dim of the correct row
    if (left) {
        //calculate srcY 
        srcY = trackLeft * height;
    }

    //if the right is true,   pick Y dim of the correct row
    if (right) {
        //calculating y coordinate for spritesheet
        srcY = trackRight * height;
    }

    if (up) {
        //calculate srcY 
        srcY = trackUp * height;
    }

    //if the right is true,   pick Y dim of the correct row
    if (down) {
        //calculating y coordinate for spritesheet
        srcY = trackDown * height;
    }

};



// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        //ctx.drawImage(heroImage, hero.x, hero.y);
         ctx.drawImage(heroImage, srcX, srcY, width, height, hero.x, hero.y, width, height);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if (crusierReady) {
        ctx.drawImage(crusierImage, crusier.x, crusier.y);
    }

    console.log(monstersCaught);
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
}



// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};


// Reset the game when the player catches a monster
var reset = function () {
    hero.x = (canvas.width / 2) - 16;
    hero.y = (canvas.height / 2) - 16;

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 64
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
};


// end of define function ===============================================================





// Let's play this game! ======================
var then = Date.now();
reset();
main();  // call the main game loop.
