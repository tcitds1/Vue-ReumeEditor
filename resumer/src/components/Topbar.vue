<template>
    <div id="Topbar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style>
    #Topbar {
         background:#ffffff;
         box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    }
    #Topbar> .wrapper {
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto ;
        height: 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
    }
    #Topbar .logo {
        font-size: 24px;
        color: #000000;
    }

</style>
