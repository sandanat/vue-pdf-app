export type ToolbarConfValue = boolean | ToolbarConfig | undefined;

export interface ToolbarConfig {
  [key: string]: ToolbarConfValue;
}

export type Theme = "dark" | "light";

export interface ToolbarIdConfig {
  // sidebarToggleButton?: string;
  // viewThumbnail?: string;
  // viewOutline?: string;
  // viewAttachments?: string;
  // firstPage?: string;
  // lastPage?: string;
  // pageRotateCw?: string;
  // pageRotateCcw?: string;
  // cursorSelectTool?: string;
  // cursorHandTool?: string;
  // scrollVertical?: string;
  // scrollHorizontal?: string;
  // scrollWrapped?: string;
  // spreadNone?: string;
  // spreadOdd?: string;
  // spreadEven?: string;
  // documentProperties?: string;
  // previousPage?: string;
  // nextPage?: string;
  // pageNumber?: string;
  // numPages?: string;
  // zoomOut?: string;
  zoomIn?: string;
  // scaleSelect?: string;
  // presentationMode?: string;
  // openFile?: string;
  // print?: string;
  // download?: string;
  // viewBookmark?: string;
  // findbar?: string;
  // findbarToggleButton?: string;
  // findbarFindField?: string;
  // findbarHighlightAllCheckbox?: string;
  // findbarCaseSensitiveCheckbox?: string;
  // findbarEntireWordCheckbox?: string;
  // findbarFindMessage?: string;
  // findbarFindResultsCount?: string;
  // findbarFindPreviousButton?: string;
  // findbarFindNextButton?: string;
}
