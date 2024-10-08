import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [turn, setTurn] = useState('X');
  let [winner, setWinner] = useState('');
  const [board, setBoard] = useState([]);

  const reset = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setWinner('')
    setTurn(Math.random(2) > 0.5 ? 'X' : 'O');
  }

  const play = (i, j) => {
    if (board[i][j] !== null || winner !== '') return;
    board[i][j] = turn;
    setBoard(board);
    setTurn(turn === 'X' ? 'O' : 'X');

    let countMatchDiagonalLeft = 0;
    let countMatchDiagonalRight = 0;
    let diagonalRightIndex = 2;
    
    for (let i=0 ; i<3 ; i++) {
      let countMatchX = 0;
      let countMatchY = 0;

      for (let j=0 ; j<3 ; j++) {
        
        if (board[i][j] === turn) {
          countMatchX++;
        }
        if (board[j][i] === turn) {
          countMatchY++;
        }
        if (i === j && board[j][i] === turn) {
          countMatchDiagonalLeft++;
        }
      }

      if (board[diagonalRightIndex][i] === turn) {
        countMatchDiagonalRight++;
      }

      if (countMatchX === 3 ||
          countMatchY === 3 ||
          countMatchDiagonalLeft === 3 ||
          countMatchDiagonalRight === 3) {
            setWinner(turn);
      }
      diagonalRightIndex--;
    }
  }

  useEffect(() => {
    reset();
  }, [])

  return (
    <div className='game-container'>
      <h1>Tic Tac Toe</h1>
      { winner &&
      <span>{ winner !== '' && <h2>The winner is <br /><span className={winner}>{ winner }</span> 🙌</h2>}</span>  }
      { winner && <h2>Turn {turn}</h2> }
        <div className='board'>
        { board.map((row, i) => {
            return <div className='board-row' key={i}>
              { row.map((cell, j) => {
                return <button
                  className={'board-cell ' + board[i][j]}
                  key={i+j}
                  onClick={() => play(i, j)}>
                    {cell}
                </button>
              })}
            </div>
          })
        }
      </div>
      { winner !==  '' && <button onClick={() => reset()} className='start-button'>Start New</button> }
    </div>
  );
}

export default App;
