<script>
	import Square from "./Square.svelte";
    import state from "./stores";

    import GameEnd from "./GameEnd.svelte";

	$: width = $state.game.width;
    $: height = $state.game.height;

    $: minutes = Math.floor($state.game.time/60);
    $: seconds = $state.game.time%60;


</script>

<style>
	.row {
		display: flex;
        margin: 0 auto;
        padding: 0;
	}
    .table {
        display: flex;
        flex-direction: column;
    }
    .container {
        border-style: double;
        display: inline-block;
        padding: 5px;
    }
    h2, h4 {
        margin: 10px;
    }
</style>
<div class="container" on:contextmenu|preventDefault={()=>0}>
    <h2>
        {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </h2>
    <h4>
        Remaining: {$state.game.mines - $state.game.marked}
    </h4>
    <div class="table">
        {#each [...Array(parseInt(height)).keys()] as i}
            <div class="row">
                {#each [...Array(parseInt(width)).keys()] as j}
                    <Square row={i} column={j}/>
                {/each}
                </div>
        {/each}
    </div>
    <GameEnd/>
</div>