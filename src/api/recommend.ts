/*
 * @Author: hpw
 * @Date: 2019-08-19 14:37:08
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-20 19:23:00
 */
import jsonp from "../common/js/jsonp";
import { commonParams, options } from "./config";
import axios from "axios";
import { toQueryString } from "../common/js/utils";

export function getRecommend(): any {
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  const data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

export function getSongLists() {
  let params = {
    "-": "recom399927852486448",
    "g_tk": 1046670221,
    "loginUin": 936684108,
    "hostUin": 0,
    "format": "json",
    "inCharset": "utf8",
    "outCharset": "utf - 8",
    "notice": 0,
    "platform": "yqq.json",
    "needNewCode": 0,
    /* eslint-disable */
    "data": `{ "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "newsong.NewSongServer", "method": "get_new_song_info", "param": { "type": 5 } }, "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "sin": 0, "num": 10 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": { } }, "toplist": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": { } }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": { } } }`
  };
  return new Promise((reslove, reject) => {
    axios.get(`/api?${encodeURI(toQueryString(params))}`).then((res: any) => {
      console.log("res", res);
      if (res.data.code === 0) {
        reslove(res.data);
      } else {
        reject();
      }
    });
  })
  // console.log(encodeURIComponent(`https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom06687839069714485&g_tk=1046670221&loginUin=936684108&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":10}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}`));

}

