import { ToolbarIdConfig } from "@/types";
import { PDF_FILE_INPUT_ID } from "@/utils/constants";

const getEl = document.getElementById.bind(document);

export default (idConfig: ToolbarIdConfig = {}) => ({
  appContainer: getEl("pdf"),
  mainContainer: getEl("viewerContainer"),
  viewerContainer: getEl("viewer"),
  eventBus: null,
  toolbar: {
    container: getEl("toolbarViewer"),
    numPages: getEl(idConfig.numPages || "numPages"),
    pageNumber: getEl(idConfig.pageNumber || "pageNumber"),
    scaleSelectContainer: getEl("scaleSelectContainer"),
    scaleSelect: getEl(idConfig.scaleSelect || "scaleSelect"),
    customScaleOption: getEl("customScaleOption"),
    previous: getEl(idConfig.previousPage || "previous"),
    next: getEl(idConfig.nextPage || "next"),
    zoomIn: getEl(idConfig.zoomIn || "zoomIn"),
    zoomOut: getEl(idConfig.zoomOut || "zoomOut"),
    viewFind: getEl("viewFind"),
    openFile: getEl("openFile"),
    print: getEl("print"),
    presentationModeButton: getEl("presentationMode"),
    download: getEl("download"),
    viewBookmark: getEl("viewBookmark")
  },
  secondaryToolbar: {
    toolbar: getEl("secondaryToolbar"),
    toggleButton: getEl("secondaryToolbarToggle"),
    toolbarButtonContainer: getEl("secondaryToolbarButtonContainer"),
    presentationModeButton: getEl("secondaryPresentationMode"),
    openFileButton: getEl("secondaryOpenFile"),
    printButton: getEl("secondaryPrint"),
    downloadButton: getEl("secondaryDownload"),
    viewBookmarkButton: getEl("secondaryViewBookmark"),
    firstPageButton: getEl("firstPage"),
    lastPageButton: getEl("lastPage"),
    pageRotateCwButton: getEl("pageRotateCw"),
    pageRotateCcwButton: getEl("pageRotateCcw"),
    cursorSelectToolButton: getEl("cursorSelectTool"),
    cursorHandToolButton: getEl("cursorHandTool"),
    scrollVerticalButton: getEl("scrollVertical"),
    scrollHorizontalButton: getEl("scrollHorizontal"),
    scrollWrappedButton: getEl("scrollWrapped"),
    spreadNoneButton: getEl("spreadNone"),
    spreadOddButton: getEl("spreadOdd"),
    spreadEvenButton: getEl("spreadEven"),
    documentPropertiesButton: getEl("documentProperties")
  },
  fullscreen: {
    contextFirstPage: getEl("contextFirstPage"),
    contextLastPage: getEl("contextLastPage"),
    contextPageRotateCw: getEl("contextPageRotateCw"),
    contextPageRotateCcw: getEl("contextPageRotateCcw")
  },
  sidebar: {
    // Divs (and sidebar button)
    outerContainer: getEl("outerContainer"),
    viewerContainer: getEl("viewerContainer"),
    toggleButton: getEl("sidebarToggle"),
    // Buttons
    thumbnailButton: getEl("viewThumbnail"),
    outlineButton: getEl("viewOutline"),
    attachmentsButton: getEl("viewAttachments"),
    // Views
    thumbnailView: getEl("thumbnailView"),
    outlineView: getEl("outlineView"),
    attachmentsView: getEl("attachmentsView")
  },
  sidebarResizer: {
    outerContainer: getEl("outerContainer"),
    resizer: getEl("sidebarResizer")
  },
  findBar: {
    bar: getEl("findbar"),
    toggleButton: getEl("viewFind"),
    findField: getEl("findInput"),
    highlightAllCheckbox: getEl("findHighlightAll"),
    caseSensitiveCheckbox: getEl("findMatchCase"),
    entireWordCheckbox: getEl("findEntireWord"),
    findMsg: getEl("findMsg"),
    findResultsCount: getEl("findResultsCount"),
    findPreviousButton: getEl("findPrevious"),
    findNextButton: getEl("findNext")
  },
  passwordOverlay: {
    overlayName: "passwordOverlay",
    container: getEl("passwordOverlay"),
    label: getEl("passwordText"),
    input: getEl("password"),
    submitButton: getEl("passwordSubmit"),
    cancelButton: getEl("passwordCancel")
  },
  documentProperties: {
    overlayName: "documentPropertiesOverlay",
    container: getEl("documentPropertiesOverlay"),
    closeButton: getEl("documentPropertiesClose"),
    fields: {
      fileName: getEl("fileNameField"),
      fileSize: getEl("fileSizeField"),
      title: getEl("titleField"),
      author: getEl("authorField"),
      subject: getEl("subjectField"),
      keywords: getEl("keywordsField"),
      creationDate: getEl("creationDateField"),
      modificationDate: getEl("modificationDateField"),
      creator: getEl("creatorField"),
      producer: getEl("producerField"),
      version: getEl("versionField"),
      pageCount: getEl("pageCountField"),
      pageSize: getEl("pageSizeField"),
      linearized: getEl("linearizedField")
    }
  },
  errorWrapper: {
    container: getEl("errorWrapper"),
    errorMessage: getEl("errorMessage"),
    closeButton: getEl("errorClose"),
    errorMoreInfo: getEl("errorMoreInfo"),
    moreInfoButton: getEl("errorShowMore"),
    lessInfoButton: getEl("errorShowLess")
  },
  printContainer: getEl("printContainer"),
  openFileInputName: PDF_FILE_INPUT_ID
});
