function dfs(graph, root) {
  const n = graph.length;
  const visited = new Array(n).fill(false);
  const result = [];

  function rec_dfs(v) {
    visited[v] = true;
    result.push(v);
    
    for (let i = 0; i < n; i++) {
      if (graph[v][i] === 1 && !visited[i]) {
        rec_dfs(i);
      }
    }
  }

  rec_dfs(root);
  return result;
}

console.log(dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1))