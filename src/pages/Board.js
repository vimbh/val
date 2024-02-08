import { useEffect, useState } from "react";


function createEmptyBoard(m) {

    return Array.from({length: m}, () => Array(m).fill(1));
};

export default function Board() {

    const [gridSize, setGridSize] = useState(3);
    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(createEmptyBoard(gridSize))
    }, [gridSize])

    // Check if i need empty dep array
    useEffect(() => {
        createEmptyBoard(gridSize)
    })

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

    const renderedBoard = (
        <div className="grid-container">
            {board.map((rows, rIdx) => (
                <div className="grid-row" key={`row-${rIdx}`}>
                    {rows.map((columns, cIdx) => (
                        <div className="grid-object" key={`${rIdx}-${cIdx}`}>
                            n
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    console.log(board)

    return (
        <>
            <input onChange={handleGridSize}/>
            {gridSize}

            {renderedBoard}
        </>
    )
};