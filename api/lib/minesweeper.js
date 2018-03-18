// jshint esversion: 6
'use strict';


/**
 * This module is responsible for the mine sweeper game.
 *
 * The MineSweeper Configuration has the following properties:
 *  - n {Integer}: the length of the x-axis
 *  - m {Integer}: the length of the y-axis
 *  - mines {Integer}: number of mines in the game
 *  - gameState {Array of Status}: the current game state
 *
 * Status is a object with the properties for a cell
 * - status {Integer} the status of the current cell
 *     0: Unflagged. Basically the default state
 *     1: Shown, already expanded
 *     2: Flagged, flagged by user
 * - number {Integer} the number to be displayed (for # of mines around this cell; -1 is a mine)
 *
 * Move is an object with the properties
 * - type {Integer} the type of the move
 *     0: Unflagged. Basically the default state
 *     1: Shown, already expanded
 *     2: Flagged, flagged by user
 * - n {Integer}: the position on x-axis
 * - m {Integer}: the position on y-axis
 * - number {Integer} the number to be displayed (for # of mines around this cell; -1 is a mine)
 *                    Only for type =0
 *
 * idx_in_array = position_x + position_y * n
 * position_x = Math.floor(idx_in_array / n)
 * position_y = idx_in_array % n
 */


/** Creates a new MineSweeper Configuration.
 * @param {n} {Integer} the length of the x-axis of the game.
 * @param {m} {Integer} the length of the y-axis of the game.
 * @param {mines} {Integer} the number of mines for this game.
 * @param skip_x {Integer}: guarantees no mine in this x y position
 * @param skip_y {Integer}: guarantees no mine in this x y position
 *
 * @return {Object} the configuration for the game.
 */
function MineSweeper(n, m, mines, skip_x, skip_y) {
  var game,
    mineLocation,
    i, j, k,
    next,
    tmp,
    status = [],
    rest = n * m - mines;

  if (skip_x && skip_y) {
    rest -= 1;
  }

  // randomize mine locations
  mineLocation = Array(mines)
    .fill(-1)
    .concat(Array(rest).fill(0));

  for (i=0;i<n*m;i++) {
    j = Math.floor(Math.random() * (n * m));
    tmp = mineLocation[j];
    mineLocation[j] = mineLocation[i];
    mineLocation[i] = tmp;
  }

  if (skip_x && skip_y) {
    mineLocation.splice(skip_x + skip_y * n, 0, 0);
  }

  // get numbers for cells.
  for (i=0;i<n*m;i++) {
    if (mineLocation[i] == -1) {
      for (j = -1; j <= 1; j++) {
        for (k=-1; k <= 1; k++) {
          next = i + j * n + k;

          if (next >= 0 &&
              next < m * n &&
              mineLocation[next] !== -1 &&
              !(k == 1 && ((i + 1) % n) == 0) &&
              !(k == - 1 && (i % n) == 0)
              ) {
            mineLocation[next] += 1;
          }
        }
      }
    }
  }
  game = {
    n: n,
    m: m,
    mines: mines,
    gameState: mineLocation.map(function(e) {
      return {
        status: 0,
        number:e
      };
    })
  };
  return game;
}


/** Flags/unflags a cell for the game
 * @param game {Object} a MineSweeper configuration.
 * @param {n} {Integer} the position on the x-axis of the game.
 * @param {m} {Integer} the position on the y-axis of the game.
 *
 * @return {Array of Moves} The array of moves. Empty array on failure.
 */
function flag(game, n, m) {
  var idx = n + m * game.n,
    currStatus = game.gameState[idx].status,
    newStatus;

  if (currStatus === 1) {
    return [];
  } else if (currStatus === 0) {
    newStatus = 2;
  // currStatus === 2
  } else {
    newStatus = 0;
  }
  game.gameState[idx].status = newStatus;
  return [{
    n: n,
    m: m,
    type: newStatus
  }];
}

/** Reveals a cell for the game
 * @param game {Object} a MineSweeper configuration.
 * @param {n} {Integer} the position on the x-axis of the game.
 * @param {m} {Integer} the position on the y-axis of the game.
 *
 * @return {Array of Moves} The array of moves. Empty array on failure.
 */
function reveal(game, n, m, moves) {
  var idx = n + m * game.n,
    curr = game.gameState[idx],
    i, j,
    next;
  moves = moves || [];
  if ((n + m*game.n) >= game.m * game.n || (n + m*game.n) < 0) {
    return moves;
  }
  if (!(curr.status == 1 || curr.status == 2 || curr.number == -1)) {
    moves.push({
      type: 1,
      n: n,
      m: m,
      number: curr.number
    });
    curr.status = 1;
    if (curr.number == 0) {
      for (i=-1;i<=1;i++) {
        for (j=-1;j<=1;j++) {
          next = idx + i * game.n + j;
          if (next >= 0 &&
              next < game.n * game.m &&
              !(j==1 && ((idx + 1) % game.n) == 0) &&
              !(j==-1 && (idx % game.n) == 0) &&
              next != idx) {
            reveal(game, next % game.n, Math.floor(next / game.n), moves);
          }
        }
      }
    }
  }
  return moves;
}

/** Returns true iff there is a mine in this cell.
 * @param game {Object} a MineSweeper configuration.
 * @param {n} {Integer} the position on the x-axis of the game.
 * @param {m} {Integer} the position on the y-axis of the game.
 *
 * @return {Boolean} The true iff there is a mine in this cell.
 */
function checkMine(game, n, m) {
  return game.gameState[n + m * game.n].number == -1;
}

/** Returns a string representation of the game.
 * @param game {Object} a MineSweeper configuration.
 *
 * @return {String} a string representation for the game.
 */
function stringify(game) {
  var i, j, res = "";
  for (i=0; i < game.m; i++) {
    for (j=0; j < game.n; j++) {

      if (game.gameState[i + j * game.n].number == -1) {
        res += 'x';
      } else {
        res += game.gameState[i + j * game.n].number;
      }
    }
    res += '\n';
  }
  return res;
}


module.exports = {
  MineSweeper: MineSweeper,
  checkMine: checkMine,
  reveal: reveal,
  flag: flag,
  stringify:stringify
};
