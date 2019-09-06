/*
 * @Author: hpw
 * @Date: 2019-08-19 14:37:08
 * @LastEditors: hpw
 * @LastEditTime: 2019-09-02 11:26:39
 */
import axios from "axios";
import { toQueryString } from "../common/ts/utils";
import { Base64 } from "js-base64";

// 难道vkey
export function getSongUrl(songmid: string) {
  let params = {
    "-": "getplaysongvkey9754293743368967",
    "g_tk": 5381,
    "loginUin": 0,
    "hostUin": 0,
    "format": "json",
    "inCharset": "utf8",
    "outCharset": "utf-8",
    "notice": 0,
    "platform": "yqq.json",
    "needNewCode": 0
  };
  let data = `{"req": {"module": "CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param": {"guid": "2560880300","calltype":0, "userip": ""}},"req_0": {"module": "vkey.GetVkeyServer","method": "CgiGetVkey","param": {"guid": "2560880300","songmid": ["${songmid}"],"songtype": [0],"uin": "0","loginflag": 1,"platform": "20"}},"comm": {"uin": 0,"format": "json","ct": 24,"cv": 0}}`;
  // https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey5782504102237105&g_tk=5381&loginUin=936684108&hostUin=0&
  // format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2560880300","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2560880300","songmid":["0021rBlZ1gQiLy"],"songtype":[0],"uin":"936684108","loginflag":1,"platform":"20"}},"comm":{"uin":"936684108","format":"json","ct":24,"cv":0}}
  return new Promise((resolve, reject) => {
    axios.get(`/api/songUrl?${encodeURI(toQueryString(params))}&data=${encodeURI(data)}`).then(res => {
      if (res.data.code === 0) {
        let host, queryParam;
        if (res.data.req_0.code === 0) {
          host = res.data.req_0.data.sip[0];
          queryParam = res.data.req_0.data.midurlinfo[0].purl + "66";
        } else if (res.data.req.code === 0) {
          host = res.data.req.data.sip[2];
          queryParam = res.data.req.data.keepalivefile;
        }
        resolve(host + queryParam);
      } else {
        reject(res);
      }
    });
  });
}

export function getSonglyric(songmid: string) {
  let params = {
    "-": "MusicJsonCallback_lrc",
    "pcachetime": +new Date(),
    "songmid": `${songmid}`,
    "g_tk": 5381,
    "loginUin": 936684108,
    "hostUin": 0,
    "format": "json",
    "inCharset": "utf8",
    "outCharset": "utf-8",
    "notice": 0,
    "platform": "yqq.json",
    "needNewCode": 0
  };
  // console.log("请求参数", `/api/songLyric?${encodeURI(toQueryString(params))}`);
  return axios.get("/api/songLyric", {
    params
  }).then(res => {
    if (res.data.code === 0) {
      return Promise.resolve(Base64.decode(res.data.lyric));
    }
    return Promise.reject(new Error("获取歌词错误"));
  });
}
