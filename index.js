function dfs(graph, root) {
  const list = toList(graph);
  const n = graph.length;
  const result = [];
  const visited = new Array(n).fill(false);

  rec_dfs(graph, root, result, visited, list);
  
  return result;
}

function rec_dfs(graph, v=root, result, visited, list) {
  visited[v] = true;
  console.log(`v: ${v}`)
  result.push(v);
  for (let node of list[v] || []) {
    if (!visited[node]) {
      rec_dfs(graph, node, result, visited, list);
    }
  }
}

function toList(graph) {
  const list = {};

  for (let i = 0; i < graph.length; i++) {
    list[i] = [];
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === 1) {
        if (!list[i].includes(j)) {
          list[i].push(j);
        }
      }
    }
  }
  return list;
}

console.log(JSON.stringify(dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1)));