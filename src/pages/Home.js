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
    
    function validMove(e) {

        const state = e.target.classList[1]
        const i = parseInt(e.target.id)
        console.log(i)

        if (state === "fixed") {
            return false
        } 

        // LHS
        if ( i % gridSize != 1) {
            console.log("can move left")
        } 

        // RHS
        if (i % gridSize != 0) {
            console.log("can move right")
        }

        // TOP
        if ( i > gridSize ) {
            console.log("can move up")
        }

        // BOT
        if ( i < (gridSize**2 - (gridSize + 1)) ) {
            console.log("can move down")
        }

    }

    // Move tiles on click
    function moveTile(e) {
        console.log(e.target.id)
        
        if (validMove(e)) {
            console.log("valid")
        } else {
            console.log("stuck")
        }


    }

    function createGrid() {
        
        const gridContainer = []
        const grid = []
        let gridTile = []
        let gridId = 1

        // Pick a random tile to set free b.w [1, n^2]
        const freeTile = Math.floor(Math.random() * gridSize**2) + 1

        // Create grid element
        for (let i = 0; i < gridSize; i++) {
            gridTile = []
            for (let j = 0; j < gridSize; j++) {
                gridId = j + 1 + i*gridSize
                gridTile.push(
                    <div 
                    className={`grid-object ${gridId === freeTile ? 'free' : 'fixed'}`}
                    onClick={moveTile}
                    id={gridId}
                    key={gridId}>
                        {gridId}
                    </div>
                )
            }
            // Create grid row
            grid.push(
                <div 
                className="grid-row"
                id={`gridRow-${i+1}`}
                key={`gridRow-${i+1}`}
                >
                    {gridTile}
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