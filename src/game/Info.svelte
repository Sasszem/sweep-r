<script>
    import state from "../stores";

    $: minutes = Math.floor($state.game.time/60);
    $: seconds = $state.game.time%60;

    function step() {
        state.runSolver();
    }
</script>

<style>
    h2, h4 {
        margin: 5px;
    }

    .outer {
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        width: 90%;
        margin: 0 auto;
        align-items: center;
    }
    button {
        height: 2rem;
    }
</style>

<div class="outer">
    <span></span>
    <div>
        <h2>
            {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </h2>
        <h4>
            Remaining: {$state.game.mines - $state.game.marked}
        </h4>
    </div>
    <button on:click={step}>Hint</button>
</div>