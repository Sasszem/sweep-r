<script>
    import state from "../stores";

    let width = 10;
    let height = 10;
    let mines = 20;

    
    $: widthValid = width > 1;
    $: heightValid = height > 1;
    $: minesValid = mines < width * height;
    $: valid = widthValid && heightValid && minesValid;

    function click() {
        if (valid)
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
        margin-bottom: 3px;
    }
    .hidden {
        display: none;
    }
    .error {
        background-color: red;
        color: silver;
        margin: 0;
        border-radius: 5px;
        margin-bottom: 3px;
    }
</style>

<div>
    <label>Width: <input bind:value={width}></label>
    <p class="error" class:hidden={widthValid}>Width is too small!</p>
    <label>Height: <input bind:value={height}></label>
    <p class="error" class:hidden={heightValid}>Height is too small!</p>
    <label>Mines: <input bind:value={mines}></label>
    <p class="error" class:hidden={minesValid}>Too many mines!</p>
    <button on:click={click}>Start</button>
</div>
