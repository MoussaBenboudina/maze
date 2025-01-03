import Cell from "../cell";

type MazeProps = {
  maze: number[][];
  start: [number, number];
  end: [number, number];
};

const Maze: React.FC<MazeProps> = ({ maze, start, end }) => {
  return (
    <div className="shadow-lg w-fit bg-gray-50 ">
      {maze.map((row, rowIndex) => (
        <div className="flex w-fit" key={rowIndex}>
          {row.map((_, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              start={start}
              end={end}
              maze={maze}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;

{
  /* <div
key={`${rowIndex}-${colIndex}`}
className={`${
  rowIndex === start[0] && colIndex === start[1]
    ? "bg-green-600"
    : ""
} ${
  rowIndex === end[0] && colIndex === end[1] ? "bg-red-500" : ""
} ${
  maze[rowIndex][colIndex] === 0
    ? ""
    : maze[rowIndex][colIndex] === 1
    ? " bg-gray-800"
    : maze[rowIndex][colIndex] === 2
    ? " bg-blue-400"
    : maze[rowIndex][colIndex] === 3
    ? " bg-yellow-300"
    : maze[rowIndex][colIndex] === 4
    ? " bg-purple-500"
    : ""
}
 w-5 h-5 border text-[8px]`}
></div> */
}
