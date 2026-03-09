<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: black;
  color: white;
}

#app {
  font-family: 'Star Jedi', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0;
  background-color: #000000;
}
.card-header{
  font-family: "Orbitron", sans-serif !important; 
}


/* Star Wars glowing titles effect */
h1, h2, h3, h4, h5, h6, .card-header, .navbar-brand, .card-title {
  font-family: 'Star Wars', sans-serif;
  text-shadow: 0 0 1px #00f, 0 0 3px #00f, 0 0 10px #00f, 0 0 15px #00f
}

/* Star Wars glowing buttons effect on hover */
.btn-primary:hover {
  box-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f, 0 0 20px #00f;
  text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f, 0 0 20px #00f;
}

.btn-success:hover {
  box-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
}
</style>
