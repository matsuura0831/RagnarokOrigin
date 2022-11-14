<template>
  <div id="nav" class="text-center p-5">
    <router-link to="/">Home</router-link> |
    <router-link to="/magic">魔法</router-link> |
    <a href="https://forms.gle/AuTxiqZxtADJG4MT7" target="_blank">お問い合わせ</a>
  </div>

  <router-view />
</template>

<style lang="scss">
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
