<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Basic</router-link> |
      <router-link to="/toolbar-configuration"
        >Toolbar configuration</router-link
      >
      | <router-link to="/toolbar-custom-ui">Toolbar custom UI</router-link> |
      <router-link to="/pdfjs-interaction">Pdfjs interaction</router-link> |
      <router-link to="/slots">Slots</router-link> |
      <router-link to="/color-customization">Color customization</router-link> |
      <router-link to="/icons-customization">Icons customization</router-link> |
      <router-link to="/theme-toggling">Theme toggling</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &:hover {
      color: chocolate;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style lang="scss" scoped>
.container {
  height: 90vh;
}
</style>