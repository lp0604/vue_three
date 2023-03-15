<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">demo1</router-link> |
      <router-link to="/demo2">demo2</router-link> | -->
      <router-link to="/demo3">demo3</router-link>
      <!-- <router-link to="/demo4">demo4</router-link>
      <router-link to="/demo5">demo5</router-link>
      <router-link to="/demo6">demo6</router-link>
      <router-link to="/demo7">demo7</router-link>
      <router-link to="/demo8">demo8</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
