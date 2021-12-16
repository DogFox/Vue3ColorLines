import { TBall } from './types';
import { getRandom, getGridIndex } from './utils/utils';
import { reactive } from 'vue';

const colorArray = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

function getRandomColor() {
  return colorArray[getRandom(7)];
}

function checkIndexInMap(index: number, map: Map<number, TBall>) {
  const el = map.get(index);
  return el && el.active;
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
    map.set(gridIndex, { index: gridIndex, row: row, column: column, active: true, color: color });
  }
}

function genMap():Map<number, TBall> {
  const map = reactive(new Map<number, TBall>());
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const gridIndex = getGridIndex(row, col);
      map.set(gridIndex, { index: gridIndex, row: row, column: col, active: false, color: 'red' });
    }
  }
  return map;
}

function verticalProcessing(ball: TBall, map: Map<number, TBall>): void {
  const colVertical = ball.column;
  const currentColor = ball.color;

  let startRowVertical = ball.row;
  let endRowVertical = ball.row;
  // Идем вверх от шара и смотрим такие же
  let neighborBall: TBall| undefined = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index - 9) && neighborBall.active) {
    neighborBall = map.get(neighborBall.index - 9);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.active) {
      startRowVertical = neighborBall.row;
    }
  }

  // Вернемся назад к шару и смотрим вниз такие же
  neighborBall = ball;
  while (neighborBall && neighborBall.color === currentColor && map.has(neighborBall.index + 9) && neighborBall.active) {
    neighborBall = map.get(neighborBall.index + 9);
    if (neighborBall && neighborBall.color === currentColor && neighborBall.active) {
      endRowVertical = neighborBall.row;
    }
  }

  if (endRowVertical - startRowVertical + 1 >= 5) {
    for (let index = startRowVertical; index <= endRowVertical; index++) {
      const burnedBall = map.get(getGridIndex(index, colVertical));
      if (burnedBall) {
        burnedBall.active = false;
      }
    }
  }
}

export { verticalProcessing, genMap, nextMove };
