import { ToolbarConfValue, ToolbarConfig } from "@/types";

export const toolbarConfig: ToolbarConfig = {
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true
  },
  secondaryToolbar: {
    secondaryPresentationMode: true,
    secondaryOpenFile: true,
    secondaryPrint: true,
    secondaryDownload: true,
    secondaryViewBookmark: true,
    firstPage: true,
    lastPage: true,
    pageRotateCw: true,
    pageRotateCcw: true,
    cursorSelectTool: true,
    cursorHandTool: true,
    scrollVertical: true,
    scrollHorizontal: true,
    scrollWrapped: true,
    spreadNone: true,
    spreadOdd: true,
    spreadEven: true,
    documentProperties: true
  },
  toolbar: {
    toolbarViewerLeft: {
      findbar: true,
      previous: true,
      next: true,
      pageNumber: true
    },
    toolbarViewerRight: {
      presentationMode: true,
      openFile: true,
      print: true,
      download: true,
      viewBookmark: true
    },
    toolbarViewerMiddle: {
      zoomOut: true,
      zoomIn: true,
      scaleSelectContainer: true
    }
  },
  errorWrapper: true
};

export const getToolbarConfigValue = (
  config: ToolbarConfig,
  path: string
): ToolbarConfValue => {
  const props = path.split(".");
  let currValue = config[props[0]];

  for (let i = 1; i < props.length; i++) {
    if (typeof currValue === "object") {
      currValue = currValue[props[i]];
    } else break;
  }
  return currValue;
};
