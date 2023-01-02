'use strict';

// returns a random element from an array
const randomElem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

// CLASS SHAPE /////////////////
class Shape {
  // x,y : starting top left of the shape
  // centerX, centerY : rotation center of the shape
  // blocks : array of points representing blocks
  //        -- blocks format: {x: number, y: number}
  constructor (x, y, centerX, centerY, blocks) {
    let minX = 9999;
    let minY = 9999;

    let maxX = 0;
    let maxY = 0;

    this.baseBlocks = []; // original blocks of the shape
    this.blocks = []; // rotated ones. this will be drawn

    blocks.forEach((block) => {
      this.baseBlocks.push({x: block.x, y: block.y});

      this.blocks.push({x: block.x, y: block.y});

      // to determine top left and bottom right x,y coordinates
      if (block.x > maxX) maxX = block.x;
      if (block.y > maxY) maxY = block.y;

      if (block.x < minX) minX = block.x;
      if (block.y < minY) minY = block.y;
    });

    // since coordinates starts from 0, we need to add 1 to width and height
    this.width = maxX + 1;
    this.height = maxY + 1;

    // these are the offset coordinates
    this.offsetX = minX;
    // this.offsetY = minY;  // apperantly I haven't used offsetY in the code. weird. so I'll comment it for now

    this.x = x;
    this.y = y;

    this.centerX = centerX;
    this.centerY = centerY;
  }

  rotate () {
    let minX = 9999;
    let minY = 9999;

    let maxX = 0;
    let maxY = 0;

    this.blocks.forEach((block) => {
      block.x = block.x + 0.5 - this.centerX;
      block.y = block.y + 0.5 - this.centerY;

      // let's do some rotation MAGIC ( math... )
      // M A A A A G I I I I C
      // https://en.wikipedia.org/wiki/Rotation_matrix

      // noinspection JSSuspiciousNameCombination
      let new_x = -block.y;
      // noinspection JSSuspiciousNameCombination
      let new_y = block.x;

      // end of math magic

      // since block 0,0 actually is between 0,0 and 1,1, it's center is actually at 0.5, 0.5 so we subtract 0.5 from it.
      block.x = new_x - 0.5 + this.centerX;
      block.y = new_y - 0.5 + this.centerY;

      // again, we re-determine top-left and bottom-right of the shape for collision etc.
      if (block.x > maxX) maxX = block.x;
      if (block.y > maxY) maxY = block.y;

      if (block.x < minX) minX = block.x;
      if (block.y < minY) minY = block.y;
    });

    // and add some another magic number 1  W O O H O O O O
    this.width = maxX + 1;
    this.height = maxY + 1;

    this.offsetX = minX;
    // this.offsetY = minY; // I'll comment that for now. Maybe I will use it later?
  }
}
// END OF CLASS SHAPE /////////////////

// SHAPES /////////////////
class ShapeT extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 2;

    const shapeCenterX = 1.5;
    const shapeCenterY = 1.5;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    );
  }
}

class ShapeJ extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 2;

    const shapeCenterX = 1.5;
    const shapeCenterY = 1.5;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    );
  }
}

class ShapeL extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 2;

    const shapeCenterX = 1.5;
    const shapeCenterY = 1.5;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    );
  }
}

class ShapeO extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 3;

    const shapeCenterX = 2;
    const shapeCenterY = 1;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    );
  }
}

class ShapeS extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 2;

    const shapeCenterX = 1.5;
    const shapeCenterY = 1.5;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
      ],
    );
  }
}

class ShapeI extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 4;
    const shapeHeight = 1;

    const shapeCenterX = 2;
    const shapeCenterY = 2;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
      ],
    );
  }
}

