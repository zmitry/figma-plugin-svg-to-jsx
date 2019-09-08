function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

var tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  return str.replace(/[&<>]/g, replaceTag);
}

figma.currentPage.selection.map(selected => {
  selected.exportAsync({ format: "SVG" }).then(svgCode => {
    figma.showUI(__html__, { visible: true, width: 700, height: 300 });
    figma.ui.postMessage({ type: "networkRequest", data: ab2str(svgCode) });
  });
});
