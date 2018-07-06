<template>
    <div class="image-zone"
      :class="{'drop-target': dropTarget}"
      @dragleave.prevent.stop="dropTarget=false"
      @dragexit.prevent.stop="dropTarget=false"
      @dragover.prevent.stop="dropTarget=true"
      @dragenter.prevent.stop="dropTarget=true"
      @drop.prevent.stop="handleChange"
      @click="handleClick">
      <div class="image-display"
      :style="{'background-image':  `url(${this.src})`}">
      </div>
      <input style="display:none" type="file" @click.stop @change="handleChange" ref="fileinput">
    </div>
</template>

<script>
export default {
  name: "ImageZone",
  props: {
    src: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      dropTarget: false
    };
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$refs.fileinput.click();
      return true;
    },
    handleChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.dropTarget = false;
      if (files.length > 0 && this.checkFile(files[0])) {
        this.setSourceImg(files[0]);
      } else if (e.dataTransfer) {
        const imageUrl = e.dataTransfer.getData("text/html");
        const extracSrc = /src="?([^"\s]+)"?\s*/;
        const url = extracSrc.exec(imageUrl);
        if (url) {
          this.loadImage(url[1]);
        }
      }
    },
    checkFile(file) {
      if (file.type.indexOf("image") === -1) {
        // TODO handle error message?
        return false;
      }
      return true;
    },
    setSourceImg(file) {
      const fr = new FileReader();
      fr.onload = e => {
        this.loadImage(e.target.result);
      };
      fr.readAsDataURL(file);
    },
    loadImage(src) {
      this.$emit("change", src);
      /*
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {};
      img.src = src;
      */
    }
  }
};
</script>

<style>
.image-zone {
  min-height: 100px;
  position: relative;
}

.image-display {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.drop-target {
  background-color: #dcedc8 !important;
  opacity: 0.6;
}
</style>
