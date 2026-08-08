function dfsNQueens(n) {
  if (n < 1) {
    return ([[]]);
  }

  let result = [];

  function dfs(row, cols, diag1, diag2, solution) {
    if (row === n) {
      result.push([...solution]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!cols[col] && !diag1[row - col + n - 1] && !diag2[row + col]) {
        solution.push(col);
        cols[col] = true;
        diag1[row - col + n - 1] = true;
        diag2[row + col] = true;

        dfs(row + 1, cols, diag1, diag2, solution);

        solution.pop();
        cols[col] = false;
        diag1[row - col + n - 1] = false;
        diag2[row + col] = false;

      }
    }
  }
  dfs(0, [], [], [], []);

  return result;
}

console.log(JSON.stringify(dfsNQueens(5)));