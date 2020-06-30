<script>
    import state from "./stores";

    export let width, height, mines;

    function click() {
        state.startGame(width, height, mines);
    }
</script>

<style>
    button {
        width: 100%;
        height: 100%;
    }
</style>

<button on:click={click}>{width}x{height}<br>{mines} mines</button>
