figma.showUI(__html__, {
  width: 960,
  height: 720,
  themeColors: true,
});

type SelectionInfo = {
  count: number;
  textCount: number;
};

const getTextSelection = () =>
  figma.currentPage.selection.filter(
    (node): node is TextNode => node.type === "TEXT"
  );

const sendSelectionInfo = () => {
  const selection = figma.currentPage.selection;
  const textNodes = getTextSelection();
  const info: SelectionInfo = {
    count: selection.length,
    textCount: textNodes.length,
  };
  figma.ui.postMessage({ type: "selectionInfo", ...info });
};

const loadFontsForNode = async (node: TextNode) => {
  const length = node.characters.length;
  if (length === 0) {
    if (node.fontName !== figma.mixed) {
      await figma.loadFontAsync(node.fontName as FontName);
    }
    return;
  }
  const fonts = node.getRangeAllFontNames(0, length);
  await Promise.all(fonts.map((font) => figma.loadFontAsync(font)));
};

figma.on("selectionchange", sendSelectionInfo);
sendSelectionInfo();

figma.ui.onmessage = async (msg) => {
  if (!msg || typeof msg.type !== "string") return;

  if (msg.type === "getSelectionText") {
    const textNodes = getTextSelection();
    if (textNodes.length === 0) {
      figma.notify("Select at least one text layer.");
      figma.ui.postMessage({ type: "selectionText", text: "" });
      return;
    }
    const text = textNodes.map((node) => node.characters).join("\n");
    figma.ui.postMessage({ type: "selectionText", text });
    return;
  }

  if (msg.type === "applyToSelection") {
    const nextText = typeof msg.text === "string" ? msg.text : "";
    const textNodes = getTextSelection();
    if (textNodes.length === 0) {
      figma.notify("Select at least one text layer.");
      return;
    }
    for (const node of textNodes) {
      await loadFontsForNode(node);
      node.characters = nextText;
    }
    figma.notify(`Updated ${textNodes.length} text layer(s).`);
    return;
  }
};
