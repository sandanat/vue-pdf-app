<template>
  <div id="app">
    <button @click="toggleDirection" type="button">
      Toggle web--page direction
    </button>
    <button @click="clearCache">clear cache</button>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/theme-toggling">Theme toggling</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import "@/sass/icons.scss";

export default {
  methods: {
    toggleDirection() {
      const dir = document.documentElement.getAttribute("dir");
      const newDir = dir === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", newDir);
    },
    clearCache() {
      window.localStorage.clear();
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 95%;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>