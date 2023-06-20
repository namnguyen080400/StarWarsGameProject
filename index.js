// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
document.body.appendChild(canvas);
var startButton;
var restartButton;

var gameStart = false;
var gameOver = false;

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
var heroShotX = 0;
var heroShotY = 0;
var youWin = false;

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

// delcare right missile
var rightMissileReady = false;
var rightMissileImage = new Image();
rightMissileImage.onload = function () {
    rightMissileReady = true;
};
rightMissileImage.src = "images/rightMissile.png";
var RIGHT_MISSILE_WIDTH = 100;
var RIGHT_MISSILE_HEIGHT = 14;

// delcare left missile
var leftMissileReady = false;
var leftMissileImage = new Image();
leftMissileImage.onload = function () {
    leftMissileReady = true;
};
leftMissileImage.src = "images/leftMissile.png";
var LEFT_MISSILE_WIDTH = 105;
var LEFT_MISSILE_HEIGHT = 43;

// delcare top missile
var topMissileReady = false;
var topMissileImage = new Image();
topMissileImage.onload = function () {
    topMissileReady = true;
};
topMissileImage.src = "images/topMissile.png";
var TOP_MISSILE_WIDTH = 105;
var TOP_MISSILE_HEIGHT = 43;

// delcare down missile
var downMissileReady = false;
var downMissileImage = new Image();
downMissileImage.onload = function () {
    downMissileReady = true;
};
downMissileImage.src = "images/downMissile.png";
var DOWN_MISSILE_WIDTH = 60;
var DOWN_MISSILE_HEIGHT = 115;
downMissileImage.onload = function () {
    downMissileReady = true;
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener('click', reset);
    startButton = document.getElementById("startButton");
    startButton.addEventListener('click', startGame);
}
MISSILE_SLEEP_TIME = 10;

// delcare upper left asteroid  
var upperLeftAsteroidReady = false;
var upperLeftAsteroidImage = new Image();
upperLeftAsteroidImage.onload = function () {
    upperLeftAsteroidReady = true;
};
upperLeftAsteroidImage.src = "images/upperLeftAsteroid.png";
var UPPER_LEFT_ASTEROID_WIDTH = 100;
var UPPER_LEFT_ASTEROID_HEIGHT = 100;

// delcare lower left asteroid  
var lowerLeftAsteroidReady = false;
var lowerLeftAsteroidImage = new Image();
lowerLeftAsteroidImage.onload = function () {
    lowerLeftAsteroidReady = true;
};
lowerLeftAsteroidImage.src = "images/lowerLeftAsteroid.png";
var LOWER_LEFT_ASTEROID_WIDTH = 66;
var LOWER_LEFT_ASTEROID_HEIGHT = 61;

// delcare upper right asteroid  
var upperRightAsteroidReady = false;
var upperRightAsteroidImage = new Image();
upperRightAsteroidImage.onload = function () {
    upperRightAsteroidReady = true;
};
upperRightAsteroidImage.src = "images/upperRightAsteroid.png";
var UPPER_RIGHT_ASTEROID_WIDTH = 72;
var UPPER_RIGHT_ASTEROID_HEIGHT = 78;

// delcare lower right asteroid  
var lowerRightAsteroidReady = false;
var lowerRightAsteroidImage = new Image();
lowerRightAsteroidImage.onload = function () {
    lowerRightAsteroidReady = true;
};
lowerRightAsteroidImage.src = "images/lowerRightAsteroid.png";
var LOWER_RIGHT_ASTEROID_WIDTH = 105;
var LOWER_RIGHT_ASTEROID_HEIGHT = 69;

// small explosion image
var smallExplosionReady = false;
var smallExplosionImage = new Image();
smallExplosionImage.src = "images/smallExplosion.png";
var SMALL_EXPLOSION_EFFECT_WIDTH = 99;
var SMALL_EXPLOSION_EFFECT_HEIGHT = 100;
var timeExplosion = 0;


// game over message
var gameOverReady = false;
var gameOverImage = new Image();
gameOverImage.src = "images/gameOverImage.jpg";
var GAME_OVER_WIDTH = 540;
var GAME_OVER_HEIGHT = 360;
var GAME_OVER_X = canvas.width/2 - GAME_OVER_WIDTH/2;
var GAME_OVER_Y = canvas.height/2 - GAME_OVER_HEIGHT/2;

// winning message
var winningReady = false;
var winningImage = new Image();
winningImage.src = "images/youWinDisplay.jpg";
var WINNING_IMAGE_WIDTH = 639;
var WINNING_IMAGE_HEIGHT = 360;
var WINNING_IMAGE_X = canvas.width/2 - WINNING_IMAGE_WIDTH/2;
var WINNING_IMAGE_Y = canvas.height/2 - WINNING_IMAGE_WIDTH/2;

