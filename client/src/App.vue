<template>
  <nav class="navbar nvabar-expand-md navbar-light ">
    <a class="navbar-brand" href="/">У Дяди Вани</a>
    <div class="navbar-nav">
      <router-link class="nav-link" to="/">Меню</router-link>
      <router-link class="nav-link" to="/create">Добавить блюдо</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  background-color: #F7F8B1
}
body {
  background: 
    radial-gradient(10% 10%,#fff 98%,#0000),
    radial-gradient(54% 54%,#0000 98%,#c39f76) 50px 50px;
  background-size:100px 100px;
}
</style>
