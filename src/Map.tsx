import React from "react";

export interface Card {
  value: number,
  text: string
}

interface MatrixGridProps {
  matrix: Card[][];
  setMatrix: React.Dispatch<React.SetStateAction<Card[][]>>
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ matrix, setMatrix }) => {


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
    <div className="flex flex-col h-full w-full items-center max-w-screen-md ">
      <div className="flex w-full h-full">
        <div className=" h-full mr-6"></div> {/* Empty cell for spacing */}
        {matrix[0].map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="w-full h-full text-center font-bold "
          >
            {colIndex}
          </div>
        ))}
      </div>

      {matrix.map((row, rowIndex) => (
        <div className="flex w-full h-full gap-5 my-3" key={`row-${rowIndex}`}>
          <div className={`text-center font-bold py-3 mt-2 mr-2`}>
            {rowIndex}
          </div>

          {row.map((cell, colIndex) => (
            <input
              key={`cell-${rowIndex}-${colIndex}`}
              className={`w-full min-h-12 ${getCellColor(cell.value)} text-center rounded-lg ${cell.value == 1 ? "text-black" : "text-white"} font-bold`}
              defaultValue={cell.text}
              onChange={(e) => {
                let newMatrix = JSON.parse(JSON.stringify(matrix));
                newMatrix[rowIndex][colIndex].text = e.target.value;
                console.log(JSON.stringify(newMatrix))
                setMatrix(newMatrix);
              }}
            >
            </input>
          ))}
          
        </div>

      ))}
    </div>
  );
};

export default MatrixGrid;
