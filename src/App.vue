<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/print">Print</router-link> |
      <router-link to="/about">About</router-link>
      <link :href="`https://fonts.googleapis.com/css?family=${selected.title}`" rel="stylesheet" type="text/css">
      <multiselect v-model="selected" label="title" track-by="title" :options="options" :show-labels="false">
        <template slot="singleLabel" slot-scope="props">
          <span class="option__desc"><span class="option__title"  :style="`font-family: '${props.option.title}'`">{{ props.option.title }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <link :href="`https://fonts.googleapis.com/css?family=${props.option.title}`" rel="stylesheet" type="text/css">
          <div class="option__desc"><span class="option__title" :style="`font-family: '${props.option.title}'`">{{ props.option.title }}</span><span class="option__small"></span></div>
        </template>
      </multiselect>
    </div>

    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: { title: "Aclonica" },
      options: [
        { title: "Aclonica" },
        { title: "Allan" },
        { title: "Annie Use Your Telescope" },
        { title: "Anonymous Pro" }
      ]
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
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
