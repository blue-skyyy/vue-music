<!--
 * @Author: haopeiwei
 * @Date: 2019-08-19 13:58:11
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 20:32:24
 -->
<template>
  <div class="singer"
       v-if="singerList.length"
       ref="singer">
    <list-view :data="singerList"
               :title="titleName"></list-view>
    <!-- <list-view @select="selectSinger"
               :data="singers"
               ref="list"></list-view>
    <router-view></router-view> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getSingerLists } from "@/api/singer";
import ListView from "@/base/listview/listview.vue";
import configData from "./singerConfig";

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
    this._getSingerLists();
  }

  _getSingerLists() {
    getSingerLists(this.titleIndex).then((res: any) => {
      if (res.code === 0) {
        this.singerList = res.singerList.data.singerlist.slice(0, 50);
        this._getTitleName(this.titleIndex);
      }
    });
  }

  _getTitleName(id: string): void {
    this.titleName = configData.filter(d => d.id === Number(id))[0].name;
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
