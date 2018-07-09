<template>
    <div class="my-menu">
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
</template>

<script>
export default {
  name: "my-menu",
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
.my-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
}
</style>
