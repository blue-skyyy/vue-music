<!--
 * @Author: haopeiwei
 * @Date: 2019-08-19 13:58:11
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-22 19:59:13
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

// interface IGetSingerListFunc {
//   (titleIndex: string | number): void;
// }

@Component({
  components: {
    ListView
  }
})
export default class Singer extends Vue {
  public singerList: Array<object> = [];
  public titleIndex: string = "-100";
  public titleName: string = " ";

  created() {
    this._getSingerLists(this.titleIndex);
  }

  _getSingerLists(index: any) {
    getSingerLists(index).then((res: any) => {
      if (res.code === 0) {
        this.singerList = res.singerList.data.singerlist.slice(0, 15);
        this._getTitleName(index);
        this.titleIndex = index;
      }
    });
  }
  _getTitleName(id: string): void {
    this.titleName = configData.filter(d => d.id === Number(id))[0].name;
  }

  _selectSingerById(singerId: string): void {
    this.$router.push({
      path: `/singer/${singerId}`
    });
  }
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
