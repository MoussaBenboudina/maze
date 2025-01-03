export const solveMazeAStar = async (
  maze: number[][],
  start: [number, number],
  end: [number, number],
  onStep: (newMaze: number[][], currentPosition: [number, number]) => void,
  delay: number = 100 // تأخير بين كل خطوة (بالملي ثانية)
): Promise<number[][]> => {
  const directions: [number, number][] = [
    [0, 1], // اليمين
    [1, 0], // الأسفل
    [0, -1], // اليسار
    [-1, 0], // الأعلى
  ];

  const rows = maze.length;
  const cols = maze[0].length;

  const heuristic = ([x1, y1]: [number, number], [x2, y2]: [number, number]) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2); 
  
  const openSet = new Set<string>([`${start[0]},${start[1]}`]);
  const cameFrom = new Map<string, [number, number]>();
  const gScore = new Map<string, number>([[`${start[0]},${start[1]}`, 0]]);
  const fScore = new Map<string, number>([
    [`${start[0]},${start[1]}`, heuristic(start, end)],
  ]);

  const newMaze = maze.map((row) => [...row]); 

  console.log("Starting A*...");

  while (openSet.size > 0) {
    let current: [number, number] | null = null;
    let currentKey = "";
    let lowestFScore = Infinity;

    for (const key of openSet) {
      const [x, y] = key.split(",").map(Number) as [number, number];
      const score = fScore.get(key) ?? Infinity;
      if (score < lowestFScore) {
        lowestFScore = score;
        current = [x, y];
        currentKey = key;
      }
    }

    if (current === null) {
      break;
    }

    const [x, y] = current;
    if (x === end[0] && y === end[1]) {
      console.log("Reached the end!  ", x, y);
      newMaze[end[0]][end[1]] = 3;

      const path: [number, number][] = [];
      let [px, py] = [x, y];

      while (px !== start[0] || py !== start[1]) {
        path.push([px, py]);
        const prev = cameFrom.get(`${px},${py}`);
        if (prev) {
          [px, py] = prev;
        } else {
          console.log("Error: No previous point found in cameFrom map");
          break;
        }
      }
      path.push(start);

      for (const [px, py] of path.reverse()) {
        newMaze[px][py] = 4; // 4 يمثل المسار النهائي

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

    openSet.delete(currentKey);
    newMaze[x][y] = 3; // 3 represents visited cells

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        onStep(newMaze, [x, y]);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, delay));

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const neighborKey = `${nx},${ny}`;

      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && maze[nx][ny] !== 1) {
        const tentativeGScore = (gScore.get(currentKey) ?? Infinity) + 1;

        if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + heuristic([nx, ny], end));
          if (!openSet.has(neighborKey)) {
            openSet.add(neighborKey);
          }
        }
      }
    }
  }

  console.log("No solution found");
  return newMaze;
};
