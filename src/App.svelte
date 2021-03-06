<script>
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const generate = () => {
    return new Array(9).fill(null)
  }

  let metaboard = new Array(9).fill(null).map(() => {
    return generate()
  })

  let result = null
  let turn = 'x'

  const setValue = (i, j) => {
    metaboard[i][j] = turn
    metaboard = [...metaboard]
    turn = turn == 'x' ? 'o' : 'x'

    // if (!squares.includes(null)) {
    //   result = 'Draw'
    // } else {
    //   checkWin()
    // }
  }

  console.log(metaboard[0])
  setValue(0, 0)
  console.log(metaboard[0])

  // const checkWin = () => {
  //   for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
  //     if (buttons[WINNING_COMBINATIONS[i][0]] != null) {
  //       if (
  //         buttons[WINNING_COMBINATIONS[i][0]] ==
  //           buttons[WINNING_COMBINATIONS[i][1]] &&
  //         buttons[WINNING_COMBINATIONS[i][1]] ==
  //           buttons[WINNING_COMBINATIONS[i][2]]
  //       ) {
  //         result = 'Winner: ' + buttons[WINNING_COMBINATIONS[i][0]]
  //         break
  //       }
  //     }
  //   }
  // }

  const checkWin = () => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        if (squares[index] == turn) console.log('winner')
      })
    })
  }

  const restart = () => {
    squares = new Array(9).fill(null)
    result = null
    turn = 'x'
  }
</script>

<div class="game">
  {#if !result}
    <div class="metaboard">
      {#each metaboard as board, i}
        <div class="metasquare">
          <div class="board">
            {#each board as square, j}
              <div
                class="square"
                on:click={() => {
                  if (metaboard[i][j] == null) {
                    setValue(i, j)
                  }
                }}
              >
                {square ? square : ''}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <p id="current">Current Player: {turn.toUpperCase()}</p>
  {:else}
    <div>
      {result}
      <div on:click={restart}> Restart </div>
    </div>
  {/if}
</div>

<!-- {#if !result}
  <div class="board">
    {#each squares as square, i}
      <div
        class="square"
        on:click={() => {
          if (squares[i] == null) {
            setValue(i)
          }
        }}
      >
        {square ? square : ''}
      </div>
    {/each}
  </div>
  <p>Current Player: {GameData.current}</p>
{:else}
  <div>
    {result}
    <div on:click={restart}> Restart </div>
  </div>
{/if} -->
<style lang="scss">
  $cell-size: 4.5rem;
  $mark-size: calc($cell-size * 0.9);

  .game {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .metaboard {
    width: 100vh;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, auto);
  }
  .board {
    width: $cell-size * 3;
    height: $cell-size * 3;
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, auto);
    margin: 0.75rem;
  }

  .metasquare {
    border: 1px solid black;

    &:first-child,
    &:nth-child(2),
    &:nth-child(3) {
      border-top: none;
    }

    &:nth-child(3n + 1) {
      border-left: none;
    }

    &:nth-child(3n + 3) {
      border-right: none;
    }

    &:last-child,
    &:nth-child(8),
    &:nth-child(7) {
      border-bottom: none;
    }
  }

  .square {
    width: $cell-size;
    height: $cell-size;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:first-child,
    &:nth-child(2),
    &:nth-child(3) {
      border-top: none;
    }

    &:nth-child(3n + 1) {
      border-left: none;
    }

    &:nth-child(3n + 3) {
      border-right: none;
    }

    &:last-child,
    &:nth-child(8),
    &:nth-child(7) {
      border-bottom: none;
    }

    &:hover {
      background-color: red;
    }
  }

  .o,
  .x {
    cursor: default;
  }

  #current {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
  }
</style>
