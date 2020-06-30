<script>
    import state from "../stores";

    $: minutes = Math.floor($state.game.time/60);
    $: seconds = $state.game.time%60;
</script>

<style>
    h2, h4 {
        margin: 10px;
    }
</style>

<h2>
    {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
</h2>
<h4>
    Remaining: {$state.game.mines - $state.game.marked}
</h4>