class ShapeZ extends Shape {
  constructor (boardWidth) {
    const shapeWidth = 3;
    const shapeHeight = 2;

    const shapeCenterX = 1.5;
    const shapeCenterY = 1.5;

    super(
      Math.floor((boardWidth - shapeWidth) / 2),
      -shapeHeight,
      shapeCenterX,
      shapeCenterY,
      [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    );
  }
}

const randomShape = () => {
  const shapes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  switch (randomElem(shapes)) {
    case 'I':
      return new ShapeI(game.config.tetrisBoardWidth);
    case 'J':
      return new ShapeJ(game.config.tetrisBoardWidth);
    case 'L':
      return new ShapeL(game.config.tetrisBoardWidth);
    case 'O':
      return new ShapeO(game.config.tetrisBoardWidth);
    case 'S':
      return new ShapeS(game.config.tetrisBoardWidth);
    case 'T':
      return new ShapeT(game.config.tetrisBoardWidth);
    case 'Z':
      return new ShapeZ(game.config.tetrisBoardWidth);

  }
};
// END OF SHAPES /////////////////

// GLOBAL VARIABLES /////////////////
const canvas = {
  element: null,
  ctx: null,
};

const game = {
  config: {},
  tetrisBoard: [],
  activeShape: null,
  speed: 1,
  extraSpeed: 0,
  score: 0,
  paused: false,
};

const keys = {
  up: false,
  left: false,
  down: false,
  right: false,
  escape: false,
};
// END OF GLOBAL VARIABLES /////////////////

// INIT /////////////////
const init = () => {
  canvas.element = document.createElement('canvas');
  canvas.ctx = canvas.element.getContext('2d');

  canvas.element.width = 800;
  canvas.element.height = 800;
  canvas.element.style.border = '1px solid black';

  document.body.appendChild(canvas.element);

  ////////////////////

  game.config.tetrisBoardX = 100;
  game.config.tetrisBoardY = 50;
  game.config.tetrisBoardWidth = 14; // how many tetris boxes horizontally
  game.config.tetrisBoardHeight = 30; // how many tetris boxes vertically

  game.config.tetrisBoxSize = 25; // The size of a tetris box in pixels

  game.lastGravityTime = new Date().getTime();

  game.activeShape = randomShape();// new ShapeT(game.config.tetrisBoardWidth);
};
// END OF INIT /////////////////

// DESTROY /////////////////
const destroy = () => {
  canvas.element.outerHTML = '';

  canvas.element = null;
  canvas.ctx = null;

  game.config = {};
  game.tetrisBoard  = [];
  game.activeShape = null;
  game.speed = 1;
  game.extraSpeed = 0;
  game.score = 0;

  keys.up = false;
  keys.down = false;
  keys.left = false;
  keys.right = false;
};
// END OF DESTROY /////////////////

const boardPlusActiveShape = (onlyValidate = false) => {
  // clone tetrisBoard
  const filledOnes = game.tetrisBoard.filter(() => true);

  // For each block of the active shape, check if any one of them is outside of the board
  for (let shapeBlock of game.activeShape.blocks) {
    if (shapeBlock.x + game.activeShape.x < 0 || shapeBlock.x + game.activeShape.x >= game.config.tetrisBoardWidth) {
      return false;
    }
  }

  // for each block in tetrisBoard
  for (const boardBlock of filledOnes) {
    for (let shapeBlock of game.activeShape.blocks) {
      // if tetrisBoard block and activeShape block is colliding, set ok to false
      if (shapeBlock.x + game.activeShape.x === boardBlock.x && shapeBlock.y + game.activeShape.y === boardBlock.y) {
        return false
      }
    }
  }

  if (onlyValidate) {
    return filledOnes;
  }

  // add activeShape to tetrisBoard clone
  for (let shapeBlock of game.activeShape.blocks) {
    filledOnes.push({x: shapeBlock.x + game.activeShape.x, y: shapeBlock.y + game.activeShape.y});
  }

  // return the clone. ( clone = tetrisBoard + activeShape )
  return filledOnes;

};

// it clears any rows if there is 'width' amount of blocks in them. which means it's full
const clearFullRows = (board) => {
  for (let i = 0; i < game.config.tetrisBoardHeight; i++) {
    const row = board.filter(block => block.y === i);
    if (row && row.length === game.config.tetrisBoardWidth) {
	  game.speed = 1;
	  game.score += 1;
      const below = board.filter(block => block.y > i);
      const above = board.filter(block => block.y < i);
      above.forEach((block) => {block.y++;});
      return clearFullRows(above.concat(below));
    }
  }
  return board;
};

const calculateGravTime = () => {
  let gravTime = 250;
  if (keys.down) {
    gravTime *= 0.1;
  }
  gravTime /= (game.speed + game.extraSpeed);
  return gravTime;
};

// main logic part
const logic = () => {
  const curTime = new Date().getTime();
  const gravTime = calculateGravTime();

  // only move the unit down when gravTime amount of time has passed.
  if (curTime - game.lastGravityTime > gravTime) {

    // if the shape is at the bottom of the board
    if (game.activeShape.y + game.activeShape.height === game.config.tetrisBoardHeight) {

      // boardPlusActiveShape either returns false
      //           ---- which means two blocks collide
      // or returns tetrisBoard + activeShape array
      const newBoard = boardPlusActiveShape();

      // if there is collision AT THE FUCKING BOTTOM that means some weird shit is going on. STAHP! NOOOOOOOOOOOOOOOOOO!
      if (newBoard === false) {
        return false;
      }

      game.tetrisBoard = clearFullRows(newBoard);
      game.activeShape = randomShape();

    } else {
      // if shape is not at the bottom of the board but dropping down

      // drop the shape 1 block
      game.activeShape.y++;

      // check if there is a collision
      const result = boardPlusActiveShape();

      // if there is a collision, move the shape up 1 block
      // and then merge tetrisBoard and activeShape
      if (result === false) {
        game.activeShape.y--;
        const newBoard = boardPlusActiveShape();

        // if after moving the block 1 unit up there is still collision which means we are at the top AND GAME IS OVER!
        if (newBoard === false) {
          return false;
        }

        game.tetrisBoard = clearFullRows(newBoard);
        game.activeShape = randomShape(); // new ShapeI(game.config.tetrisBoardWidth);
      }
    }
    game.lastGravityTime = new Date().getTime();
	  game.speed += 0.001;
  }


  if (keys.left) {
    if (game.activeShape.x + game.activeShape.offsetX > 0) {
      game.activeShape.x--;
      const result = boardPlusActiveShape();
      if (!result)
        game.activeShape.x++;
    }
    keys.left = false;
  }

  if (keys.right) {
    if (game.activeShape.x + game.activeShape.width < game.config.tetrisBoardWidth) {
      game.activeShape.x++;
      const result = boardPlusActiveShape();
      if (!result)
        game.activeShape.x--;
    }

    keys.right = false;
  }

  if (keys.up) {
    const rotateActiveShapeIfPossible = (changeX = 0) => {
      const oldBlocks = JSON.parse(JSON.stringify(game.activeShape.blocks));
      const oldWidth = game.activeShape.width;
      const oldHeight = game.activeShape.height;
      const oldX = game.activeShape.x;

      game.activeShape.x += changeX;
      game.activeShape.rotate();

      if (boardPlusActiveShape(true)) {
        return true;
      }

      game.activeShape.blocks = oldBlocks;
      game.activeShape.width = oldWidth;
      game.activeShape.height = oldHeight;
      game.activeShape.x = oldX;

      return false;
    };
    (() => {
      keys.up = false;

      if (rotateActiveShapeIfPossible()) {
        return;
      }

      if (rotateActiveShapeIfPossible(1)) {
        return;
      }

      if (rotateActiveShapeIfPossible(-1)) {
        return;
      }

      if (game.activeShape.height >= 2 && rotateActiveShapeIfPossible(2)) {
        return;
      }

      if (game.activeShape.height >= 2 && rotateActiveShapeIfPossible(-2)) {
        return;
      }
    })();
  }

  return true;

};
// END OF LOGIC /////////////////

const drawBlock = (x, y, color) => {
  if (x >= 0 && y >= 0 && x < game.config.tetrisBoardWidth && y < game.config.tetrisBoardHeight) {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fillRect(
      game.config.tetrisBoardX + x * game.config.tetrisBoxSize + 1,
      game.config.tetrisBoardY + y * game.config.tetrisBoxSize + 1,
      game.config.tetrisBoxSize - 2,
      game.config.tetrisBoxSize - 2,
    );
  } else {
    canvas.ctx.strokeStyle = color;
    canvas.ctx.lineWidth = 1;
    canvas.ctx.strokeRect(
      game.config.tetrisBoardX + x * game.config.tetrisBoxSize + 2,
      game.config.tetrisBoardY + y * game.config.tetrisBoxSize + 2,
      game.config.tetrisBoxSize - 4,
      game.config.tetrisBoxSize - 4,
    );
  }
};
// END OF DRAWBLOCK /////////////////

const render = () => {

  // clear
  canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);

