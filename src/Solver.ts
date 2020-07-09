import Game from "./Game";

class Solver {
    
    game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }

    run(): void {
        // run while making changes

        let changed = true;
        while (changed) {
            changed = this.step();
        }
    }

    step(): boolean {
        // single-step and return if changed anything
        const flagged = this.flag();
        const revealed = this.reveal();
        return flagged || revealed;
    }

    flag(): boolean {
        // for each revealed cell
        // if number - mines = #(non-revealed neightbors)
        // flag said neightbors

        let changed = false;

        for (const row of this.game.board) {
            for (const square of row) {
                if (square.revealed) {
                    const adj = this.game.getAdjacent(square);
                    const nonRevealed = adj.filter(sq => !sq.revealed && !sq.marked);
                    const mine = adj.filter(sq => sq.marked);
                    if (nonRevealed.length == square.value - mine.length) {
                        for (const sq of nonRevealed) {
                            if (!sq.marked) {
                                changed = true;
                                this.game.rightClick(sq.i, sq.j);
                            }
                        }
                    }
                }
            }
        }
        return changed;
    }

    reveal(): boolean {
        // for each revealed square
        // if #(flagged neightbors)==value
        // reveal unrevealed neightbors

        let changed = false;

        for (const row of this.game.board) {
            for (const square of row) {
                if (!square.revealed) {
                    continue;
                }
                const adjacent = this.game.getAdjacent(square);
                const flagged = adjacent.filter(sq => sq.marked);
                const unrevealed = adjacent.filter(sq => !sq.revealed && !sq.marked);
                if (flagged.length == square.value) {
                    for (const sq of unrevealed) {
                        changed = true;
                        this.game.leftClick(sq.i, sq.j);
                    }
                }
            }
        }
        return changed;
    }
}

export default Solver;