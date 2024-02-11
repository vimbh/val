import { useEffect, useState } from "react";
import image from '../assets/images/cat.jpeg';
import image2 from '../assets/images/cato2.jpeg';

function compArr(a1, a2) {
    var i = a1.length;
    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true
}

function shuffleArray(arr) {

    for (let i = 0; i < arr.length; i++) {

        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function createIdxPairs(m) {

    const idxPairs = [];

    for (let i=0; i < m; i++) {
        for (let j=0; j < m; j++) {
            idxPairs.push([i,j]);
        }
    }

    shuffleArray(idxPairs);

    return idxPairs;
}

function createArray(m) {

    const idxPairs = createIdxPairs(m);

    let loopIdx = 0;
    const grid = Array.from({length: m}, () => Array(m));

    for (let i=0; i < m; i++) {
        for (let j=0; j < m; j++) {
            grid[i][j] = idxPairs[loopIdx++];
        }
    }

    return grid;

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
    
    const [tileDim, setTileDim] = useState(300);

    console.log(board)

    // Update board when size is changed
    useEffect(() => {
        setBoard(createArray(gridSize));
        setEmptyTile(randomEmptyTile(gridSize));
        setTileDim(gridSize*100 + 2*gridSize);
    }, [gridSize])

    // Config grid
    const handleGridSize = (e) => {
        const size = parseInt(e.target.value)

        if (!isNaN(size) && size > 2) {
            setGridSize(size);
        } else {
            // Default grid is 3x3
            setGridSize(3);
            setTileDim(300);
        }
    }


    function swapTiles(rIdx, cIdx) {

        const newBoard = [...board];
    
        // Down
        if (board[rIdx + 1] && compArr(board[rIdx + 1][cIdx], emptyTile)) {
            newBoard[rIdx + 1][cIdx] = board[rIdx][cIdx];
            newBoard[rIdx][cIdx] = emptyTile;
            setBoard(newBoard);
            return;
        }
    
        // Up
        if (board[rIdx - 1] && compArr(board[rIdx - 1][cIdx], emptyTile)) {
            newBoard[rIdx - 1][cIdx] = board[rIdx][cIdx];
            newBoard[rIdx][cIdx] = emptyTile;
            setBoard(newBoard);
            return;
        }
    
        // Right
        if (board[rIdx][cIdx + 1] && compArr(board[rIdx][cIdx + 1], emptyTile)) {
            newBoard[rIdx][cIdx + 1] = board[rIdx][cIdx];
            newBoard[rIdx][cIdx] = emptyTile;
            setBoard(newBoard);
            return;
        } 

        // Left
        if (board[rIdx][cIdx - 1] && compArr(board[rIdx][cIdx - 1], emptyTile)) {
            newBoard[rIdx][cIdx - 1] = board[rIdx][cIdx];
            newBoard[rIdx][cIdx] = emptyTile;
            setBoard(newBoard);
            return;
        }  
        
    }

    const renderedBoard = (
        <div className="grid-container">
            {board.map((rows, rIdx) => (
                <div 
                    className="grid-row" 
                    key={`row-${rIdx}`}
                >
                    {rows.map((col, cIdx) => (
                        <div
                            className="grid-object"
                            key={`col-${cIdx}`}
                            onClick={() => swapTiles(rIdx, cIdx, emptyTile)}
                            style={{
                                backgroundSize: `${tileDim*(gridSize/100 + 1)}%`,
                                backgroundPosition: `${-100*col[1]}px ${-100*col[0]}px`,
                                ...(col[0] === emptyTile[0] && col[1] === emptyTile[1] 
                                    ? { backgroundImage: null } 
                                    : { backgroundImage: `url(${image})` })
                            }}
                        >
                            <div 

                            />
                            {/* {`${rIdx}, ${cIdx}`}
                            {`   [${col[0]},${col[1]}]`} */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    function checkWin() {
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {

                if (!compArr(board[i][j], [i,j])) {
                    return false;
                }
            }
        }
        
        return true;
    }

    function winClick() {

        let newBoard = [...board];
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                newBoard[i][j] = [i,j];
            }
        }

        setBoard(newBoard);
    }

    return (
        <>
            <input onChange={handleGridSize}/>
            <button onClick={winClick}>Win</button>
            {gridSize}
            {board.length > 0 && checkWin() ? 
                console.log("You win!")
                : null    
            }
            {renderedBoard}
        </>
    )
};