const UI_WIDTH = 480;

figma.showUI(__html__, {
  width: UI_WIDTH,
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

const sendSelectionText = () => {
  const textNodes = getTextSelection();
  if (textNodes.length === 0) {
    figma.ui.postMessage({ type: "selectionText", text: "", texts: [] });
    return;
  }
  const texts = textNodes.map((node) => node.characters);
  figma.ui.postMessage({
    type: "selectionText",
    text: texts.join("\n"),
    texts,
  });
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
figma.on("selectionchange", sendSelectionText);
sendSelectionInfo();
sendSelectionText();

figma.ui.onmessage = async (msg) => {
  if (!msg || typeof msg.type !== "string") return;

  if (msg.type === "resize") {
    const height =
      typeof msg.height === "number" && Number.isFinite(msg.height)
        ? Math.max(100, Math.round(msg.height))
        : 720;
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
    const nextTexts =
      Array.isArray(msg.texts) && msg.texts.every((t: any) => typeof t === "string")
        ? (msg.texts as string[])
        : null;
    const textNodes = getTextSelection();
    if (textNodes.length === 0) {
      figma.notify("Select at least one text layer.");
      return;
    }
    const usePerNode =
      nextTexts && nextTexts.length === textNodes.length;
    for (let i = 0; i < textNodes.length; i++) {
      const node = textNodes[i];
      await loadFontsForNode(node);
      // Always reset text case so applied transformations are visible.
      node.textCase = "ORIGINAL";
      node.characters = usePerNode ? nextTexts![i] : nextText;
    }
    figma.notify(`Updated ${textNodes.length} text layer(s).`);
    return;
  }
};
