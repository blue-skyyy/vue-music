/*
 * @Author: hpw
 * @Date: 2019-08-19 18:43:36
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-27 17:23:44
 */

export function addClass(el: Element, className: string): void {
  if (hasClass(el, className)) {
    return;
  }
  let newClass: Array<string> = className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
}

export function hasClass(el: Element, className: string): Boolean {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}

export function removeClass(el: Element, className: string) {
  // 先判断是否含有这个class，含有时，才继续
  if (!hasClass(el, className)) {
    return;
  }

  let newClass = el.className.split(" ");  // 分割class字符串为class数组
  let index = newClass.findIndex((item) => {   // 找到指定的class在class数组中的索引
    return item === className;
  });
  newClass.splice(index, 1);   // 删除索引中的这项
  el.className = newClass.join(" ");  // 将class数组以空格为连接符连接成class字符串
}

interface ITransformNames {
  [key: string]: string,
}

let vendor = (() => {
  let element = document.createElement("div") as any;
  let transformNames: ITransformNames = {
    "webkit": "webkitTransform",
    "Moz": "MozTransform",
    "O": "OTransform",
    "ms": "msTransform",
    "standard": "transform"
  };
  for (let key in transformNames) {
    if (element.style[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style: string) {
  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1);
}
