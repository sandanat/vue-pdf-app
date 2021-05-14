import { ToolbarConfigIds } from "@/types";
import { PDF_FILE_INPUT_ID } from "@/utils/constants";

const getEl = document.getElementById.bind(document);

export default (configIds: ToolbarConfigIds = {}) => ({
  appContainer: getEl("pdf"),
  mainContainer: getEl("viewerContainer"),
  viewerContainer: getEl("viewer"),
  eventBus: null,
  toolbar: {
    container: getEl("toolbarViewer"),
    numPages: getEl(configIds.numPages || "numPages"),
    pageNumber: getEl(configIds.pageNumber || "pageNumber"),
    scaleSelectContainer: getEl("scaleSelectContainer"),
    scaleSelect: getEl(configIds.scaleSelect || "scaleSelect"),
    customScaleOption: getEl("customScaleOption"),
    previous: getEl(configIds.previousPage || "previous"),
    next: getEl(configIds.nextPage || "next"),
    zoomIn: getEl(configIds.zoomIn || "zoomIn"),
    zoomOut: getEl(configIds.zoomOut || "zoomOut"),
    viewFind: getEl("viewFind"),
    openFile: getEl(configIds.openFile || "openFile"),
    print: getEl(configIds.print || "print"),
    presentationModeButton: getEl(
      configIds.presentationMode || "presentationMode"
    ),
    download: getEl(configIds.download || "download"),
    viewBookmark: getEl(configIds.viewBookmark || "viewBookmark")
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
    firstPageButton: getEl(configIds.firstPage || "firstPage"),
    lastPageButton: getEl(configIds.lastPage || "lastPage"),
    pageRotateCwButton: getEl(configIds.pageRotateCw || "pageRotateCw"),
    pageRotateCcwButton: getEl(configIds.pageRotateCcw || "pageRotateCcw"),
    cursorSelectToolButton: getEl(
      configIds.cursorSelectTool || "cursorSelectTool"
    ),
    cursorHandToolButton: getEl(configIds.cursorHandTool || "cursorHandTool"),
    scrollVerticalButton: getEl(configIds.scrollVertical || "scrollVertical"),
    scrollHorizontalButton: getEl(
      configIds.scrollHorizontal || "scrollHorizontal"
    ),
    scrollWrappedButton: getEl(configIds.scrollWrapped || "scrollWrapped"),
    spreadNoneButton: getEl(configIds.spreadNone || "spreadNone"),
    spreadOddButton: getEl(configIds.spreadOdd || "spreadOdd"),
    spreadEvenButton: getEl(configIds.spreadEven || "spreadEven"),
    documentPropertiesButton: getEl(
      configIds.documentProperties || "documentProperties"
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
