<script>
  import Circle from './Circle.svelte'
  import Cross from './Cross.svelte'

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

  const generate = (initial) => new Array(9).fill(initial)

  let globalboard = new Array(9).fill(null).map(() => generate(null))

  let recent = generate(true)

  let globalGame = generate(false)

  let result = null
  let turn = 'x'

  const check = (board, i) => {
    if (!board.includes(null)) {
      console.log('draw')
      // result = 'Draw'
    } else if (
      WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
          return board[index] == turn
        })
      })
    ) {
      globalGame[i] = turn
    }
  }

  const setValue = (i, j) => {
    globalboard[i][j] = turn
    globalboard = [...globalboard]

    check(globalboard[i], i)

    turn = turn == 'x' ? 'o' : 'x'
  }

  const handleClick = (i, j) => {
    if (globalboard[i][j] == null && recent[i]) {
      setValue(i, j)

      recent = generate(false)

      if (globalGame != false) {
        recent[j] = true
      } else {
        recent = generate(true)
      }
    }
  }

  const restart = () => {
    globalboard = new Array(9).fill(null).map(() => generate())
    recent = generate(true)
    result = null
    turn = 'x'
  }
</script>

<div class="game">
  {#if !result}
    <div class="globalboard">
      {#each globalboard as globalcell, i}
        <div class="globalsquare {recent[i] ? 'recent' : ''}">
          <div class="board">
            {#if !globalGame[i]}
              {#each globalcell as square, j}
                <div class="square" on:click={() => handleClick(i, j)}>
                  {#if square == 'x'}
                    <Cross />
                  {:else if square == 'o'}
                    <Circle />
                  {/if}
                </div>
              {/each}
            {:else if globalGame[i] == 'x'}
              <Cross large />
            {:else if globalGame[i] == 'o'}
              <Circle large />
            {/if}
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

<style lang="scss">
  $cell-size: 5rem;
  $mark-size: calc($cell-size * 0.9);

  $blue-50: #eff6ff;
  $blue-100: #dbeafe;
  $blue-200: #bfdbfe;
  $blue-300: #93c5fd;
  $blue-400: #60a5fa;
  $blue-500: #3b82f6;
  $blue-600: #2563eb;
  $blue-700: #1d4ed8;
  $blue-800: #1e40af;
  $blue-900: #1e3a8a;

  .container {
    position: relative;
  }

  :global(.circle),
  :global(.cross) {
    stroke: $blue-800;
  }

  .game {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $blue-100;
    color: $blue-700;
    font-size: 3rem;
  }

  .globalboard {
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

  %grid {
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

  .globalsquare {
    @extend %grid;
    border: 3px solid $blue-500;

    &.recent {
      // color: green;

      :global(.circle) {
        // stroke: green;
      }

      .square {
        cursor: pointer;
      }

      .square:hover {
        background-color: $blue-400;
      }

      background-color: $blue-300;
    }
  }

  .square {
    @extend %grid;

    width: $cell-size;
    height: $cell-size;
    border: 2px solid $blue-400;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: default;

    p {
      vertical-align: middle;
    }

    // &:hover {
    //   background-color: $blue-300;
    // }
  }

  .o,
  .x {
    cursor: default;
  }

  #current {
    font-family: sans-serif;
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    color: $blue-600;
    font-size: 1rem;
  }
</style>
