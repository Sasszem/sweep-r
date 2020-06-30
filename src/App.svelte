<script>
	import Game from "./game/Game.svelte";
	import Starter from "./starting/Starter.svelte";
	import state from "./stores";
</script>

<main>
	{#if $state.state === "game"}
		<Game/>
	{:else}
		<Starter/>
	{/if}
</main>

<style>
	* {
		font-family:'Courier New', Courier, monospace;
	}

	main {
		margin: 0 auto;
		width: 80%;
		border-style: double;
		border-radius: 10px;
		text-align: center;
		padding: 20px;
	}
</style>