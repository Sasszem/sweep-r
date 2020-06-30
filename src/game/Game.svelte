<script>
    import state from "../stores";

	import Square from "./Square.svelte";
    import GameEnd from "./GameEnd.svelte";
    import Info from "./Info.svelte";

	$: width = $state.game.width;
    $: height = $state.game.height;
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
</style>
<div class="container" on:contextmenu|preventDefault={()=>0}>
    <Info/>
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