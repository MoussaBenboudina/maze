import { useState } from "react";
import Maze from "./components/maze/maze";
import Controls from "./components/controls";
import MazeLegend from "./components/legend";

const App = () => {
  const initialMaze = Array.from({ length: 30 }, () => Array(30).fill(0));

  const [maze, setMaze] = useState(initialMaze);
  const [isStart, setIsStart] = useState<boolean>(false);
  const rows = maze.length;
  const cols = maze[0].length;
  const start: [number, number] = [1, 0];
  const end: [number, number] = [rows - 2, cols - 1];

  return (
    <div className="bg-[#001f3f] relative">
      <div className=" lg:hidden fixed inset-0 z-50 bg-gray-800 text-white flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            This site does not work on small screens
          </h1>
          <p className="text-lg mt-4">
            Please use a device with a larger screen.
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        {!isStart && (
          <div className="absolute w-full h-full z-20 bg-cover bg-center backdrop-blur-sm flex justify-center items-center ">
            <div className="bg-gray-950 rounded-md w-[700px] shadow-slate-300 h-80 px-4 py-1 flex flex-col text-white">
              <h2 className="text-3xl text-center text-gray-50 mb-4">TP IA</h2>
              <p className="">
                This project implements the solution of a maze using 6 different
                algorithms.{" "}
              </p>
              <ul className="list-disc pl-5">
                <li>Breadth-First Search (BFS) </li>
                <li> Depth-First Search (DFS) </li>
                <li>Limited Depth-First Search</li>
                <li> Iterative Deepening DFS (IDDFS)</li>
                <li>Best-First Search (BFS) </li>
                <li>A-Star Algorithm (A)* </li>
              </ul>
              <button
                onClick={() => setIsStart(true)}
                className="bg-green-600 text-md hover:bg-green-700 w-56 h-10 rounded-md shadow-md mx-auto my-6 text-white"
              >
                START
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-4 h-screen relative">
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
    </div>
  );
};

export default App;
