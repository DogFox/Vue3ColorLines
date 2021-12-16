function getRandom(max: number):number {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

function getGridIndex(row:number, column: number): number {
  return 9 * row + column + 1;
}

export { getRandom, getGridIndex };
