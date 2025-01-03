export const solveMazeBFS = async (
  maze: number[][],
  start: [number, number],
  end: [number, number],
  onStep: (newMaze: number[][], currentPosition: [number, number]) => void,
  delay: number = 100
): Promise<number[][]> => {
  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const rows = maze.length;
  const cols = maze[0].length;

  const queue: [number, number][] = [start];
  const visited = new Set<string>();
  visited.add(`${start[0]},${start[1]}`);

  const newMaze = maze.map((row) => [...row]);

  const pathMap = new Map<string, [number, number]>();

  console.log("Starting BFS...");

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    newMaze[x][y] = 3;
    console.log(`Visiting: [${x}, ${y}]`);

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        onStep(newMaze, [x, y]);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (x === end[0] && y === end[1]) {
      console.log("Reached the end!  ", x, y);
      newMaze[end[0]][end[1]] = 3;

      const path: [number, number][] = [];
      let [px, py] = [x, y];

      while (px !== start[0] || py !== start[1]) {
        path.push([px, py]);
        const prev = pathMap.get(`${px},${py}`);
        if (prev) {
          [px, py] = prev;
        } else {
          console.log("Error: No previous point found in pathMap");
          break;
        }
      }
      path.push(start);

      for (const [px, py] of path.reverse()) {
        newMaze[px][py] = 4;

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            onStep(newMaze, [px, py]);
            resolve();
          });
        });

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      return newMaze;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < rows &&
        ny >= 0 &&
        ny < cols &&
        maze[nx][ny] !== 1 &&
        !visited.has(`${nx},${ny}`)
      ) {
        visited.add(`${nx},${ny}`);
        queue.push([nx, ny]);
        pathMap.set(`${nx},${ny}`, [x, y]);
      }
    }
  }

  console.log("No solution found");
  return newMaze;
};
