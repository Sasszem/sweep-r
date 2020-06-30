import {writable} from "svelte/store";

import Game from "./Game";

export interface iState {
    game: Game;
    state: string;
}

function makeState() {
    const {update, subscribe} = writable<iState>({
        game: null,
        state: "choose",
    });

    update(state => {return {...state, game: new Game(update)};});

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
        }
    };
}

export const state = makeState();
export default state;