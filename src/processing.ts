import { TBall } from './types';
import { getRandom, getGridIndex, colorArray } from './utils/utils';
import { reactive } from 'vue';
import store from './store/index';

function getRandomColor() {
  return colorArray[getRandom(7)];
}

function checkIndexInMap(index: number, map: Map<number, TBall>) {
  const el = map.get(index);
  return el && el.display;
}

function nextMove(map: Map<number, TBall>): void {
  for (let index = 0; index < 3; index++) {
    let row, column, gridIndex;
    do {
      row = getRandom(9);
      column = getRandom(9);
      gridIndex = getGridIndex(row, column);
    } while (checkIndexInMap(gridIndex, map));

    const color = getRandomColor();
    const newBall = { index: gridIndex, row: row, column: column, display: true, color: color };
    map.set(gridIndex, newBall);
    checkMovedBall(newBall, map);
  }
}

function genMap():Map<number, TBall> {
  const map = reactive(new Map<number, TBall>());
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const gridIndex = getGridIndex(row, col);
      map.set(gridIndex, { index: gridIndex, row: row, column: col, display: false, color: 'red' });
    }
  }
  return map;
}

// Поиск в глубину
function checkRoute(currentPosition: TBall, newPosition: TBall, map: Map<number, TBall>): boolean {
  const visited = [] as TBall[];
  const frontier = [] as TBall[];
  frontier.push(currentPosition);

  while (frontier.length > 0) {
    const current = frontier.pop() as TBall;
    visited.push(current);

    if (current.index === newPosition.index) { return true; }

    let neighbours = [] as TBall[];
    if (current) {
      neighbours = generateNeighbours(current, map);
    }
    neighbours.forEach((neighbour: TBall) => {
      if (!neighbour.display && !(visited.filter((position:TBall) => position.index === neighbour.index).length > 0)) {
        frontier.push(neighbour);
      }
    });
  }
  return false;
}

function generateNeighbours(currentPosition: TBall, map: Map<number, TBall>): TBall[] {
  const neighbours = [] as TBall[];
  const topNeighbour = map.get(currentPosition.index - 10);
  if (topNeighbour) {
    neighbours.push(topNeighbour);
  }

  const bottomNeighbour = map.get(currentPosition.index + 10);
  if (bottomNeighbour) {
    neighbours.push(bottomNeighbour);
  }

  // Проверка гарантирует нам, что этот элемент находится с нами на одной строке.
  const leftNeighbour = map.get(currentPosition.index - 1);
  if (leftNeighbour && Math.floor(leftNeighbour.index / 10) === Math.floor(currentPosition.index / 10)) {
    neighbours.push(leftNeighbour);
  }

  const rightNeighbour = map.get(currentPosition.index + 1);
  if (rightNeighbour && Math.floor(rightNeighbour.index / 10) === Math.floor(currentPosition.index / 10)) {
    neighbours.push(rightNeighbour);
  }

  return neighbours;
}

function verticalProcessing(ball: TBall, map: Map<number, TBall>): number[] {
  const colVertical = ball.column;
  const currentColor = ball.color;

  let startRowVertical = ball.row;
  let endRowVertical = ball.row;
  // Идем вверх от шара и смотрим такие же
  let neighborBall: TBall| undefined = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index - 10) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index - 10);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      startRowVertical = neighborBall.row;
    }
  }

  // Вернемся назад к шару и смотрим вниз такие же
  neighborBall = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index + 10) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index + 10);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      endRowVertical = neighborBall.row;
    }
  }

  const burnedBalls = [];
  if (endRowVertical - startRowVertical + 1 >= 5) {
    for (let index = startRowVertical; index <= endRowVertical; index++) {
      burnedBalls.push(getGridIndex(index, colVertical));
    }
  }
  return burnedBalls;
}

