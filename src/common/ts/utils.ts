/*
 * @Author: hpw
 * @Date: 2019-08-20 16:46:33
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-21 10:46:35
 */

export function toQueryString(obj: any): any {
  function toQueryPair(key: any, value: any) {
    if (typeof value === "undefined") {
      return key;
    }
    return key + "=" + encodeURIComponent(value === null ? "" : String(value));
  }

  let ret: any = [];
  for (let key in obj) {
    key = encodeURIComponent(key);
    let values = obj[key];
    if (values && values.constructor === Array) {
      let queryValues = [];
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else {
      ret.push(toQueryPair(key, values));
    }
  }

  return ret.join("&");
}
