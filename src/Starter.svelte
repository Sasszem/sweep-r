<script>
    import StarterButton from "./StarterButton.svelte";
    import CustromStarter from "./CustromStarter.svelte";

    let modes = [
        {
            width:8,
            height: 8,
            mines: 10,
        }, 
        {
            width: 16,
            height: 16,
            mines: 40,
        },
        {
            width: 30,
            height: 16,
            mines: 99,
        }, 
    ];
</script>

<style>
    .container {
        width: 50%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 1fr;
    }

    .container::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1/1;
        grid-column: 1/1;
    }

    .inner:first-child {
        grid-row: 1/1;
        grid-column: 1/1;
    }
</style>

<div class="container">
    {#each modes as mode}
        <div class="inner">
            <StarterButton {...mode}/>
        </div>
    {/each}
    <div>
        <CustromStarter/>
    </div>
</div>