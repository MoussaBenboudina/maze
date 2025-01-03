// components/MazeLegend.js
import React from "react";

const MazeLegend = () => {
  return (
    <div className="p-4 text-white text-md w-52">
      <ul className="">
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-white border border-black"></span>
          <span className="ml-2">Path</span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-black border border-black"></span>
          <span className="ml-2">Wall</span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-green-500 border border-black"></span>
          <span className="ml-2">Start</span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-red-500 border border-black"></span>
          <span className="ml-2">End (goal)</span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-yellow-400 border border-black"></span>
          <span className="ml-2">Visited</span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="inline-block w-5 h-5 bg-purple-500 border border-black"></span>
          <span className="ml-2">Final Path</span>
        </li>
      </ul>
    </div>
  );
};

export default MazeLegend;
