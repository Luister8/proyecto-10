var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ball = createSprite(200, 200, 20, 20);
var goal1 = createSprite(200, 5, 170, 10);
var goal2 = createSprite(200, 395, 170, 10);
var computerpaddle = createSprite(200, 20, 80, 10);
var playerpaddle = createSprite(200, 380, 80, 10);

var computerscore = 0;
var playerscore = 0;

var gameState = "serve";

ball.shapeColor = "blue";
goal1.shapeColor = "darkgreen";
goal2.shapeColor = "darkgreen";
playerpaddle.shapeColor = "red";
computerpaddle.shapeColor = "red";

function draw(){
background("lightgreen");

fill("purple");
textSize(30);
text(""+computerscore, 20, 190);
text(""+playerscore, 20, 230);

for (var i = 0; i <= 400; i=i+20) {
line(i, 200, i+10, 200);
}

createEdgeSprites();
ball.bounceOff(edges);
ball.bounceOff(playerpaddle);
ball.bounceOff(computerpaddle);
computerpaddle.bounceOff(edges);
playerpaddle.bounceOff(edges); 



if (gameState == "serve") {
 textSize(25);
 fill ("blue");
 text("Presiona espacio para comenzar", 20, 162);
if (keyDown("space")) {
 serve();
 gameState = "play";
 }
}


if (gameState == "play") {
  if (ball.isTouching(goal1)) {
 playerscore = playerscore+1;
 ball.velocityX = 0;
 ball.velocityY = 0;
 ball.x = 200;
 ball.y = 200;
 playerpaddle.x = 200;
 playerpaddle.y = 370;
 computerpaddle.x = 200;
 computerpaddle.y = 30;
 gameState = "serve";
  }
  if (ball.isTouching(goal2)) {
computerscore = computerscore+1;
ball.velocityX = 0;
 ball.velocityY = 0;
 ball.x = 200;
 ball.y = 200;
 playerpaddle.x = 200;
 playerpaddle.y = 370;
 computerpaddle.x = 200;
 computerpaddle.y = 30;
 gameState = "serve";
}
  if (computerscore==5 || playerscore==5){
 gameState = "end";
}
}

  if (gameState == "end") {
  fill("blue");
  text("¡Fin del juego!", 105, 170);
}



if (keyDown("up")) {
playerpaddle.y = playerpaddle.y-10;
}

if (keyDown("down")){
playerpaddle.y =playerpaddle.y+10;
}

if (keyDown("right")) {
playerpaddle.x = playerpaddle.x+10;
}

if (keyDown("left")) {
playerpaddle.x = playerpaddle.x-10;
}

computerpaddle.x = ball.x;


drawSprites();
}

function serve() {
ball.velocityX = 4;
ball.velocityY = 3; 
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