  for (let i = 0; i < game.config.tetrisBoardWidth; i++) {
    for (let j = 0; j < game.config.tetrisBoardHeight; j++) {
      drawBlock(i, j, '#eeeeee');
    }
  }

  // draw the board
  game.tetrisBoard.forEach((block) => {
    drawBlock(block.x, block.y, '#939393');
  });

  // draw the active shape
  game.activeShape.blocks.forEach((block) => {
    drawBlock(block.x + game.activeShape.x, block.y + game.activeShape.y, '#c5c5c5');
  });

  canvas.ctx.fillStyle = "#202020";
  canvas.ctx.strokeStyle = "#202020";
  canvas.ctx.lineWidth = 1;
  canvas.ctx.font = "20px Arial";
  canvas.ctx.fillText("v0.0.7", 600, 20);
  canvas.ctx.fillText("Game Speed: " + Math.round((game.speed + game.extraSpeed) * 100) / 100, 600, 50);
  canvas.ctx.fillText("SCORE: " + game.score, 600, 80);
  canvas.ctx.fillText(game.paused ? "PAUSED" : "", 600, 110);

  // draw borders around the shape
  // drawBlock(game.activeShape.x + game.activeShape.offsetX, game.activeShape.y + game.activeShape.offsetY, 'rgba(200,0,0,0.2)');
  // drawBlock(game.activeShape.x + game.activeShape.width - 1, game.activeShape.y + game.activeShape.height - 1, 'rgba(200,0,0,0.2)');

};

