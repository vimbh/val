import { useEffect, useState } from "react";
import image from '../assets/images/cat.jpeg';
import image2 from '../assets/images/cato2.jpeg';
import image3 from '../assets/images/catVal.jpg';

import scroll from '../assets/images/scroll.png';


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

function tupToIntArray(arr, emptyTile) {

    const emptyVal = indexToValue(emptyTile, arr.length);
    const tupArr = arr.flat();
    const intArr = [];

    for (const [_, tup] of tupArr.entries()) {

        let val = indexToValue(tup, arr.length);

        if (val !== emptyVal) {

            if (val > emptyVal) {
                val -= 1;
            }

            intArr.push(val);
        }

    }

    return intArr;
}

// convert tuple index (i,j) to integer grid position bound by [0, n-1]
function indexToValue(index, gridSize) {
    
    return gridSize*index[0] + index[1];
}

// Grid is solvable if no. inversions is even
function inversionCheck(indArr, emptyTile) {

    const arr = [...indArr];

    const intArr = tupToIntArray(arr, emptyTile)


    // Map of { value@IdxPos: idxPos }
    const positionMap = new Map();
 
    for (const [idx, val] of intArr.entries()) {

        positionMap.set(val, idx);

    }
     
    let inversions = 0;
     
    for (const [i, val] of arr.entries()) {
        if (val !== i) {

            const correctVal = i;
            const currIdxVal = val;
     
            // Swap the vals
            arr[i] = correctVal;
            arr[positionMap.get(correctVal)] = currIdxVal;
                 
            positionMap.set(currIdxVal, positionMap.get(correctVal));
            positionMap.set(correctVal, i);
     
            inversions++;
        }
    }
     
    if (inversions % 2 === 0) {
        console.log(`nInv even: ${inversions}`);
        return true;
    }

    // alert(`unsolvable board: ${inversions} inversions!`)

    return false;

}

function createIdxPairs(m) {

    const idxPairs = [];

    for (let i=0; i < m; i++) {
        for (let j=0; j < m; j++) {
            idxPairs.push([i,j]);
        }
    }

    shuffleArray(idxPairs);
    console.log(idxPairs)

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

    // return [xIdx, yIdx];
    return [2, 2];
}



export default function Board() {

    const [gridSize, setGridSize] = useState(3);
    const [board, setBoard] = useState([]);
    const [emptyTile, setEmptyTile] = useState(randomEmptyTile(gridSize));
    const [resetBoard, setResetBoard] = useState(false);
    const [tileDim, setTileDim] = useState(300);
    const [itin, setItin] = useState(false);
    const [noPosition, setNoPosition] = useState(40);
    const [yesClick, setYesClick] = useState(false);

    // Update board when size is changed
    useEffect(() => {
        setBoard(createArray(gridSize));
        setEmptyTile(randomEmptyTile(gridSize));
        setTileDim(gridSize*100 + 2*gridSize);
    }, [gridSize])

    // Check if board is solveable
    useEffect(() => {
        if (!inversionCheck(board, emptyTile)) {
            setBoard(createArray(gridSize));
            setResetBoard(true);
            console.log(board);
        }
    }, [resetBoard]);

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
        console.log(board)
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
                                    : { backgroundImage: `url(${image3})` })
                            }}
                        >
                            <div 

                            />
                            {/* {`${rIdx}, ${cIdx}`} */}
                            {/* {`   [${col[0]},${col[1]}]`} */}
                            
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    function resetClick() {
        
        setItin(false);
    }

    function checkWin() {
        if (!itin) {
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (!compArr(board[i][j], [i,j])) {
                        return false;
                    }
                }
            }
            setItin(true);
            return true;
        }
        return false;
    }

    function winClick() {

        let newBoard = [...board];
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                newBoard[i][j] = [i,j];
            }
        }

        setItin(true);
        setBoard(newBoard);
    }

    function handleNoClick() {
        const newNoPosition = noPosition*1.8;
        console.log(newNoPosition)
        setNoPosition(newNoPosition);
    }


    const itinDisplay = (

        <div 
            className="square-move"
            onClick={resetClick} 
            style={{
                contain: 'fill',
                backgroundImage: `url(${scroll})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                height: '600px',
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '50px',
                paddingLeft: '100px',
                paddingTop: '40px',
                position: 'absolute',
                zIndex: '10',
            }}
        >
            <p><b>Bean's Valentines Day Schedule:</b></p>
            <p style={{marginBottom: '2px', lineHeight: '15px'}}>&emsp;</p>
            <p ><b>Morning:</b> Sebbys scroll's (if wake up)</p>
            <p >&emsp;&emsp;<b>11:20am:</b> Movie! Riceboy Sleeps</p>
            <p>&nbsp;<b>1:45pm:</b> Groceries to collect snacks</p>
            <p><b>2:00pm:</b> Sammiches from FrenchFix</p>
            <p>&emsp;&emsp;&emsp;&emsp;<b>2:15pm:</b> Lil cruise </p>
            <p>&nbsp;<b>2:35pm:</b> Picnic at Point Ormond! </p>
        </div>
    );

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:' center', paddingTop: '10%'}}>

            <input onChange={handleGridSize} placeholder="Enter grid size"/>
            
            <button 
                onClick={winClick}
                style={{marginTop: '20px'}}
             >
                Instant Win!
            </button>

            {yesClick && itinDisplay}
            

            {board && renderedBoard}

            {itin && 
                <div style={{ display: 'flex', marginTop: '30px'}}>
                    <button
                        onClick={() => setYesClick(true)}
                    >Yes</button>
                    <button 
                        onClick={handleNoClick}
                        style={{ 
                            position: 'absolute',
                            marginLeft:`${noPosition}px`}}
                    >No</button>
                </div>}

        </div>
    )
};