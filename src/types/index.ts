export type ToolbarConfValue = boolean | ToolbarConfig | undefined;

export interface ToolbarConfig {
  [key: string]: ToolbarConfValue;
}

export type Theme = "dark" | "light";

export type PageScale =
  | number
  | "page-actual"
  | "page-width"
  | "page-height"
  | "page-fit"
  | "auto";

export interface ToolbarIdConfig {
  cursorHandTool?: string;
  cursorSelectTool?: string;
  documentProperties?: string;
  download?: string;
  findbar?: string;
  findEntireWord?: string;
  findHighlightAll?: string;
  findInput?: string;
  findMatchCase?: string;
  findMessage?: string;
  findNext?: string;
  findPrevious?: string;
  findResultsCount?: string;
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
  scrollHorizontal?: string;
  scrollVertical?: string;
  scrollWrapped?: string;
  sidebarToggle?: string;
  spreadEven?: string;
  spreadNone?: string;
  spreadOdd?: string;
  toggleFindbar?: string;
  viewAttachments?: string;
  viewBookmark?: string;
  viewOutline?: string;
  viewThumbnail?: string;
  zoomIn?: string;
  zoomOut?: string;
}
