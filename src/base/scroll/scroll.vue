<!--
 * @Author: hpw
 * @Date: 2019-08-21 11:25:49
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-27 17:35:00
 -->
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BScroll from "better-scroll";
interface Position {
  x: number;
  y: number;
}
@Component({})
export default class Scroll extends Vue {
  private click: boolean = true;
  private scroll: any = null;
  @Prop({
    type: Number,
    default: 1,
    required: false
  })
  probeType?: number; // 不要在这里写默认值

  @Prop({
    type: Array,
    default: () => [],
    required: false
  })
  data?: any;

  @Prop({
    type: Boolean,
    default: false,
    required: false
  })
  listenScroll?: false;

  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }
  private _initScroll() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper as HTMLElement, {
        probeType: this.probeType, // 取值决定了是否会有监听事件等
        click: this.click
      });

      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", (pos: Position) => {
          me.$emit("scroll", pos);
        });
      }
    });
  }

  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    this.scroll && this.scroll.enable();
  }
  public refresh() {
    this.scroll && this.scroll.refresh();
  }

  public scrollTo(x: number, y: number) {
    this.scroll && this.scroll.scrollTo(x, y, 1000);
  }

  @Watch("data")
  watchData(): void {
    setTimeout(() => {
      this.refresh();
    }, 20);
  }
}
</script>
