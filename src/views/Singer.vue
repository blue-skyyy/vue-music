<!--
 * @Author: haopeiwei
 * @Date: 2019-08-19 13:58:11
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-27 15:16:18
 -->
<template>
  <div class="singer"
       v-if="singerList.length"
       ref="singer">

    <list-view :data="singerList"
               @getSingerLists="_getSingerLists"
               @selectSingerById="_selectSingerById"
               :titleIndex="titleIndex"
               :title="titleName"></list-view>
    <router-view></router-view>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getSingerLists } from "@/api/singer";
import ListView from "@/base/listview/listview.vue";
import configData from "./singerConfig";
import { Mutation } from "vuex-class";

interface ISingerInfo {
  country: string;
  /* eslint-disable */
  singer_id: number;
  singer_mid: string;
  singer_name: string;
  singer_pic: string | null;
}

@Component({
  components: {
    ListView
  }
})
export default class Singer extends Vue {
  public singerList: Array<object> = [];
  public titleIndex: string = "-100";
  public titleName: string = " ";

  @Mutation("singer/SET_SINGER") private setSinger: any;

  created() {
    this._getSingerLists(this.titleIndex);
    // console.log("getSingerA", this.getSingerA);
  }

  _getSingerLists(index: any) {
    getSingerLists(index).then((res: any) => {
      if (res.code === 0) {
        this.singerList = res.singerList.data.singerlist.slice(0, 20);
        this._getTitleName(index);
        this.titleIndex = index;
      }
    });
  }
  _getTitleName(id: string): void {
    this.titleName = configData.filter(d => d.id === Number(id))[0].name;
  }

  _selectSingerById(singer: ISingerInfo): void {
    this.$router.push({
      path: `/singer/${singer["singer_mid"]}`
    });
    this.setSinger(singer);
  }
  // ...mapMutations("singer", {
  //   setSinger: "SETSINGER",
  // });
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