// END OF RENDER /////////////////

const gameLoop = () => {
  if (game.paused) {
    render();
    setTimeout(gameLoop, 33);
    return;
  }
  if (logic()) {
    render();
    setTimeout(gameLoop, 10);
  } else {
    alert('Game Over!');
    destroy();
    init();
    setTimeout(gameLoop, 10);
  }
};

document.onkeydown = ev => {
  switch (ev.key) {
    case 'ArrowDown':
      keys.down = true;
      break;
    case 'ArrowUp':
      keys.up = true;
      break;
    case 'ArrowLeft':
      keys.left = true;
      break;
    case 'ArrowRight':
      keys.right = true;
      break;
    case 'Escape':
      keys.escape = true;
      break;
  }
};

document.onkeyup = ev => {
  console.log('KeyUp Event', ev);
  switch (ev.key) {
    case 'ArrowDown':
      keys.down = false;
      break;
    case 'ArrowUp':
      keys.up = false;
      break;
    case 'ArrowLeft':
      keys.left = false;
      break;
    case 'ArrowRight':
      keys.right = false;
      break;
  case 'Escape':
      keys.escape = false;
      game.paused = !game.paused;
      break;
	case '+':
      game.extraSpeed += 0.25;
      break;
	case '-':
      game.extraSpeed -= 0.25;
      break;
  }
};

let touchEvent;
let activeShapeXAtTouchStart;
let touchTime;
document.ontouchstart = ev => {
  console.log('TouchStart Event', ev);
  touchEvent = ev;
  activeShapeXAtTouchStart = game.activeShape.x;
  touchTime = new Date().getTime();
};

document.ontouchmove = ev => {
  console.log('TouchMove Event', ev);
    const touch = ev.touches[0];
    // calculate delta
    const deltaX = touch.clientX - touchEvent.touches[0].clientX;
    const deltaY = touch.clientY - touchEvent.touches[0].clientY;

    // calculate how many boxes
    const deltaBoxesX = Math.round(deltaX / game.config.tetrisBoxSize);
    const deltaBoxesY = Math.round(deltaY / game.config.tetrisBoxSize);

    // move the shape
    const oldX = game.activeShape.x;
    game.activeShape.x = activeShapeXAtTouchStart + deltaBoxesX;
    if (!boardPlusActiveShape(true)) {
        game.activeShape.x = oldX;
    }

    keys.down = deltaBoxesY > 3;
};

document.ontouchend = ev => {
  console.log('TouchEnd Event', ev);
  touchEvent = null;
  keys.down = false;
  if (touchTime && new Date().getTime() - touchTime < 200) {
    game.activeShape.rotate();
  }
  touchTime = null;
};

document.ontouchcancel = ev => {
  console.log('TouchCancel Event', ev);
  touchEvent = null;
  keys.down = false;
  if (touchTime && new Date().getTime() - touchTime < 200) {
    game.activeShape.rotate();
  }
  touchTime = null;
};

//////////////////////////

init();
gameLoop();

/////////////////////////
