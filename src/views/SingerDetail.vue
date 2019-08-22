<!--
 * @Author: hpw
 * @Date: 2019-08-22 16:00:39
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-22 20:06:52
 -->
<template>
  <transition name="slide-enter">
    <div class="singer-detail">歌手详情</div>

  </transition>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getSingerDetail } from "@/api/singerDetail";
@Component({})
export default class Singer extends Vue {
  // transitionName: string = "slide-left";
  // beforeRouteEnter(to: any, from: any, next: () => void): void {
  //   next();
  // }
  public singerId: string = "";
  created() {
    this.singerId = this.$route.params.id;
    this._getSingerDetail(this.singerId);
    // console.log("this.@router", this.$route.params.id);
  }
  _getSingerDetail(id: string) {
    getSingerDetail(id).then((res: any) => {
      console.log("res", res);
    });
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
  color: #FFF;
}

.slide-enter-active, .slide-leave-active {
  transition: all 2s linear;
  transform: translateX(0, 0);
}

.slide-enter, .slide-leave {
  transform: translateX(100%, 0);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
