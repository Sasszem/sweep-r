<script>
    import state from "./stores";

    $: result = $state.game.result;

    function menu() {
        state.goMenu();
    }
</script>

<style>
    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
    }
    .hidden {
        visibility: hidden;
    }
    h4 {
        margin: 20px;
    }
</style>

<div class={result ? "" : "hidden"}>
    <h4>
        You {$state.game.result}!
    </h4>
    <button on:click={menu}>Back</button>
</div>