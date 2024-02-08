import { useEffect, useState } from "react";


function createArray(m) {

    return Array.from({length: m}, () => Array(m).fill(1));
};


function randomEmptyTile(gridSize) {
    const xIdx = Math.floor(Math.random() * gridSize);
    const yIdx = Math.floor(Math.random() * gridSize);

    return [xIdx, yIdx]
}



export default function Board() {

    const [gridSize, setGridSize] = useState(3);
    const [board, setBoard] = useState([]);
    const [emptyTile, setEmptyTile] = useState(randomEmptyTile(gridSize));

    // Update board when size is changed
    useEffect(() => {
        setBoard(createArray(gridSize));
        setEmptyTile(randomEmptyTile(gridSize));
    }, [gridSize])

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

    function swapTiles(rIdx, cIdx) {
        console.log(rIdx, cIdx);
    
        // Swap is based on if the clicked tile is reachable from the empty tile

        // Down
        if ((emptyTile[0] - 1) === rIdx && emptyTile[1] === cIdx) {
            setEmptyTile([rIdx, cIdx]);
        }
    
        // Up
        if ((emptyTile[0] + 1) === rIdx && emptyTile[1] === cIdx) {
            setEmptyTile([rIdx, cIdx]);
        }      
    
        // Right
        if (emptyTile[0] === rIdx && (emptyTile[1] - 1) === cIdx) {
            setEmptyTile([rIdx, cIdx]);
        }    

        // Left
        if (emptyTile[0] === rIdx && (emptyTile[1] + 1) === cIdx) {
            setEmptyTile([rIdx, cIdx]);
        }    
        
    }

    const renderedBoard = (
        <div className="grid-container">
            {board.map((rows, rIdx) => (
                <div 
                    className="grid-row" 
                    key={`row-${rIdx}`}
                >
                    {rows.map((_, cIdx) => (
                        <div
                            className="grid-object"
                            key={`col-${cIdx}`}
                            onClick={() => swapTiles(rIdx, cIdx)}
                            style={rIdx === emptyTile[0] && cIdx === emptyTile[1] ? { backgroundColor: "yellow" } : null}
                        >
                            {`${rIdx}, ${cIdx}`}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <>
            <input onChange={handleGridSize}/>
            {gridSize}

            {renderedBoard}
        </>
    )
};