// sound effect
var explosionSound = "sounds/x-wingExplosionSound.mp3";
var shipSound = "sounds/x-wingFlyingSound.mp3";
var soundEfx = document.getElementById("soundEfx");
var winningSound = "sounds/starWarsTheme.mp3";



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
    speed: 300, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0,  // where on the canvas are they?
    sizeX: width,
    sizeY: height,
    isAlive: false
};

var crusier = {
    x: canvas.width - 800,
    y: 200,
    sizeX: CRUSIER_WIDTH,
    sizeY: CRUSIER_HEIGHT,
    image: crusierImage
};

var upperLeftAsteroid = {
    x: crusier.x - UPPER_LEFT_ASTEROID_WIDTH/2,
    y: crusier.y - UPPER_LEFT_ASTEROID_HEIGHT - 50,
    sizeX: UPPER_LEFT_ASTEROID_WIDTH,
    sizeY: UPPER_LEFT_ASTEROID_HEIGHT,
    image: upperLeftAsteroidImage,
    isAlive: false
};

var lowerLeftAsteroid = {
    x: crusier.x - LOWER_LEFT_ASTEROID_WIDTH - 50,
    y: crusier.y + crusier.sizeY - (LOWER_LEFT_ASTEROID_HEIGHT/2),
    sizeX: LOWER_LEFT_ASTEROID_WIDTH,
    sizeY: LOWER_LEFT_ASTEROID_HEIGHT,
    image: lowerLeftAsteroidImage,
    isAlive: false
};

var upperRightAsteroid = {
    x: crusier.x + crusier.sizeX + 50,
    y: crusier.y - UPPER_RIGHT_ASTEROID_HEIGHT/2,
    sizeX: UPPER_RIGHT_ASTEROID_WIDTH,
    sizeY: UPPER_RIGHT_ASTEROID_HEIGHT,
    image: upperRightAsteroidImage,
    isAlive: false
};

var lowerRightAsteroid = {
    x: crusier.x + crusier.sizeX - LOWER_RIGHT_ASTEROID_WIDTH/2,
    y: crusier.y + crusier.sizeY + LOWER_RIGHT_ASTEROID_HEIGHT/2,
    sizeX: LOWER_RIGHT_ASTEROID_WIDTH,
    sizeY: LOWER_RIGHT_ASTEROID_HEIGHT,
    image: lowerRightAsteroidImage,
    isAlive: false
};

var asteroids = [upperLeftAsteroid, lowerLeftAsteroid, upperRightAsteroid, lowerRightAsteroid];
var reachDestination = 0;

// right missile
var RIGHT_MISSILE_START_X = 10;
//var RIGHT_MISSILE_START_Y = 200;
var RIGHT_MISSILE_START_Y = (canvas.height / 2) - 16
var RIGHT_MISSILE_SPEED = 5;
var RIGHT_MISSILE_NAME = "Right missile";
var rightMissile = {
    missileID: RIGHT_MISSILE_NAME,
    speed: RIGHT_MISSILE_SPEED,
    x: RIGHT_MISSILE_START_X,
    y: RIGHT_MISSILE_START_Y,
    sizeX: RIGHT_MISSILE_WIDTH,
    sizeY: RIGHT_MISSILE_HEIGHT,
    image: rightMissileImage,
    isAlive: false,
    sleepTime: 0
};

var rightMissileHit = 0;


// left missile
var LEFT_MISSILE_START_X = canvas.width - 10;
var LEFT_MISSILE_START_Y = 200;
var LEFT_MISSILE_SPEED = 5;
var LEFT_MISSILE_NAME = "Left missile";

var leftMissile = {
    missileID: LEFT_MISSILE_NAME,
    speed: LEFT_MISSILE_SPEED,
    x: LEFT_MISSILE_START_X,
    y: LEFT_MISSILE_START_Y,
    sizeX: LEFT_MISSILE_WIDTH,
    sizeY: LEFT_MISSILE_HEIGHT,
    image: leftMissileImage,
    isAlive: false,
    sleepTime: 0
};

var leftMissileHit = 0;


// top missile
var TOP_MISSILE_START_X = 200;
var TOP_MISSILE_START_Y = canvas.height - 10;
var TOP_MISSILE_SPEED = 5;
var TOP_MISSILE_NAME = "Top missile";

var topMissile = {
    missileID: TOP_MISSILE_NAME,
    speed: TOP_MISSILE_SPEED,
    x: TOP_MISSILE_START_X,
    y: TOP_MISSILE_START_Y,
    sizeX: TOP_MISSILE_WIDTH,
    sizeY: TOP_MISSILE_HEIGHT,
    image: topMissileImage,
    isAlive: false,
    sleepTime: 0
};

