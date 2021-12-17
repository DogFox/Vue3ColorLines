function getRandom(max: number):number {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

function getGridIndex(row:number, column: number): number {
  return 10 * row + column + 1;
}
const colorArray = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
// const colorArray = ['red', 'red', 'red', 'red', 'red', 'red', 'red'];

export { getRandom, getGridIndex, colorArray };
