<script>
  import { ArraySet, generate } from './utils'

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

  let globalboard = new Array(9).fill(null).map(() => generate(null))

  let gamestate = generate(null)

  let playable = []

  let history = new ArraySet()

  let result = null
  let turn = 'x'

  const check = (board, i) => {
    if (
      WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
          return board[index] === turn
        })
      })
    ) {
      gamestate[i] = turn
    } else if (!board.includes(null)) {
      globalboard[i] = generate(null)
    }
  }

  const setValue = (i, j) => {
    globalboard[i][j] = turn
    globalboard = [...globalboard]

    history.add([i, j])

    check(globalboard[i], i)

    turn = turn === 'x' ? 'o' : 'x'
  }

  const handleClick = (i, j) => {
    if (globalboard[i][j] == null && playable[i]) {
      setValue(i, j)

      // playable.forEach((item, i) => {
      //   if (item) playable[i] = !played[i]
      //   playable[j] = false
      // })

      // if (gamestate[i]) {
      //   console.log(i, gamestate[i])
      //   playable[i] = false

      //   if (playable[i]) {
      //   }
      // } else {
      // }

      // if gamestate[i]

      // else if

      // if (!gamestate[i]) {
      //   playable = generate(false)
      //   playable[j] = true
      // } else if (gamestate[i] && playable[i]) {
      //   playable = generate(true)
      //   playable[i] = false
      // } else {
      //   playable = generate(true)
      //   playable[i] = false
      // }

      // console.log(playable)
      // console.log(gamestate)
    }
  }

  const restart = () => {
    globalboard = new Array(9).fill(null).map(() => generate())
    result = null
    turn = 'x'
  }

  // DEMO VALUES FOR SCREENSHOT
  setValue(4, 4)
  setValue(4, 6)
  setValue(6, 4)
  setValue(4, 0)

  history = [4, 0]

  playable = [1]
</script>

<div class="game">
  {#if !result}
    <div class="globalboard">
      {#each globalboard as globalcell, i}
        <div class="globalsquare {playable[i] ? 'playable' : ''}">
          <div class="board">
            {#if !gamestate[i]}
              {#each globalcell as square, j}
                <div
                  class="square {history[0] == i && history[1] == j
                    ? 'exact-recent'
                    : ''}"
                  on:click={() => handleClick(i, j)}
                >
                  {#if square == 'x'}
                    <Cross />
                  {:else if square == 'o'}
                    <Circle />
                  {/if}
                </div>
              {/each}
            {:else if gamestate[i] == 'x'}
              <Cross large />
            {:else if gamestate[i] == 'o'}
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

  $yellow-50: #fffbeb;
  $yellow-100: #fef3c7;
  $yellow-200: #fde68a;
  $yellow-300: #fcd34d;
  $yellow-400: #fbbf24;
  $yellow-500: #f59e0b;
  $yellow-600: #d97706;
  $yellow-700: #b45309;
  $yellow-800: #92400e;
  $yellow-900: #78350f;

  $red-50: #fef2f2;
  $red-100: #fee2e2;
  $red-200: #fecaca;
  $red-300: #fca5a5;
  $red-400: #f87171;
  $red-500: #ef4444;
  $red-600: #dc2626;
  $red-700: #b91c1c;
  $red-800: #991b1b;
  $red-900: #7f1d1d;

  :global(.mark) {
    stroke: $blue-700;
    background-color: $blue-300;
    cursor: default;
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

    &.playable {
      // color: green;

      // :global(.circle) {
      //   // stroke: green;
      // }

      .square {
        cursor: pointer;

        // &.exact-recent {
        //   background-color: $yellow-300;
        // }
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

    &.exact-recent {
      // background-color: $yellow-200;
      :global(.mark) {
        stroke: $red-600;
      }
    }

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

  .square :global(.mark) {
    background-color: green;
  }

  #current {
    font-family: sans-serif;
    position: absolute;
    bottom: 2rem;
    left: 33rem;
    color: $blue-600;
    font-size: 1rem;
  }
</style>
