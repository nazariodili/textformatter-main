"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/code.ts
var UI_WIDTH = 480;
figma.showUI(__html__, {
  width: UI_WIDTH,
  height: 720,
  themeColors: true
});
var getTextSelection = () => figma.currentPage.selection.filter(
  (node) => node.type === "TEXT"
);
var sendSelectionInfo = () => {
  const selection = figma.currentPage.selection;
  const textNodes = getTextSelection();
  const info = {
    count: selection.length,
    textCount: textNodes.length
  };
  figma.ui.postMessage(__spreadValues({ type: "selectionInfo" }, info));
};
var sendSelectionText = () => {
  const textNodes = getTextSelection();
  if (textNodes.length === 0) {
    figma.ui.postMessage({ type: "selectionText", text: "", texts: [] });
    return;
  }
  const texts = textNodes.map((node) => node.characters);
  figma.ui.postMessage({
    type: "selectionText",
    text: texts.join("\n"),
    texts
  });
};
var loadFontsForNode = async (node) => {
  const length = node.characters.length;
  if (length === 0) {
    if (node.fontName !== figma.mixed) {
      await figma.loadFontAsync(node.fontName);
    }
    return;
  }
  const fonts = node.getRangeAllFontNames(0, length);
  await Promise.all(fonts.map((font) => figma.loadFontAsync(font)));
};
figma.on("selectionchange", sendSelectionInfo);
figma.on("selectionchange", sendSelectionText);
sendSelectionInfo();
sendSelectionText();
figma.ui.onmessage = async (msg) => {
  if (!msg || typeof msg.type !== "string") return;
  if (msg.type === "resize") {
    const height = typeof msg.height === "number" && Number.isFinite(msg.height) ? Math.max(100, Math.round(msg.height)) : 720;
    figma.ui.resize(UI_WIDTH, height);
    return;
  }
  if (msg.type === "getSelectionText") {
    sendSelectionText();
    return;
  }
  if (msg.type === "refreshSelection") {
    sendSelectionInfo();
    sendSelectionText();
    return;
  }
  if (msg.type === "applyToSelection") {
    const nextText = typeof msg.text === "string" ? msg.text : "";
    const nextTexts = Array.isArray(msg.texts) && msg.texts.every((t) => typeof t === "string") ? msg.texts : null;
    const textNodes = getTextSelection();
    if (textNodes.length === 0) {
      figma.notify("Select at least one text layer.");
      return;
    }
    const usePerNode = nextTexts && nextTexts.length === textNodes.length;
    for (let i = 0; i < textNodes.length; i++) {
      const node = textNodes[i];
      await loadFontsForNode(node);
      if (node.textCase !== figma.mixed && node.textCase !== "ORIGINAL") {
        node.textCase = "ORIGINAL";
      }
      node.characters = usePerNode ? nextTexts[i] : nextText;
    }
    figma.notify(`Updated ${textNodes.length} text layer(s).`);
    return;
  }
};
