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
    // TODO make scale select customizable
    scaleSelectContainer: getEl("scaleSelectContainer"),
    scaleSelect: getEl("scaleSelect"),
    customScaleOption: getEl("customScaleOption"),
    previous: getEl(idConfig.previousPage || "previous"),
    next: getEl(idConfig.nextPage || "next"),
    zoomIn: getEl(idConfig.zoomIn || "zoomIn"),
    zoomOut: getEl(idConfig.zoomOut || "zoomOut"),
    viewFind: getEl(idConfig.toggleFindbar || "viewFind"),
    openFile: getEl(idConfig.openFile || "openFile"),
    print: getEl(idConfig.print || "print"),
    presentationModeButton: getEl(
      idConfig.presentationMode || "presentationMode"
    ),
    download: getEl(idConfig.download || "download"),
    viewBookmark: getEl(idConfig.viewBookmark || "viewBookmark")
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
    firstPageButton: getEl(idConfig.firstPage || "firstPage"),
    lastPageButton: getEl(idConfig.lastPage || "lastPage"),
    pageRotateCwButton: getEl(idConfig.pageRotateCw || "pageRotateCw"),
    pageRotateCcwButton: getEl(idConfig.pageRotateCcw || "pageRotateCcw"),
    cursorSelectToolButton: getEl(
      idConfig.cursorSelectTool || "cursorSelectTool"
    ),
    cursorHandToolButton: getEl(idConfig.cursorHandTool || "cursorHandTool"),
    scrollVerticalButton: getEl(idConfig.scrollVertical || "scrollVertical"),
    scrollHorizontalButton: getEl(
      idConfig.scrollHorizontal || "scrollHorizontal"
    ),
    scrollWrappedButton: getEl(idConfig.scrollWrapped || "scrollWrapped"),
    spreadNoneButton: getEl(idConfig.spreadNone || "spreadNone"),
    spreadOddButton: getEl(idConfig.spreadOdd || "spreadOdd"),
    spreadEvenButton: getEl(idConfig.spreadEven || "spreadEven"),
    documentPropertiesButton: getEl(
      idConfig.documentProperties || "documentProperties"
    )
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
    toggleButton: getEl(idConfig.sidebarToggle || "sidebarToggle"),
    // Buttons
    thumbnailButton: getEl(idConfig.viewThumbnail || "viewThumbnail"),
    outlineButton: getEl(idConfig.viewOutline || "viewOutline"),
    attachmentsButton: getEl(idConfig.viewAttachments || "viewAttachments"),
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
    bar: getEl(idConfig.findbar || "findbar"),
    toggleButton: getEl(idConfig.toggleFindbar || "viewFind"),
    findField: getEl(idConfig.findInput || "findInput"),
    highlightAllCheckbox: getEl(
      idConfig.findHighlightAll || "findHighlightAll"
    ),
    caseSensitiveCheckbox: getEl(idConfig.findMatchCase || "findMatchCase"),
    entireWordCheckbox: getEl(idConfig.findEntireWord || "findEntireWord"),
    findMsg: getEl(idConfig.findMessage || "findMsg"),
    findResultsCount: getEl(idConfig.findResultsCount || "findResultsCount"),
    findPreviousButton: getEl(idConfig.findPrevious || "findPrevious"),
    findNextButton: getEl(idConfig.findNext || "findNext")
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
