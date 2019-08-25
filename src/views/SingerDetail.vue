<!--
 * @Author: hpw
 * @Date: 2019-08-22 16:00:39
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-23 18:03:21
 -->
<template>
  <transition name="slide">

    <!-- dasda -->
    <!-- <tab></tab> -->

    <music-list :singerName="singerName"
                :songsData="songsList"
                :bgImage="bgImage"></music-list>

  </transition>
</template>
<script lang="ts">
interface ISingerInfo {
  country: string;
  /* eslint-disable */
  singer_id: number;
  singer_mid: string;
  singer_name: string;
  singer_pic: string;
}

import { Vue, Component } from "vue-property-decorator";
import { getSingerDetail } from "@/api/singerDetail";
import MusicList from "@/components/music-list/music-list.vue";
import { Getter } from "vuex-class";
import { createSong } from "@/common/ts/song.ts";
const namespace: string = "singer";

@Component({
  components: {
    MusicList
    // tab
  }
})
export default class SingerDetail extends Vue {
  // transitionName: string = "slide-left";
  // beforeRouteEnter(to: any, from: any, next: () => void): void {
  //   next();
  // }
  public singerId: string = "";
  public songsList: Array<object> = [];

  // @Mutation("singer/SET_SINGER") private setSinger: any;
  /* eslint-disable */
  @Getter("getSinger", { namespace }) singerInfo: any;

  public bgImage: string = "";
  public singerName: string = "";

  created() {
    console.log("this.singerInfo", this.singerInfo);
    this._getSingerDetail(this.singerInfo.singer_mid);
    this.bgImage = this.singerInfo.singer_pic;
    this.singerName = this.singerInfo.singer_name;
    // console.log("this.@router", this.$route.params.id);
  }
  _getSingerDetail(id: string) {
    if (!id) this.$router.push("/singer");
    getSingerDetail(id).then((res: any) => {
      console.log("歌手详情页面", res);
      if (res.code === 0) {
        this.songsList = res.singer.data.songlist.map((d: any) =>
          createSong(d)
        );
        console.log(" this.songList", this.songsList);
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';


.slide-enter-active, .slide-leave-active {
  transition: all 0.2s linear;
  transform: translateX(0, 0);
}

.slide-enter, .slide-leave {
  transform: translateX(100%, 0);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