var topMissileHit = 0;

// down missile
var DOWN_MISSILE_START_X = 200;
var DOWN_MISSILE_START_Y = 10;
var DOWN_MISSILE_SPEED = 5;
var DOWN_MISSILE_NAME = "Down missile";

var downMissile = {
    missileID: DOWN_MISSILE_NAME,
    speed: DOWN_MISSILE_SPEED,
    x: DOWN_MISSILE_START_X,
    y: DOWN_MISSILE_START_Y,
    sizeX: DOWN_MISSILE_WIDTH,
    sizeY: DOWN_MISSILE_HEIGHT,
    image: downMissileImage,
    isAlive: false,
    sleepTime: 0
};

var downMissileHit = 0;

const missiles = [rightMissile, leftMissile, topMissile, downMissile];

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
    if (!gameStart) {
        return;
    }
    if (!gameOver) {
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

        if (rightMissile.isAlive) {
            // right missile shooting
            if (rightMissile.x > canvas.width) {
                rightMissile.x = RIGHT_MISSILE_START_X;
                rightMissile.y = Math.random() * (canvas.height - 100) + 100;
            }
            else {
                rightMissile.x += rightMissile.speed;
                for (let i = 0; i < asteroids.length; i++) {
                    if (checkHit(rightMissile, asteroids[i])) {
                        soundEfx.src = explosionSound;
                        soundEfx.play();
                        rightMissile.isAlive = false;
                        rightMissile.sleepTime = MISSILE_SLEEP_TIME;
                        break;
                    }
                }
            }
        }

        // left missile shooting
        if (leftMissile.isAlive) {
            if (leftMissile.x < 0) {
                leftMissile.x = LEFT_MISSILE_START_X;
                leftMissile.y = Math.random() * (canvas.height - 100) + 100;
            }
            else {
                leftMissile.x -= leftMissile.speed;
                for (let i = 0; i < asteroids.length; i++) {
                    if (checkHit(leftMissile, asteroids[i])) {
                        soundEfx.src = explosionSound;
                        soundEfx.play();
                        leftMissile.isAlive = false;
                        leftMissile.sleepTime = MISSILE_SLEEP_TIME;
                        break;
                    }
                }
            }
        }

        // top missile shooting
        if (topMissile.isAlive) {
            if (topMissile.y < 0) {
                topMissile.y = TOP_MISSILE_START_Y;
                topMissile.x = Math.random() * (canvas.width - 10) + 10;
            }
            else {
                topMissile.y -= topMissile.speed;
                for (let i = 0; i < asteroids.length; i++) {
                    if (checkHit(topMissile, asteroids[i])) {
                        soundEfx.src = explosionSound;
                        soundEfx.play();
                        topMissile.isAlive = false;
                        topMissile.sleepTime = MISSILE_SLEEP_TIME;
                        break;
                    }
                }
            }
        }

        if (downMissile.isAlive) {
            // down missile shooting
            if (downMissile.y > canvas.height) {
                downMissile.y = DOWN_MISSILE_START_Y;
                downMissile.x = Math.random() * (canvas.width - 10) + 10;
            }
            else {
                downMissile.y += downMissile.speed;
                for (let i = 0; i < asteroids.length; i++) {
                    if (checkHit(downMissile, asteroids[i])) {
                        soundEfx.src = explosionSound;
                        soundEfx.play();
                        downMissile.isAlive = false;
                        downMissile.sleepTime = MISSILE_SLEEP_TIME;
                        break;
                    }
                }
            } 
        }

        // x-wing reach to rebel crusier
        if (
            hero.x <= (crusier.x + CRUSIER_WIDTH)
            && crusier.x <= (hero.x + width)
            && hero.y <= (crusier.y + CRUSIER_HEIGHT)
            && crusier.y <= (hero.y + height)
        ) {
            ++reachDestination;       // keep track of our “score”
            soundEfx.src = winningSound;
            soundEfx.play();
            gameOver = true;
            youWin = true;
            //reset();       // start a new cycle
        }

        // x-wing crash into the astroid
        for (let i = 0; i < asteroids.length; i++) {
            if (
                hero.x <= (asteroids[i].x + asteroids[i].sizeX)
                && asteroids[i].x <= (hero.x + width)
                && hero.y <= (asteroids[i].y + asteroids[i].sizeY)
                && asteroids[i].y <= (hero.y + height)
            ) {
                soundEfx.src = explosionSound;
                soundEfx.play();
                gameOver = true;
                youWin = false;
                hero.isAlive = false;
                heroShotX = hero.x;
                heroShotY = hero.y;
                //reset();       // start a new cycle
            }
        }

        // missile hit rebel crusier
        for (let i = 0; i < missiles.length; i++) {
            if (checkHit(missiles[i], crusier) === true) {
                heroShotX = crusier.x;
                heroShotY = crusier.y;
                gameOver = true;
                soundEfx.src = explosionSound;
                soundEfx.play();
                youWin = false;
                //reset();       // start a new cycle
                break;
            } 
        }

        // missile hit x-wing
        for (let i = 0; i < missiles.length; i++) {
            if (checkHit(missiles[i], hero) === true) {
                heroShotX = hero.x;
                heroShotY = hero.y;
                gameOver = true;
                soundEfx.src = explosionSound;
                soundEfx.play();
                youWin = false;
                //reset();       // start a new cycle
                break;
            } 
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
    }
};

// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (!gameOver) {

    
        if (heroReady) {
            //ctx.drawImage(heroImage, hero.x, hero.y);
            ctx.drawImage(heroImage, srcX, srcY, width, height, hero.x, hero.y, width, height);
        }

        if (crusierReady) {
            if (crusier.isAlive) {
                ctx.drawImage(crusierImage, crusier.x, crusier.y);
            }
        }

        if (upperLeftAsteroidReady && upperRightAsteroidReady && lowerLeftAsteroidReady && lowerRightAsteroidReady) {
            for (let i = 0; i < asteroids.length; i++) {
                ctx.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
            }   
        }

        if (topMissileReady && downMissileReady && leftMissileReady && rightMissileReady) {
            for (let i = 0; i < missiles.length; i++) {
                if (missiles[i].isAlive) {
                    ctx.drawImage(missiles[i].image, missiles[i].x, missiles[i].y);
                }
                else {
                    ctx.drawImage(smallExplosionImage, missiles[i].x, missiles[i].y);
                    if (missiles[i].sleepTime > 0 && missiles[i].isAlive === false) {
                        missiles[i].sleepTime--;
                    }
                    else {
                        missiles[i].isAlive = true;
                        startMissile(missiles[i]);
                    }
                }
            }
        }
    }
    else {
        if (youWin === false) {      
            if (timeExplosion < 50) {
                ctx.drawImage(smallExplosionImage, heroShotX, heroShotY);
                timeExplosion++;
            }
            else {
                ctx.drawImage(gameOverImage, GAME_OVER_X, GAME_OVER_Y);
            }
        }
        else {
            ctx.drawImage(winningImage, WINNING_IMAGE_X, WINNING_IMAGE_Y);
        }
    }
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

function gameRestart() {

}

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = Math.random() * canvas.width/4 + 50;
    hero.y = Math.random() * canvas.height/4 + canvas.height/2;
    timeExplosion = 0;
    for (let i = 0; i < missiles.length; i++) {
        missiles[i].isAlive = true;
        startMissile(missiles[i]);
    }
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].isAlive = true;
    }
    crusier.isAlive = true;
    hero.isAlive = true;
    youWin = false;
    gameOver = false;
};

var startGame = function () {
    gameStart = true;
    //reset();
}

var checkHit = function(missile, target) {
    if (
        target.x <= (missile.x + missile.sizeX)
        && missile.x <= (target.x + target.sizeX)
        && target.y <= (missile.y + missile.sizeY)
        && missile.y <= (target.y + target.sizeY)
    ) {

        return true;
    } 
    return false;
}

var startMissile = function(missile) {
    if (missile.missileID === LEFT_MISSILE_NAME) {
        leftMissile.isAlive = true;
        leftMissile.x = LEFT_MISSILE_START_X;
        leftMissile.y = Math.random() * (canvas.height - 100) + 100; 
    }
    else if (missile.missileID === RIGHT_MISSILE_NAME) {
        rightMissile.isAlive = true;
        rightMissile.x = RIGHT_MISSILE_START_X;
        rightMissile.y = Math.random() * (canvas.height - 100) + 100;
    }
    else if (missile.missileID === TOP_MISSILE_NAME) {
        topMissile.isAlive = true;
        topMissile.y = TOP_MISSILE_START_Y;
        topMissile.x = Math.random() * (canvas.width - 10) + 10;
    }
    else if (missile.missileID === DOWN_MISSILE_NAME) {
        downMissile.isAlive = true;
        downMissile.y = DOWN_MISSILE_START_Y;
        downMissile.x = Math.random() * (canvas.width - 10) + 10;
    }
}

// end of define function ===============================================================





// Let's play this game! ======================
var then = Date.now();
reset();
main();  // call the main game loop.
