import { useCallback, useState, useEffect } from "react";
import { solveMazeDFS } from "../../utills/dfs";
import { solveMazeBFS } from "../../utills/bfs";
import { solveMazeBestFirst } from "../../utills/bestFS";
import { solveMazeAStar } from "../../utills/A_star";
import { initialMaze } from "../../utills/mazes";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

type ControlsProps = {
  maze: number[][];
  start: [number, number];
  end: [number, number];
  setMaze: React.Dispatch<React.SetStateAction<number[][]>>;
};

const Controls: React.FC<ControlsProps> = ({ maze, start, end, setMaze }) => {
  const [delay, setDelay] = useState<number>(20);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<
    "BFS" | "DFS" | "A*" | "bestFS"
  >("BFS");
  const [mazeType, setMazeType] = useState<"empty" | "walls">("empty");
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isInitial, setIsInitial] = useState(true);

  const emptyMaze = Array.from({ length: 30 }, () => Array(30).fill(0));
  const mazeWithWalls = initialMaze;

  const handleSolve = useCallback(async () => {
    const algorithmFunc =
      selectedAlgorithm === "DFS"
        ? solveMazeDFS
        : selectedAlgorithm === "BFS"
        ? solveMazeBFS
        : selectedAlgorithm === "bestFS"
        ? solveMazeBestFirst
        : solveMazeAStar;

    const startTime = performance.now();
    setElapsedTime(0);
    setIsSolving(true);

    const id = setInterval(() => {
      setElapsedTime(performance.now() - startTime);
    }, 10);
    setIntervalId(id);

    await algorithmFunc(
      maze,
      start,
      end,
      (newMaze) => {
        setMaze([...newMaze]);
      },
      delay
    );

    clearInterval(id);
    setIntervalId(null);
    setIsSolving(false);
  }, [maze, start, end, setMaze, selectedAlgorithm, delay]);

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlgorithm(event.target.value as "DFS" | "BFS" | "A*" | "bestFS");
  };

  const handleMazeTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = event.target.value as "empty" | "walls";
    setMazeType(selectedType);
    setMaze(selectedType === "empty" ? emptyMaze : mazeWithWalls);
  };

  const resetMaze = () => {
    setMaze(mazeType === "empty" ? emptyMaze : mazeWithWalls);
    setElapsedTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    const isInitial = () => {
      if (
        maze.flat(1).includes(2) ||
        maze.flat(1).includes(3) ||
        maze.flat(1).includes(4)
      ) {
        setIsInitial(false);
      } else {
        setIsInitial(true);
      }
    };
    isInitial();
  }, [maze, setMaze]);
  console.log(isInitial);
  return (
    <div className="w-full flex justify-center items-center gap-0 h-12 border-b py-8 shadow-xl  text-white">
      <select
        value={mazeType}
        onChange={handleMazeTypeChange}
        className="shadow-md rounded-md px-6 py-2 text-sm bg-gray-400 mx-2"
      >
        <option value="empty">Empty Maze</option>
        <option value="walls">Maze with Walls</option>
      </select>

      <select
        value={delay}
        onChange={(e) => setDelay(+e.target.value)}
        className="shadow-md rounded-md px-6 py-2 bg-gray-400 mx-2 "
      >
        <option value="100">100ms</option>
        <option value="50">50ms</option>
        <option value="20">20ms</option>
        <option value="10">10ms</option>
      </select>

      <select
        value={selectedAlgorithm}
        onChange={handleAlgorithmChange}
        className="shadow-md rounded-md px-6 py-2 bg-gray-400 mx-2 "
      >
        <option value="BFS">Solve with BFS</option>
        <option value="DFS">Solve with DFS</option>
        <option value="bestFS">best first search</option>
        <option value="A*">Solve with A*</option>
      </select>

      <button
        className={`bg-green-400 shadow-lg flex justify-center items-center text-md p-2 ml-2 w-10 h-10  rounded-full hover:bg-green-500 ${
          isSolving || !isInitial ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSolve}
        disabled={isSolving || !isInitial}
      >
        <FaPlay />
      </button>
      <button
        className={`bg-red-400 shadow-lg rounded-full p-2 ml-2 text-md font-bold w-10 h-10 flex justify-center items-center hover:bg-red-500 ${
          isSolving ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={resetMaze}
        disabled={isSolving && isInitial}
      >
        <GrPowerReset />
      </button>

      <div className="text-white text-xl ml-4">
        Timer : {(elapsedTime / 1000).toFixed(3)} s
      </div>
    </div>
  );
};

export default Controls;
