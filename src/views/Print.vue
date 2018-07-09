<template>
  <div>
    <div class="A4">
      <div class="content">
        <div class="label" v-for="label in labelsLayout"
        :style="{width: `${label.width}mm`,
                 height: `${label.height}mm`,
                 left: `${label.left}mm`,
                 top: `${label.top}mm`}">
          <div v-for="item in label.items" class="item"
            :style="{
              width: `${item.width}mm`,
              height: `${item.height}mm`,
              left: `${item.left}mm`,
              top: `${item.top}mm`,
              transform: `translateY(${item.rotate > 0 ? item.width : 0}mm) rotate(${item.rotate}deg)`}">
            <croppa v-if="item.type === 'image'" v-model="item._image" @image-remove="syncRemove"
             @zoom="syncZoom(label)" @move="syncMove(label)" @new-image="syncFile(label)"></croppa>
            <editable-text v-if="item.type === 'text'" :item="item"></editable-text>
          </div>
        </div>
      </div>
    </div>
    <my-menu></my-menu>
  </div>
</template>

<script>
import MyMenu from "@/components/MyMenu.vue";
import EditableText from "@/components/EditableText.vue";

export default {
  name: "print",
  data() {
    return {
      masterLabel: null,
      lastCalled: 0,
      labels: [
        {
          width: 50,
          height: 144,
          template: "id_of_source_template?",
          items: [
            {
              type: "image",
              _image: {},
              data: "",
              top: 125,
              left: 0,
              width: 50,
              height: 18.8,
              rotate: 0
            },
            {
              type: "text",
              text: "test",
              family: "Aclonica",
              size: 12,
              fontStyle: "normal",
              textAlign: "center",
              placeholder: "Some placeholder",
              top: 0,
              left: 0,
              width: 118,
              height: 29.1,
              rotate: 270,
              verticalAlign: "bottom"
            },
            {
              type: "text",
              text: "test",
              family: "Aclonica",
              size: 10,
              fontStyle: "italic",
              textAlign: "center",
              placeholder: "Some placeholder",
              top: 0,
              left: 30.1,
              width: 118,
              height: 19.1,
              rotate: 270,
              verticalAlign: "top"
            },
            // 6.5 x 5
            {
              type: "text",
              text: "test",
              family: "Aclonica",
              size: 10,
              fontStyle: "normal",
              textAlign: "center",
              placeholder: "Some placeholder",
              top: 118,
              left: 0,
              width: 50,
              height: 6.5,
              rotate: 0,
              verticalAlign: "middle"
            }
          ]
        },
        // 118 x 16.1
        // 118 x 11.7
        // 6.6 x 2.8
        {
          width: 51,
          height: 134,
          items: [
            {
              type: "image",
              _image: {}
            }
          ]
        },
        {
          width: 51,
          height: 134,
          items: [
            {
              type: "image",
              _image: {}
            }
          ]
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
      // TODO refactor
      for (let i = 0; i < this.labelsLayout.length; i++) {
        const l = this.labelsLayout[i];
        if (this.labelsLayout.indexOf(label) === 0) {
          const metadata = label.items[0]._image.getMetadata();
          metadata.startX = metadata.startX - i * 400;
          console.log("zoom", i, metadata);
          l.items[0]._image.applyMetadata(metadata);
        }
      }
    },
    syncMove(label) {
      if (new Date().getTime() - this.lastCalled < 1000) return;
      this.lastCalled = new Date().getTime();
      // startX, startY, scale
      const movedIndex = this.labelsLayout.indexOf(label);
      for (let i = 0; i < this.labelsLayout.length; i++) {
        const l = this.labels[i];
        if (l.items[0]._image !== label.items[0]._image) {
          const metadata = label.items[0]._image.getMetadata();
          metadata.startX = metadata.startX - (i - movedIndex) * 400;
          console.log("move", i, metadata);
          l.items[0]._image.applyMetadata(metadata);
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
        if (l.items[0]._image !== label.items[0]._image) {
          l.items[0]._image._onNewFileIn(label.items[0]._image.chosenFile);
        }
      }
      setTimeout(() => {
        this.syncMove(label);
      }, 1000);
    },
    syncRemove() {
      this.masterLabel = null;
      for (let l of this.labels) {
        l.items[0]._image.remove();
      }
    }
  },
  components: {
    MyMenu,
    EditableText
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

.item {
  position: absolute;
  transform-origin: 0 0;
}

.item > div {
  display: table-cell;
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
  .my-menu,
  #nav {
    display: none;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: transparent;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: transparent;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: transparent;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: transparent;
  }
}
</style>
