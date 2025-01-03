import { useState } from "react";
import Maze from "./components/maze/maze";
import Controls from "./components/controls";
import MazeLegend from "./components/legend";
const App = () => {
  const initialMaze = Array.from({ length: 30 }, () => Array(30).fill(0));

  const [maze, setMaze] = useState(initialMaze);
  const rows = maze.length;
  const cols = maze[0].length;
  const start: [number, number] = [1, 0];
  const end: [number, number] = [rows - 2, cols - 1];

  // console.log(maze);

  return (
    <div className="bg-[#001f3f] ">
      <div className="flex flex-col justify-center items-center gap-4 h-screen relative  ">
        <div className="absolute top-0 w-full p-2">
          <Controls maze={maze} start={start} end={end} setMaze={setMaze} />
        </div>
        <div className="flex justify-center items-center relative w-full mt-10">
          <div className="absolute left-0 w-fit bg-red">
            <MazeLegend />
          </div>

          <Maze maze={maze} start={start} end={end} />
        </div>
      </div>
    </div>
  );
};

export default App;
