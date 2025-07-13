// sequential search

const arr = [4, 3, 2, 6, 9, 8, 1];

function sequentialSearch(arr: Array<number>, target: number): boolean {
  if (arr.length == 0) return false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) return true;
  }

  return false;
}

console.log(sequentialSearch(arr, 19));
