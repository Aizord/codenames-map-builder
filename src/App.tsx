import { useEffect, useState } from 'react'

import './App.css'
import MatrixTable from './Map'
import buildMap from './MapBuilder'
import { Card  } from './Map'


function sleep(ms : number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [lock, setLock] = useState<boolean>(false);
  const initMatrix  = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => ({ value: 0, text: "" }))
);
  const [matrix, setMatrix] = useState<Card[][]>(initMatrix);

  // Function to update the URL parameter
  const updateURLParameter = (paramValue: string | null, locked: boolean) => {
    if (!paramValue) return;
    console.log("UPDATED TO : " + decodeURIComponent(paramValue))
    const newURL = `${window.location.pathname}?map=${paramValue}&locked=${JSON.stringify(locked)}`;
    window.history.pushState({ path: newURL }, '', newURL);
  };

  // Function to retrieve the URL parameter
  const getURLParameter = () => {
    const params = new URLSearchParams(window.location.search);
    console.log("RETRIEVED URL : " + params)
    return {map: params.get('map') || null, locked: JSON.parse(params.get('locked') || "false")};
  };

  useEffect(() => {
    // On component mount, retrieve the parameter from the URL
    const initialParam = getURLParameter();
    if (!initialParam.map) return;
    const initial = decodeURIComponent(initialParam.map!);
    console.log("INIT : "  + initial)
    setMatrix(JSON.parse(initial));
    setLock(initialParam.locked)
  }, []);

  const updateURL = () => {
    const json = JSON.stringify(matrix);
    updateURLParameter(encodeURIComponent(json), lock);
  };

  useEffect(() => {
    console.log("MATRIX CHANGED")

    if(matrix == initMatrix) return;
    updateURL();

  }, [matrix, lock])

  const startRoulette = async (startMatrix: Card[][], startingTeam: string) => {
      const speed = 20; // Milliseconds per update
      const maxIterations = 20; // Fewer iterations for a shorter duration
  
      const easing = (t:number) => {
          // Apply the easing function ln(1/x) for smoother deceleration

          return Math.log(1 / t*0.1 );
      };
  
      let currentValue = startMatrix;
      let iterations = 0;
  
      while (iterations < maxIterations) {
          const progress = iterations / maxIterations;
          currentValue = buildMap(startingTeam);
           // Iterate through the matrices and update the 'text' field in the object matrix
           for (let i = 0; i < currentValue.length; i++) {
            for (let j = 0; j < currentValue[i].length; j++) {
              currentValue[i][j].text = matrix[i][j].text;
            }
          }
          setMatrix(currentValue);
          iterations++;
  
          // Use the easing function to gradually slow down
          const delay = speed * (1 - easing(progress));
          await sleep(delay);
      }
  };
  
  const [buttonText, setButtonText] = useState("Copy URL and share the map (discreetly bro)");

  const handleClick = () => {
    // Change the button text temporarily
    setButtonText('Link copied !');

    // Reset the button text after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setButtonText("Copy URL and share the map (discreetly bro)");
    }, 2000);
  };


  return (
    <div className='p-10 flex flex-col items-center gap-y-10 h-full w-full bg-gray-800 justify-center'>
        
      <h1 className="text-3xl mb-5 font-bold text-center">
        (Unnecessary) Codenames map builder
      </h1>

    { !lock && (
      <div className='flex flex-row justify-around gap-x-2' >
      <button className="bg-blue-500 color-slate-200 hover:bg-blue-800 rounded-full	p-3" 
      onClick={() => {
        startRoulette(matrix, "blue")
      }}>
        Generate map (Blue team starts)
      </button>
      <button className="bg-red-500 color-slate-200 hover:bg-red-800 rounded-full	p-3"
          onClick={() => {
          startRoulette(matrix, "red")
        }}>
        Generate map (Red team starts)
      </button>
      </div>
    )
    }


      <div className="flex justify-center w-full">
        <MatrixTable matrix={matrix} setMatrix={setMatrix}/>
      </div>
      <div className='flex flex-row justify-around gap-x-2' >
      
      <button className={`${lock ? "bg-gray-600 color-slate-200 hover:bg-gray-900" : "bg-yellow-800 color-slate-200 hover:bg-yellow-900"} rounded-full	p-3`}
         onClick={() => {
          setLock(!lock)
        }}>
        {lock ? "Unlock map" : "Lock map" }
      </button>

        <button
        className="bg-indigo-800 color-slate-200 hover:bg-indigo-900 rounded-full	p-3"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          handleClick()
        }}
        >
          {buttonText}
        </button>
  </div>

    </div>
  )
}

export default App


// Lock url
// print url + copy button