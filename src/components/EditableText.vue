<template>
  <div contenteditable="true" @input="handleInput($event)"
  :style="{'font-family': item.family,
           'font-size': `${item.size}pt`,
           'font-style': item.fontStyle,
           'height': `${item.height}mm`,
           'width': `${item.width}mm`,
           'vertical-align': item.verticalAlign}" :placeholder="item.placeholder"></div>
</template>

<script>
export default {
  name: "editable-text",
  props: ["item"],
  mounted() {
    this.$el.innerText = this.item.text;
  },
  methods: {
    handleInput(event) {
      this.item.text = event.target.innerText;
    }
  }
};
</script>

<style>
[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
}
</style>
