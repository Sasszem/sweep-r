<script>import { exclude_internal_props } from "svelte/internal";

    import state from "../stores.js";

    export let row, column;
    $: sq = $state.game.board[row][column];

    function mark(evt) {
        if (!sq.revealed)
            state.mark(row, column);
        evt.target.blur();
    }

    function reveal(evt) {
        if (!sq.marked)
            state.reveal(row, column);
        evt.target.blur();
    }
</script>

<style>
    button {
        width: 2rem;
        height: 2rem;
        margin: 0;
    }
    .c1 {
        background-color: gold;
    }

    .c2 {
        background-color: lightgreen;
    }
    .c3 {
        background-color: pink;
    }
    .c4 {
        background-color: orange;
    }
    .c5 {
        background-color: lightblue;
    }
    .c6 {
        background-color: oliveDrab;
    }
    .c7 {
        background-color: darkOrange;
    }
    .c8 {
        background-color: lightSeaGreen;
    }
    .c0 {
        background-color: silver;
    }

    .red {
        color: red;
    }
</style>

<button class={sq.revealed&&!sq.mine ? `c${sq.value}` : ""} class:red={sq.revealed&&(sq.mine!==sq.marked)} on:contextmenu|preventDefault={mark} on:click={reveal}>
    {#if sq.marked}
        ⚑
    {:else if sq.revealed}
        {#if sq.mine}
            ☢
        {:else}
            {#if sq.value>0}
                {sq.value}
            {/if}
        {/if}
    {/if}
</button>