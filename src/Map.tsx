import React from "react";

interface MatrixGridProps {
  matrix: number[][];
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ matrix }) => {
  // Function to set the background color based on the matrix value
  const getCellColor = (value: number) => {
    switch (value) {
      case 0:
        return "bg-black";
      case 1:
        return "bg-white";
      case 2:
        return "bg-red-500";
      case 3:
        return "bg-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex">
      
        <div className="w-24 h-12"></div> {/* Empty cell for spacing */}
        {matrix[0].map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="w-24 h-12 m-2 text-center font-bold"
          >
            {colIndex}
          </div>
        ))}
      </div>

      {matrix.map((row, rowIndex) => (
        <div className="flex items-center align-center" key={`row-${rowIndex}`}>
          <div className="w-24 h-12 text-center font-bold p-3 m-2">
            {rowIndex}
          </div>
          {row.map((cell, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={`w-24 h-12 m-2 ${getCellColor(cell)} text-white font-bold flex items-center justify-center`}
            >
            </div>
          ))}
        </div>

      ))}
    </div>
  );
};

export default MatrixGrid;
