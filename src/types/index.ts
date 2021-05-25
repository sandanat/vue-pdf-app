export type ToolbarConfValue = boolean | ToolbarConfig | undefined;

export interface ToolbarConfig {
  [key: string]: ToolbarConfValue;
}

export type Theme = "dark" | "light";

export interface ToolbarIdConfig {
  cursorHandTool?: string;
  cursorSelectTool?: string;
  documentProperties?: string;
  download?: string;
  // findbar?: string;
  // findbarCaseSensitiveCheckbox?: string;
  // findbarEntireWordCheckbox?: string;
  // findbarFindField?: string;
  // findbarFindMessage?: string;
  // findbarFindNextButton?: string;
  // findbarFindPreviousButton?: string;
  // findbarFindResultsCount?: string;
  // findbarHighlightAllCheckbox?: string;
  // findbarToggleButton?: string;
  firstPage?: string;
  lastPage?: string;
  nextPage?: string;
  numPages?: string;
  openFile?: string;
  pageNumber?: string;
  pageRotateCcw?: string;
  pageRotateCw?: string;
  presentationMode?: string;
  previousPage?: string;
  print?: string;
  // scaleSelect?: string;
  scrollHorizontal?: string;
  scrollVertical?: string;
  scrollWrapped?: string;
  sidebarToggle?: string;
  spreadEven?: string;
  spreadNone?: string;
  spreadOdd?: string;
  // viewAttachments?: string;
  viewBookmark?: string;
  // viewOutline?: string;
  // viewThumbnail?: string;
  zoomIn?: string;
  zoomOut?: string;
}
