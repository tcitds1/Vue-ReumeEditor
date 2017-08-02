<template>
    <div id="Topbar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
            <div class="actions">
                <button class="primary">保存</button>
                <button>预览</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style scoped lang = "scss">
    #Topbar {
        background:#ffffff;
        box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
        >.wrapper {
            min-width: 1024px;
            max-width: 1440px;
            margin: 0 auto ;
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
        }
        .logo {
            font-size: 24px;
            color: #000000;
        }
        button {
            width: 72px;
            height: 32px;
            border: none;
            font-size: 18px;
            background: ddd;
            color: #222;
            cursor: pointer;
            &:hover {
                box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
            }
            &.primary {
                background: #02af5f;
                color: white;
            }
        }
    }

</style>
