/*
 * @Author: hpw
 * @Date: 2019-08-19 14:37:08
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-29 18:01:03
 */
import axios from "axios";
import { toQueryString } from "../common/ts/utils";

// 难道vkey
export function getSong(songmid: string) {
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
    axios.get(`/api/songKey?${encodeURI(toQueryString(params))}&data=${encodeURI(data)}`).then(res => {
      if (res.data.code === 0) {
        // resolve(res.data);
        console.log("res.data", res.data);
        // let url;
        let host, queryParam;
        if (res.data.req_0.code === 0) {
          host = res.data.req_0.data.sip[0];
          queryParam = res.data.req_0.data.midurlinfo[0].purl + "66";
        } else if (res.data.req.code === 0) {
          console.log("-，-", res.data.req);
          host = res.data.req.data.sip[2];
          queryParam = res.data.req.data.keepalivefile;
          // host = ""
        }

        console.log("歌曲播放地址", host + queryParam);
        resolve(host + "?" + queryParam);
        // console.log("res.")
      } else {
        reject(res);
      }
    });
  });
  // let songmid = "0020VnHM0U9uNh";
  // let p = await getSongQuery(songmid);
  // console.log("innnn");

  // return p;
}


function getSongQuery(songmid: string) {
  let params = {
    "-": "getplaysongvkey7337498529316742",
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
  let data = `{"req": {"module": "CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param": {"guid": "2560880300","calltype":0, "userip": ""}},"req_0": {"module": "vkey.GetVkeyServer","method": "CgiGetVkey","param": {"guid": "2560880300","songmid": ["${songmid}"],"songtype": [0],"uin": 0,"loginflag": 1,"platform": 20}},"comm": {"uin": 0,"format": "json","ct": 24,"cv": 0}}`;
  return new Promise((resolve, reject) => {
    axios.get(`/api/songKey?${encodeURI(toQueryString(params))}&data=${encodeURI(data)}`).then(res => {
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
}
// 薛之谦 丑八怪
// `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey8687414334781238&
// g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&
// data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2560880300","calltype":0,"userip":""}},
// "req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2560880300","songmid":["000QwTVo0YHdcP"],
// "songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`


// 薛之谦 演员
// https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey13999911471521131&
// g_tk=5381&loginUin=936684108&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&
// data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2560880300","calltype":0,"userip":""}},
// "req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2560880300","songmid":["001Qu4I30eVFYb"],
// "songtype":[0],"uin":"936684108","loginflag":1,"platform":"20"}},"comm":{"uin":"936684108","format":"json","ct":24,"cv":0}}


// 芒种
// https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey7337498529316742&
// g_tk=5381&loginUin=936684108&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&
// data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"2560880300","calltype":0,"userip":""}},
// "req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"2560880300","songmid":["0020VnHM0U9uNh"],
// "songtype":[0],"uin":"936684108","loginflag":1,"platform":"20"}},"comm":{"uin":"936684108","format":"json","ct":24,"cv":0}}


 // http://ws.stream.qqmusic.qq.com/C400001luHbo2nQT1Y.m4a?guid=2560880300&
// vkey=80C42F8C0362A4505FF18283A7F3A958844BE1DFABC60C800594683E626B8C3EACA053EFDFFB316E6A0B6EBA65F7646584738F47890CD36C&uin=2636&fromtag=66
// http://ws.stream.qqmusic.qq.com/C400001luHbo2nQT1Y.m4a?guid=2560880300&vkey=80C42F8C0362A4505FF18283A7F3A958844BE1DFABC60C800594683E626B8C3EACA053EFDFFB316E6A0B6EBA65F7646584738F47890CD36C&uin=2636&fromtag=66
// ""
// 芒种
// http://ws.stream.qqmusic.qq.com/C4000020VnHM0U9uNh.m4a?guid=2560880300&vkey=0E0CA6644BE020782E6522CD3B3D690B4431B381039C268C0DFB7A4C7CD7B95419ACC2300EC18E8E96F811A4F63D4DAE593FAEEE408377E3&uin=2636&fromtag=66