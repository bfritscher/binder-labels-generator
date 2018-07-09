<template>
    <div class="A4">
      <div class="content">
        <div class="label" v-for="label in labelsLayout"
        :style="{width: `${label.width}mm` , height: `${label.height}mm`,
        left: `${label.left}mm`, top: `${label.top}mm`}">
          <croppa v-model="label.image" @image-remove="syncRemove" @zoom="syncZoom(label)" @move="syncMove(label)" @new-image="syncFile(label)"></croppa>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "print",
  data() {
    return {
      masterLabel: null,
      labels: [
        {
          width: 51,
          height: 134,
          image: {}
        },
        {
          width: 51,
          height: 134,
          image: {}
        },
        {
          width: 51,
          height: 134,
          image: {}
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
  methods: {
    syncZoom(label) {
      // startX, startY, scale
      for (let i = 0; i < this.labelsLayout.length; i++) {
        const l = this.labelsLayout[i];
        if (this.labelsLayout.indexOf(label) === 0) {
          const metadata = label.image.getMetadata();
          metadata.startX = metadata.startX - i * 400;
          console.log("zoom", i, metadata);
          l.image.applyMetadata(metadata);
        }
      }
    },
    syncMove(label) {
      // startX, startY, scale
      const movedIndex = this.labelsLayout.indexOf(label);
      for (let i = 0; i < this.labelsLayout.length; i++) {
        const l = this.labels[i];
        if (l.image !== label.image) {
          const metadata = label.image.getMetadata();
          metadata.startX = metadata.startX - (i - movedIndex) * 400;
          console.log("move", i, metadata);
          l.image.applyMetadata(metadata);
        }
      }
    },
    syncFile(label) {
      if (!this.masterLabel) {
        this.masterLabel = label;
      }
      if (this.masterLabel !== label) {
        return;
      }
      console.log("sync", label);
      for (let l of this.labels) {
        if (l.image !== label.image) {
          l.image._onNewFileIn(label.image.chosenFile);
        }
      }
      setTimeout(() => {
        this.syncMove(label);
      }, 1000);
    },
    syncRemove() {
      this.masterLabel = null;
      for (let l of this.labels) {
        l.image.remove();
      }
    }
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
.croppa-container {
  background-color: transparent !important;
}
.croppa-container:hover {
  opacity: 1;
  background-color: #8ac9ef !important;
}

.croppa-container svg.icon-remove {
  top: 0 !important;
  right: 10px !important;
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

textarea {
  width: 100%;
  height: 200px;
  text-align: center;
  font-size: 23pt;
  overflow: hidden;
  border: none;
  resize: none;
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
  .croppa-container svg.icon-remove,
  #nav {
    display: none;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
      color: transparent;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: transparent;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: transparent;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: transparent;
  }
}
</style>
