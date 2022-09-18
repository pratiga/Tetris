/* eslint-disable no-undef */
import React, { useState } from 'react'
import { createStage, checkCollision } from '../gameHelper';
// Component
import Display from './Display'
import Stage from './Stage'
import StartButton from './StartButton'

// styled Component
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/userPlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });

  }
  const startGame = () => {
    console.log("test")
    //Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false)
  }
  const drop = () => {
    // Increase level when player has cleared 10 rows
    if(rows > (level + (parameter) prev: any
      setLevel()
               
      ))
    
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on")
        setDropTime(1000);
      }
    }
  }

  const dropPlayer = () => {
    console.log("interval off")
    setDropTime(null)
    drop()
  }
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1)
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  }
  useInterval(() => {
    drop();
  }, dropTime)

  return (
    <>
      <StyledTetrisWrapper
        role="button"
        tabIndex="0" 
        onKeyDown={e => move(e)} 
        onKeyUp={keyUp}>
        <StyledTetris>

          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="GameOver" />
            ) : (
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </div>
            )}

            <StartButton callback={startGame} />
          </aside>


        </StyledTetris>
      </StyledTetrisWrapper>

    </>)
}

export default Tetris
