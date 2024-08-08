import './App.css';
import { Fragment, useEffect, useState } from 'react';

function App() {
  let [turn, setTurn] = useState('X');
  let [winner, setWinner] = useState('');
  const [board, setBoard] = useState([]);

  const reset = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setWinner('')
    setTurn('X')
  }

  const play = (i, j) => {
    if (board[i][j] !== null || winner !== '') return;
    board[i][j] = turn;
    setBoard(board);
    setTurn(turn === 'X' ? 'O' : 'X');

    let countMatchDiagonalLeft = 0;
    let countMatchDiagonalRight = 0;
    let diagonalRightIndex = 2;
    let countMatchX = 0;
    let countMatchY = 0;

    for (let i=0 ; i<3 ; i++) {
      countMatchX = 0;
      countMatchX = 0;

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
    <Fragment>
      <span>Turn { turn }</span>
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

      <span>{ winner !== '' && <span>'The winner is ' winner </span>}</span>
    </Fragment>
  );
}

export default App;
