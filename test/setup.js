// test/setup.js
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://birdscolor.com",
  pretendToBeVisual: true
});

const { window } = dom;

globalThis.window = window;
globalThis.document = window.document;
globalThis.localStorage = window.localStorage;
globalThis.sessionStorage = window.sessionStorage;

// 🛡️ Define solo propiedades no protegidas y no definidas
for (const prop of Object.getOwnPropertyNames(window)) {
  if (!(prop in globalThis)) {
    Object.defineProperty(globalThis, prop, {
      get: () => window[prop],
      configurable: true,
      enumerable: true
    });
  }
}
