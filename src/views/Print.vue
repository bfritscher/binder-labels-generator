<template>
    <div class="A4">
      <div class="content">
        <div class="label" v-for="label in labelsLayout"
        :style="{width: `${label.width}mm` , height: `${label.height}mm`,
        left: `${label.left}mm`, top: `${label.top}mm`}">
          <image-zone :src="label.image" @change="label.image = $event"></image-zone>
          <croppa v-model="label.image"></croppa>
        </div>
      </div>
    </div>
</template>

<script>
import ImageZone from "@/components/ImageZone";
export default {
  data() {
    return {
      labels: [
        {
          width: 51,
          height: 134,
          image: ""
        },
        {
          width: 51,
          height: 134,
          image: ""
        }
      ]
    };
  },
  computed: {
    labelsLayout() {
      let left = 0;
      const spacing = 5;
      return this.labels.map(l => {
        // TODO: compute page overflow new page
        l.left = left;
        l.top = 0;
        left += spacing + l.width;
        return l;
      });
    }
  },
  components: {
    ImageZone
  }
};
</script>

<style>
@page {
  size: A4 landscape;
  margin: 0;
}
.label {
  border: 1px solid #333;
  width: 51mm;
  height: 134mm;
  position: absolute;
  overflow: hidden;
}
.content {
  position: absolute;
  left: 2cm;
  right: 2cm;
  top: 2cm;
  bottom: 2cm;
}
.A4 {
  background: white;
  position: relative;
  width: 29.7cm;
  height: 20.9cm;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
html,
body {
  background-color: grey;
}
@media print {
  html,
  body,
  .A4 {
    margin: 0;
    box-shadow: none;
    border: none;
  }
  #nav {
    display: none;
  }
}
</style>
