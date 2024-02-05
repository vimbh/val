import "../components/css/GameContainer.css";
import "../components/css/Layout.css";
import { useState } from "react";


function Home() {

    const [gridSize, setGridSize] = useState(3);

    // Config grid
    const handleGridSize = (e) => {
        const size = parseInt(e.target.value)

        if (!isNaN(size) && size > 0) {
            setGridSize(size)
        } else {
            // Default grid is 3x3
            setGridSize(3);
        }
    }

    function createGrid() {
        
        const gridContainer = []
        const grid = []
        let gridItem = []
        let gridId = 1

        // Create grid element
        for (let i = 0; i < gridSize; i++) {
            gridItem = []
            for (let j = 0; j < gridSize; j++) {
                gridId = j + 1 + i*gridSize
                gridItem.push(
                    <div 
                    className="grid-object"
                    id={gridId}
                    key={gridId}>
                        {gridId}
                    </div>
                )
            }
            // Create grid row
            grid.push(
                <div className="grid-row">
                    {gridItem}
                </div>
            )
        }

        // Create grid container
        gridContainer.push(
            <div className="grid-container">
                {grid}
            </div>
        )

        return gridContainer
    }
    

    return (

       <div>
            <input onChange={handleGridSize}/>
            {gridSize}
                
            <div className="center">
                {createGrid()}
            </div>
                
        </div>
    );
}

export default Home