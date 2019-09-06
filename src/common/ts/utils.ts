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

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr: Array<object>) {
  const newArr = arr.slice();
  for (let i = 0; i < newArr.length; i++) {
    let r = randomInt(0, i);
    let t = newArr[i];
    newArr[i] = newArr[r];
    newArr[r] = t;
  }
  return newArr;
}
