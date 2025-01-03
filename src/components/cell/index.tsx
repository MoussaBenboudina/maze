type cellProps = {
  rowIndex: number;
  colIndex: number;
  start: [number, number];
  end: [number, number];
  maze: number[][];
};

const Cell = ({ rowIndex, colIndex, start, end, maze }: cellProps) => {
  return (
    <div
      className={`
       ${rowIndex === start[0] && colIndex === start[1] ? "bg-green-600" : ""}
       ${rowIndex === end[0] && colIndex === end[1] ? "bg-red-500" : ""}
       ${
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
    ></div>
  );
};

export default Cell;
