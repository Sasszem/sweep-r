<script>
    import state from "../stores";

    let width = 10;
    let height = 10;
    let mines = 20;

    function click() {
        state.startGame(width, height, mines);
    }
</script>

<style>
    button {
        display: block;
        margin: 0 auto;
    }
    div {
        padding: 30px;
    }
    input {
        text-align: center;
    }
</style>

<div>
    <label>Width: </label><input bind:value={width}>
    <label>Height: </label><input bind:value={height}>
    <label>Mines: </label><input bind:value={mines}>
    <button on:click={click}>Start</button>
</div>