'use strict';

// returns a random element from an array
const randomElem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

// CLASS SHAPE /////////////////
class Shape {
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

      if (block.x > maxX) maxX = block.x;
      if (block.y > maxY) maxY = block.y;

      if (block.x < minX) minX = block.x;
      if (block.y < minY) minY = block.y;
    });

    this.width = maxX + 1;
    this.height = maxY + 1;

    this.offsetX = minX;
    // this.offsetY = minY;

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

      // noinspection JSSuspiciousNameCombination
      let new_x = -block.y;
      // noinspection JSSuspiciousNameCombination
      let new_y = block.x;

      block.x = new_x - 0.5 + this.centerX;
      block.y = new_y - 0.5 + this.centerY;

      if (block.x > maxX) maxX = block.x;
      if (block.y > maxY) maxY = block.y;

      if (block.x < minX) minX = block.x;
      if (block.y < minY) minY = block.y;
    });

    this.width = maxX + 1;
    this.height = maxY + 1;

    this.offsetX = minX;
    // this.offsetY = minY;
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
};

const keys = {
  up: false,
  left: false,
  down: false,
  right: false,
};
// END OF GLOBAL VARIABLES /////////////////

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

const boardPlusActiveShape = () => {
  let ok = true;
  const filledOnes = game.tetrisBoard.filter(() => true);
  filledOnes.forEach((boardBlock) => {
    for (let shapeBlock of game.activeShape.blocks) {
      if (shapeBlock.x + game.activeShape.x === boardBlock.x && shapeBlock.y + game.activeShape.y === boardBlock.y) {
        ok = false;
        break;
      }
    }
  });

  if (!ok)
    return ok;

  for (let shapeBlock of game.activeShape.blocks) {
    filledOnes.push({x: shapeBlock.x + game.activeShape.x, y: shapeBlock.y + game.activeShape.y});
  }

  return filledOnes;

};

const clearFullRows = (board) => {
  for (let i = 0; i < game.config.tetrisBoardHeight; i++) {
    const row = board.filter(block => block.y === i);
    if (row && row.length === game.config.tetrisBoardWidth) {
      const below = board.filter(block => block.y > i);
      const above = board.filter(block => block.y < i);
      above.forEach((block) => {block.y++;});
      return clearFullRows(above.concat(below));
    }
  }
  return board;
};

const logic = () => {
  const curTime = new Date().getTime();
  const gravTime = keys.down ? 50 : 500;

  if (curTime - game.lastGravityTime > gravTime) {
    if (game.activeShape.y + game.activeShape.height === game.config.tetrisBoardHeight) {
      const newBoard = boardPlusActiveShape();

      if (newBoard === false) {
        return false;
      }

      game.tetrisBoard = clearFullRows(newBoard);
      game.activeShape = randomShape(); // new ShapeI(game.config.tetrisBoardWidth);

    } else {
      game.activeShape.y++;
      const result = boardPlusActiveShape();
      if (result === false) {
        game.activeShape.y--;
        const newBoard = boardPlusActiveShape();

        if (newBoard === false) {
          return false;
        }

        game.tetrisBoard = clearFullRows(newBoard);
        game.activeShape = randomShape(); // new ShapeI(game.config.tetrisBoardWidth);
      }
    }
    game.lastGravityTime = new Date().getTime();
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
    game.activeShape.rotate();
    keys.up = false;
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

  // draw borders around the shape
  // drawBlock(game.activeShape.x + game.activeShape.offsetX, game.activeShape.y + game.activeShape.offsetY, 'rgba(200,0,0,0.2)');
  // drawBlock(game.activeShape.x + game.activeShape.width - 1, game.activeShape.y + game.activeShape.height - 1, 'rgba(200,0,0,0.2)');

};

const gameLoop = () => {
  if (logic()) {
    render();
    setTimeout(gameLoop, 10);
  } else {
    alert('Game Over!');
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
  }
};

document.onkeyup = ev => {
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
  }
};
// END OF RENDER /////////////////

//////////////////////////

init();
gameLoop();

/////////////////////////