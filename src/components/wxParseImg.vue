<template>
  <image
    :mode="node.attr.mode"
    :lazy-load="node.attr.lazyLoad"
    :class="node.classStr"
    :style="newStyleStr || node.styleStr"
    :data-src="node.attr.src"
    :src="node.attr.src"
    @tap="wxParseImgTap"
    @load="wxParseImgLoad"
    />
</template>

<script>
export default {
  name: 'wxParseImg',
  data() {
    return {
      newStyleStr: '',
      preview: true,
    };
  },
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    wxParseImgTap(e) {
      if (!this.preview) return;
      const { src } = e.target.dataset;
      if (!src) return;
      this.node.$host.preview(src, e);
    },
    // 图片视觉宽高计算函数区
    wxParseImgLoad(e) {
      const { src } = e.target.dataset;
      if (!src) return;
      const { width, height } = e.mp.detail;
      const recal = this.wxAutoImageCal(width, height);
      const { imageheight, imageWidth } = recal;
      const { padding, mode } = this.node.attr;
      const { styleStr } = this.node;
      let hasWidth = 0;
      let computeHeight = 0;
      if (styleStr && styleStr.indexOf('width:')) {
        let widthArr = styleStr.split('width:');
        if (widthArr.length > 1) {
          hasWidth = widthArr[1].split('px')[0].trim();
          computeHeight = (imageheight / imageWidth) * hasWidth;
        }
      }
      const imageHeightStyle = mode === 'widthFix' ? '' : `height: ${computeHeight ? computeHeight : imageheight}px;`;
      this.newStyleStr = `${imageHeightStyle}; width: ${hasWidth ? hasWidth : imageWidth}px; ${styleStr}; padding: 0 ${+padding}px; margin: 0 auto; display: block;`;
    },
    // 计算视觉优先的图片宽高
    wxAutoImageCal(originalWidth, originalHeight) {
      // 获取图片的原始长宽
      const { padding } = this.node.attr;
      const windowWidth = this.node.$screen.width - (2 * padding);
      const results = {};

      if (originalWidth < 300 || originalHeight < 50) {
        const { src } = this.node.attr;
        this.node.$host.removeImageUrl(src);
        this.preview = false;
      }

      // 判断按照那种方式进行缩放
      if (originalWidth > windowWidth) {
        // 在图片width大于手机屏幕width时候
        const showImageWidth = Number(windowWidth) - 50;
        results.imageWidth = showImageWidth;
        results.imageheight = showImageWidth * (originalHeight / originalWidth);
      } else {
        // 否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }

      return results;
    },
  },
};
</script>
