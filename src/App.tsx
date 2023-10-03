import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import MatrixTable from './Map'
import buildMap from './MapBuilder'

function App() {


  const testMatrix = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const [matrix, setMatrix] = useState<number[][]>(testMatrix)

  return (
    <div className='p-10 flex flex-col items-justify gap-y-10 h-screen h-full w-full bg-gray-800	 '>
        
      <h1 className="text-3xl font-bold text-center">
        (Unecessary) Codenames map builder
      </h1>

    <div className='flex flex-row justify-around' >
      <button className="bg-blue-500 color-slate-200 hover:bg-blue-800 rounded-lg	p-3" 
      onClick={() => {
        setMatrix(buildMap("blue"))
      }}>
        Generate map (Blue team starts)
      </button>
      <button className="bg-red-500 color-slate-200 hover:bg-red-800 rounded-lg	p-3"
         onClick={() => {
          setMatrix(buildMap("red"))
        }}>
        Generate map (Red team starts)
      </button>
    </div>

  

      <div className="flex justify-center items-center">
        <MatrixTable matrix={matrix} />
      </div>
      
    </div>
  )
}

export default App
