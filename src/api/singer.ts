/*
 * @Author: hpw
 * @Date: 2019-08-19 14:37:08
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 20:24:45
 */
import axios from "axios";
import { toQueryString } from "../common/js/utils";

// index对应json里的歌手分类 -100 热门 1 A ...
export function getSingerLists(index: string) {
  let params = {
    "-": "getUCGI6460432320023404",
    "g_tk": 1046670221,
    "loginUin": 936684108,
    "format": "json",
    "inCharset": "utf8",
    "outCharset": "utf - 8",
    "notice": 0,
    "platform": "yqq.json",
    "needNewCode": 0,
    // area 200只有内地 -100全部
    "data": `{
      "comm": { "ct": 24, "cv": 0 },
      "singerList": {
        "module": "Music.SingerListServer",
        "method": "get_singer_list",
        "param": { "area": 200, "sex": -100, "genre": -100, "index": ${index}, "sin": 0, "cur_page": 1 }
      }
    }`
  };
  return new Promise((resolve, reject) => {
    axios.get(`/api/singerList?${encodeURI(toQueryString(params))}`).then(res => {
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
}