function horizontalProcessing(ball: TBall, map: Map<number, TBall>): number[] {
  const rowHorizintal = ball.row;
  const currentColor = ball.color;

  let startColumnHorizontal = ball.column;
  let endColumnHorizontal = ball.column;
  // Идем влево от шара и смотрим такие же
  let neighborBall: TBall| undefined = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index - 1) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index - 1);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      startColumnHorizontal = neighborBall.column;
    }
  }

  // Вернемся назад к шару и смотрим вниз такие же
  neighborBall = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index + 1) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index + 1);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      endColumnHorizontal = neighborBall.column;
    }
  }

  const burnedBalls = [];
  if (endColumnHorizontal - startColumnHorizontal + 1 >= 5) {
    for (let index = startColumnHorizontal; index <= endColumnHorizontal; index++) {
      burnedBalls.push(getGridIndex(rowHorizintal, index));
    }
  }
  return burnedBalls;
}

function leftDiagonalProcessing(ball: TBall, map: Map<number, TBall>): number[] {
  const currentColor = ball.color;

  let startColumnHorizontal = ball.column;
  let endColumnHorizontal = ball.column;
  let startRowVertical = ball.row;
  // Идем влево от шара и смотрим такие же
  let neighborBall: TBall| undefined = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index - 11) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index - 11);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      startColumnHorizontal = neighborBall.column;
      startRowVertical = neighborBall.row;
    }
  }

  // Вернемся назад к шару и смотрим вниз такие же
  neighborBall = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index + 11) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index + 11);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      endColumnHorizontal = neighborBall.column;
    }
  }

  const burnedBalls = [];
  if (endColumnHorizontal - startColumnHorizontal + 1 >= 5) {
    for (let index = startColumnHorizontal; index <= endColumnHorizontal; index++) {
      burnedBalls.push(getGridIndex(startRowVertical, index));
      startRowVertical += 1;
    }
  }
  return burnedBalls;
}
function rightDiagonalProcessing(ball: TBall, map: Map<number, TBall>): number[] {
  const currentColor = ball.color;

  let startColumnHorizontal = ball.column;
  let endColumnHorizontal = ball.column;
  let endRowVertical = ball.row;
  // Идем влево от шара и смотрим такие же
  let neighborBall: TBall| undefined = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index - 9) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index - 9);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      endColumnHorizontal = neighborBall.column;
    }
  }

  // Вернемся назад к шару и смотрим вниз такие же
  neighborBall = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index + 9) && neighborBall.display) {
    neighborBall = map.get(neighborBall.index + 9);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.display) {
      startColumnHorizontal = neighborBall.column;
      endRowVertical = neighborBall.row;
    }
  }

  const burnedBalls = [];
  if (endColumnHorizontal - startColumnHorizontal + 1 >= 5) {
    for (let index = startColumnHorizontal; index <= endColumnHorizontal; index++) {
      burnedBalls.push(getGridIndex(endRowVertical, index));
      endRowVertical -= 1;
    }
  }
  return burnedBalls;
}

function checkMovedBall(ball: TBall, map: Map<number, TBall>): boolean {
  const burnedBalls = [
    ...verticalProcessing(ball, map),
    ...horizontalProcessing(ball, map),
    ...leftDiagonalProcessing(ball, map),
    ...rightDiagonalProcessing(ball, map),
  ];
  if (burnedBalls.length > 0) {
    burnBalls(burnedBalls, map);
    return true;
  }
  return false;
}

function burnBalls(arrayToBurn: number[], map: Map<number, TBall>) :void {
  let count = 0;
  arrayToBurn.forEach((index:number) => {
    const burnedBall = map.get(index);
    if (burnedBall) {
      burnedBall.display = false;
      count++;
    }
  });
  store.commit('SET_SCORE', count);
}

export { verticalProcessing, genMap, nextMove, horizontalProcessing, rightDiagonalProcessing, leftDiagonalProcessing, burnBalls, checkRoute, checkMovedBall };
