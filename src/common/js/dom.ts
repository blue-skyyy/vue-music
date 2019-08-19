/*
 * @Author: hpw
 * @Date: 2019-08-19 18:43:36
 * @LastEditors: hpw
 * @LastEditTime: 2019-08-19 19:23:40
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
