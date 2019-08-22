/*
 * @Author: hpw
 * @Date: 2019-08-22 16:18:27
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-22 20:06:04
 */
// URI
// https://u.y.qq.com/cgi-bin/musicu.fcg?

// singermid 不同

// 薛之谦
// -: getUCGI2547513074476524
// g_tk: 1046670221
// loginUin: 936684108
// hostUin: 0
// format: json
// inCharset: utf8
// outCharset: utf-8
// notice: 0
// platform: yqq.json
// needNewCode: 0
// data: {"comm":{"ct":24,"cv":0},
// "singer":{"method":"get_singer_detail_info",
// "param":{"sort":5,"singermid":"002J4UUk29y8BY","sin":0,"num":10},"module":"music.web_singer_info_svr"}}

// 陈雪凝

// -: getUCGI49548262698498546
// g_tk: 1046670221
// loginUin: 936684108
// hostUin: 0
// format: json
// inCharset: utf8
// outCharset: utf-8
// notice: 0
// platform: yqq.json
// needNewCode: 0
// data: {"comm":{"ct":24,"cv":0},
// "singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":"004V53Ga0bV65j","sin":0,"num":10},"module":"music.web_singer_info_svr"}}

import axios from "axios";
import { toQueryString } from "../common/js/utils";

export function getSingerDetail(singeId: string) {
  let params = {
    "-": "getUCGI49548262698498546",
    "g_tk": 1046670221,
    "hostUin": 0,
    "format": "json",
    "inCharset": "utf8",
    "outCharset": "utf - 8",
    "notice": 0,
    "platform": "yqq.json",
    "needNewCode": 0,
    "data": `{
      "comm":{"ct":24,"cv":0},
      "singer":{
        "method":"get_singer_detail_info",
        "param":{"sort":5,"singermid":${singeId},"sin":0,"num":20}, 
        "module":"music.web_singer_info_svr"}
      }`
  };
  return new Promise((resolve, reject) => {
    axios.get(`/api/singerDetail?${encodeURI(toQueryString(params))}`).then(res => {
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
}
