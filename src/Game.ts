
// interface for a single square
interface Square {
    value: number;
    mine: boolean;
    revealed: boolean;
    i: number;
    j: number;
    marked: boolean;
}


// relative indexes for neightbors
const neightbors: [number, number][] = [
    [-1, -1],
    [ 0, -1],
    [ 1, -1],
    [-1,  0],
    [ 1,  0],
    [-1,  1],
    [ 0,  1],
    [ 1,  1],
];

import {iState} from "./stores";

type updaterT = (arg0: iState) => iState;
type updateFnT = (arg0: updaterT) => void;

// game class itself
class Game {
    width = 0;
    height = 0;
    mines = 0;

    time: number;
    marked = 0;
    updateFn: updateFnT;
    started = false;
    updaterTask: number;

    board: Square[][];
    result: "won" | "lost" | null;

    constructor(updateFn: updateFnT) {
        this.updateFn = updateFn;
    }

    emptyBoard(): void {
        this.board = Array<Array<Square>>(this.height);
        for (let i = 0; i<this.height; i++) {
            this.board[i] = Array<Square>(this.width);
            for (let j = 0; j<this.width; j++) {
                this.board[i][j] = {
                    mine: false,
                    value: 0,
                    revealed: false,
                    i,
                    j,
                    marked: false,
                };
            }
        }
    }

    startGame(width: number, height: number, mines: number): void {
        this.width = width;
        this.height = height;
        this.mines = mines;
        this.started = false;
        this.time = 0;
        this.marked = 0;
        this.result = null;
        this.emptyBoard();
    }

    clearBoard(): void {
        for (const row of this.board) {
            for (const sq of row) {
                sq.value = 0;
                sq.mine = false;
                sq.revealed = false;
            }
        }
    }

    placeMines(): void {
        let placedMines = 0;
        while (placedMines < this.mines) {
            const i = Math.floor(Math.random() * this.height);
            const j = Math.floor(Math.random() * this.width);
            if (!this.board[i][j].mine) {
                this.board[i][j].mine = true;
                this.board[i][j].value = 99;
                placedMines++;
            }
        }
    }

    getAdjacent(sq: Square): Square[] {
        return neightbors.map(
            ([di, dj]) => [sq.i + di, sq.j + dj]
        ).filter(
            ([i, j]) => ((i>=0)&&(i<this.height)&&(j>=0)&&(j<this.width))
        ).map(
            ([i, j]) => this.board[i][j]
        );
    }

    updateValues(): void {
        for (const row of this.board) {
            for (const sq of row) {
                sq.value = this.getAdjacent(sq).filter((sq)=>sq.mine).length;
            }
        }
    }

    generateBoard(i: number, j: number): void {
        this.board[i][j].value = 1;
        while (this.board[i][j].value>0 || this.board[i][j].mine) {
            this.clearBoard();
            this.placeMines();
            this.updateValues();
        }
    }

    endGame(res: "won" | "lost"): void {
        this.result = res;
        for (const row of this.board) {
            for (const sq of row) {
                sq.revealed = true;
            }
        }
        this.stopTimer();
    }

    startTimer(): void {
        this.updaterTask = setInterval(()=>{this.time++; this.updateFn(s=>s);}, 1000);
    }

    stopTimer(): void {
        clearInterval(this.updaterTask);
    }

    reveal(sq: Square): void {
        sq.revealed = true;
        if (sq.mine) {
            this.endGame("lost");
        }
        const marked = this.getAdjacent(sq).filter(s => s.marked).length;
        if (sq.value==marked) {
            for (const n of this.getAdjacent(sq).filter(s=>!(s.marked||s.revealed))) {
                this.reveal(n);
            }
        }
    }

    checkWin(): void {
        let markedMine = 0;
        for (const row of this.board) {
            for (const sq of row) {
                if (sq.marked && sq.mine) {
                    markedMine++;
                }
            }
        }
        if (markedMine == this.mines) {
            this.endGame("won");
        }
    }

    leftClick(i: number, j:number): void {
        if (!this.started) {
            this.generateBoard(i, j);
            this.started = true;
            this.startTimer();
        }
        this.reveal(this.board[i][j]);
    }

    rightClick(i: number, j: number): void {
        const sq = this.board[i][j];
        if (sq.marked) {
            sq.marked = false;
            this.marked--;
        } else {
            if (this.marked < this.mines) {
                this.marked++;
                sq.marked = true;
            }
        }
        
        this.checkWin();
    }
}

export default Game;