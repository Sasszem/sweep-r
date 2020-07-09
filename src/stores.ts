import {writable} from "svelte/store";

import Game from "./Game";
import Solver from "./Solver";

export interface iState {
    game: Game;
    solver: Solver;
    state: string;
}

function makeState() {
    const {update, subscribe} = writable<iState>({
        game: null,
        state: "choose",
        solver: null,
    });

    update(state => {
            const game = new Game(update);
            const solver = new Solver(game);
            return {...state, game, solver};
        }
    );

    return {
        subscribe,

        startGame: (width: number, height: number, mines:number) => {
            update(state => {
                state.game.startGame(width, height, mines);
                return {
                    ...state,
                    state: "game",
                };
            });
        },

        mark: (row, column) => {
            update(state => {
                state.game.rightClick(row, column);
                return state;
            });
        },

        reveal: (row, column) => {
            update(state => {
                state.game.leftClick(row, column);
                return state;
            });
        },

        goHighscores: () => {
            update(state=> {
                return {...state, state: "select"};
            });
        },

        goMenu: () => {
            update(state => {
                return {...state, state: "select"};
            });
        },

        runSolver: () => {
            update(state => {
                state.solver.run();
                return state;
            })
        }
    };
}

export const state = makeState();
export default state;