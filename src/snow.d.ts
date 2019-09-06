declare module "snowutils" {

  export function addClass(dom: Element, classArray: Array<string>): void;

  export function hasClass(dom: HTMLElement, _class: string): boolean;

  export function removeClass(dom: HTMLElement, classArray: Array<string>): void;

  export function itemClass(dom: HTMLElement, index: number): null | string;

  export function toggleClass(dom: HTMLElement, _class: string): boolean;
}
