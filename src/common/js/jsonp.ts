/*
 * @Author: hpw
 * @Date: 2019-08-18 15:18:41
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-19 16:27:02
 */
import jsonp from "jsonp";

export default function myJsonp(url: any, data: any, option: any) {
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);

  return new Promise((resolve, reject) => {
    jsonp(url, option, (err: any, data: unknown): any => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function param(data: any) {
  let url = "";
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + encodeURIComponent(value);
  }
  return url ? url.substring(1) : "";
}
