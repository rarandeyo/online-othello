import type { UserId } from '$/commonTypesWithClient/branded';
import { colorUseCase } from './colorUseCase';

const board: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const boardUseCase = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    const trunColor = colorUseCase.createColor(userId);

    console.log(111, x, y);
    console.log(x, y);

    const directions = [
      { dx: 0, dy: -1 }, // 上
      { dx: 0, dy: 1 }, // 下
      { dx: -1, dy: 0 }, // 左
      { dx: 1, dy: 0 }, // 右
      { dx: -1, dy: -1 }, // 左上
      { dx: 1, dy: -1 }, // 右上
      { dx: -1, dy: 1 }, // 左下
      { dx: 1, dy: 1 }, // 右下
    ];
    function isValidPosition(board: number[][], i: number, j: number): boolean {
      return i >= 0 && i < board.length && j >= 0 && j < board[i].length;
    }

    function hasEnemyColorInAdjacent(
      board: number[][],
      nx: number,
      ny: number,
      trunColor: number
    ): boolean {
      return board[ny] !== undefined && board[ny][nx] !== 0 && board[ny][nx] !== trunColor;
    }
    function canReachOwnColor(
      board: number[][],
      nx: number,
      ny: number,
      dx: number,
      dy: number,
      trunColor: number
    ): boolean {
      let i = ny;
      let j = nx;

      while (isValidPosition(board, i, j) && board[i][j] !== trunColor) {
        i += dy;
        j += dx;
      }

      return isValidPosition(board, i, j) && board[i][j] === trunColor;
    }

    function convertColors(
      board: number[][],
      x: number,
      y: number,
      i: number,
      j: number,
      dx: number,
      dy: number,
      trunColor: number
    ): void {
      for (
        let k = y, l = x;
        (dy > 0 ? k <= i : k >= i) && (dx > 0 ? l <= j : l >= j);
        k += dy, l += dx
      ) {
        board[k][l] = trunColor;
      }
    }

    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (hasEnemyColorInAdjacent(board, nx, ny, trunColor)) {
        if (canReachOwnColor(board, nx, ny, dx, dy, trunColor)) {
          convertColors(board, x, y, ny + dy, nx + dx, dx, dy, trunColor);
        }
      }
    }

    return board;
  },
};
