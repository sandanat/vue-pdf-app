/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationLayer = void 0;

var _display_utils = require("./display_utils.js");

var _util = require("../shared/util.js");

var _annotation_storage = require("./annotation_storage.js");

var _scripting_utils = require("../shared/scripting_utils.js");

class AnnotationElementFactory {
  static create(parameters) {
    const subtype = parameters.data.annotationType;

    switch (subtype) {
      case _util.AnnotationType.LINK:
        return new LinkAnnotationElement(parameters);

      case _util.AnnotationType.TEXT:
        return new TextAnnotationElement(parameters);

      case _util.AnnotationType.WIDGET:
        const fieldType = parameters.data.fieldType;

        switch (fieldType) {
          case "Tx":
            return new TextWidgetAnnotationElement(parameters);

          case "Btn":
            if (parameters.data.radioButton) {
              return new RadioButtonWidgetAnnotationElement(parameters);
            } else if (parameters.data.checkBox) {
              return new CheckboxWidgetAnnotationElement(parameters);
            }

            return new PushButtonWidgetAnnotationElement(parameters);

          case "Ch":
            return new ChoiceWidgetAnnotationElement(parameters);
        }

        return new WidgetAnnotationElement(parameters);

      case _util.AnnotationType.POPUP:
        return new PopupAnnotationElement(parameters);

      case _util.AnnotationType.FREETEXT:
        return new FreeTextAnnotationElement(parameters);

      case _util.AnnotationType.LINE:
        return new LineAnnotationElement(parameters);

      case _util.AnnotationType.SQUARE:
        return new SquareAnnotationElement(parameters);

      case _util.AnnotationType.CIRCLE:
        return new CircleAnnotationElement(parameters);

      case _util.AnnotationType.POLYLINE:
        return new PolylineAnnotationElement(parameters);

      case _util.AnnotationType.CARET:
        return new CaretAnnotationElement(parameters);

      case _util.AnnotationType.INK:
        return new InkAnnotationElement(parameters);

      case _util.AnnotationType.POLYGON:
        return new PolygonAnnotationElement(parameters);

      case _util.AnnotationType.HIGHLIGHT:
        return new HighlightAnnotationElement(parameters);

      case _util.AnnotationType.UNDERLINE:
        return new UnderlineAnnotationElement(parameters);

      case _util.AnnotationType.SQUIGGLY:
        return new SquigglyAnnotationElement(parameters);

      case _util.AnnotationType.STRIKEOUT:
        return new StrikeOutAnnotationElement(parameters);

      case _util.AnnotationType.STAMP:
        return new StampAnnotationElement(parameters);

      case _util.AnnotationType.FILEATTACHMENT:
        return new FileAttachmentAnnotationElement(parameters);

      default:
        return new AnnotationElement(parameters);
    }
  }

}

class AnnotationElement {
  constructor(parameters, {
    isRenderable = false,
    ignoreBorder = false,
    createQuadrilaterals = false
  } = {}) {
    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderInteractiveForms = parameters.renderInteractiveForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._mouseState = parameters.mouseState;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }

    if (createQuadrilaterals) {
      this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
    }
  }

  _createContainer(ignoreBorder = false) {
    const data = this.data,
          page = this.page,
          viewport = this.viewport;
    const container = document.createElement("section");
    let width = data.rect[2] - data.rect[0];
    let height = data.rect[3] - data.rect[1];
    container.setAttribute("data-annotation-id", data.id);

    const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

    container.style.transform = `matrix(${viewport.transform.join(",")})`;
    container.style.transformOrigin = `${-rect[0]}px ${-rect[1]}px`;

    if (!ignoreBorder && data.borderStyle.width > 0) {
      container.style.borderWidth = `${data.borderStyle.width}px`;

      if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
        width = width - 2 * data.borderStyle.width;
        height = height - 2 * data.borderStyle.width;
      }

      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;

      if (horizontalRadius > 0 || verticalRadius > 0) {
        const radius = `${horizontalRadius}px / ${verticalRadius}px`;
        container.style.borderRadius = radius;
      }

      switch (data.borderStyle.style) {
        case _util.AnnotationBorderStyleType.SOLID:
          container.style.borderStyle = "solid";
          break;

        case _util.AnnotationBorderStyleType.DASHED:
          container.style.borderStyle = "dashed";
          break;

        case _util.AnnotationBorderStyleType.BEVELED:
          (0, _util.warn)("Unimplemented border style: beveled");
          break;

        case _util.AnnotationBorderStyleType.INSET:
          (0, _util.warn)("Unimplemented border style: inset");
          break;

        case _util.AnnotationBorderStyleType.UNDERLINE:
          container.style.borderBottomStyle = "solid";
          break;

        default:
          break;
      }

      if (data.color) {
        container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
      } else {
        container.style.borderWidth = 0;
      }
    }

    container.style.left = `${rect[0]}px`;
    container.style.top = `${rect[1]}px`;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    return container;
  }

  _createQuadrilaterals(ignoreBorder = false) {
    if (!this.data.quadPoints) {
      return null;
    }

    const quadrilaterals = [];
    const savedRect = this.data.rect;

    for (const quadPoint of this.data.quadPoints) {
      this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
      quadrilaterals.push(this._createContainer(ignoreBorder));
    }

    this.data.rect = savedRect;
    return quadrilaterals;
  }

  _createPopup(trigger, data) {
    let container = this.container;

    if (this.quadrilaterals) {
      trigger = trigger || this.quadrilaterals;
      container = this.quadrilaterals[0];
    }

    if (!trigger) {
      trigger = document.createElement("div");
      trigger.style.height = container.style.height;
      trigger.style.width = container.style.width;
      container.appendChild(trigger);
    }

    const popupElement = new PopupElement({
      container,
      trigger,
      color: data.color,
      title: data.title,
      modificationDate: data.modificationDate,
      contents: data.contents,
      hideWrapper: true
    });
    const popup = popupElement.render();
    popup.style.left = container.style.width;
    container.appendChild(popup);
  }

  _renderQuadrilaterals(className) {
    for (const quadrilateral of this.quadrilaterals) {
      quadrilateral.className = className;
    }

    return this.quadrilaterals;
  }

  render() {
    (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
  }

}

class LinkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
    super(parameters, {
      isRenderable,
      createQuadrilaterals: true
    });
  }

  render() {
    const {
      data,
      linkService
    } = this;
    const link = document.createElement("a");

    if (data.url) {
      (0, _display_utils.addLinkAttributes)(link, {
        url: data.url,
        target: data.newWindow ? _display_utils.LinkTarget.BLANK : linkService.externalLinkTarget,
        rel: linkService.externalLinkRel,
        enabled: linkService.externalLinkEnabled
      });
    } else if (data.action) {
      this._bindNamedAction(link, data.action);
    } else if (data.dest) {
      this._bindLink(link, data.dest);
    } else if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
      this._bindJSAction(link, data);
    } else {
      this._bindLink(link, "");
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("linkAnnotation").map((quadrilateral, index) => {
        const linkElement = index === 0 ? link : link.cloneNode();
        quadrilateral.appendChild(linkElement);
        return quadrilateral;
      });
    }

    this.container.className = "linkAnnotation";
    this.container.appendChild(link);
    return this.container;
  }

  _bindLink(link, destination) {
    link.href = this.linkService.getDestinationHash(destination);

    link.onclick = () => {
      if (destination) {
        this.linkService.goToDestination(destination);
      }

      return false;
    };

    if (destination || destination === "") {
      link.className = "internalLink";
    }
  }

  _bindNamedAction(link, action) {
    link.href = this.linkService.getAnchorUrl("");

    link.onclick = () => {
      this.linkService.executeNamedAction(action);
      return false;
    };

    link.className = "internalLink";
  }

  _bindJSAction(link, data) {
    link.href = this.linkService.getAnchorUrl("");
    const map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

    for (const name of Object.keys(data.actions)) {
      const jsName = map.get(name);

      if (!jsName) {
        continue;
      }

      link[jsName] = () => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: data.id,
            name
          }
        });
        return false;
      };
    }

    link.className = "internalLink";
  }

}

class TextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    this.container.className = "textAnnotation";
    const image = document.createElement("img");
    image.style.height = this.container.style.height;
    image.style.width = this.container.style.width;
    image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
    image.alt = "[{{type}} Annotation]";
    image.dataset.l10nId = "text_annotation_type";
    image.dataset.l10nArgs = JSON.stringify({
      type: this.data.name
    });

    if (!this.data.hasPopup) {
      this._createPopup(image, this.data);
    }

    this.container.appendChild(image);
    return this.container;
  }

}

class WidgetAnnotationElement extends AnnotationElement {
  render() {
    if (this.data.alternativeText) {
      this.container.title = this.data.alternativeText;
    }

    return this.container;
  }

  _getKeyModifier(event) {
    return navigator.platform.includes("Win") && event.ctrlKey || navigator.platform.includes("Mac") && event.metaKey;
  }

  _setEventListener(element, baseName, eventName, valueGetter) {
    if (baseName.includes("mouse")) {
      element.addEventListener(baseName, event => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event),
            shift: event.shiftKey,
            modifier: this._getKeyModifier(event)
          }
        });
      });
    } else {
      element.addEventListener(baseName, event => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: event.target.checked
          }
        });
      });
    }
  }

  _setEventListeners(element, names, getter) {
    for (const [baseName, eventName] of names) {
      if (eventName === "Action" || this.data.actions?.[eventName]) {
        this._setEventListener(element, baseName, eventName, getter);
      }
    }
  }

  _dispatchEventFromSandbox(actions, jsEvent) {
    const setColor = (jsName, styleName, event) => {
      const color = event.detail[jsName];
      event.target.style[styleName] = _scripting_utils.ColorConverters[`${color[0]}_HTML`](color.slice(1));
    };

    const commonActions = {
      display: event => {
        const hidden = event.detail.display % 2 === 1;
        event.target.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          hidden,
          print: event.detail.display === 0 || event.detail.display === 3
        });
      },
      print: event => {
        this.annotationStorage.setValue(this.data.id, {
          print: event.detail.print
        });
      },
      hidden: event => {
        event.target.style.visibility = event.detail.hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          hidden: event.detail.hidden
        });
      },
      focus: event => {
        setTimeout(() => event.target.focus({
          preventScroll: false
        }), 0);
      },
      userName: event => {
        event.target.title = event.detail.userName;
      },
      readonly: event => {
        if (event.detail.readonly) {
          event.target.setAttribute("readonly", "");
        } else {
          event.target.removeAttribute("readonly");
        }
      },
      required: event => {
        if (event.detail.required) {
          event.target.setAttribute("required", "");
        } else {
          event.target.removeAttribute("required");
        }
      },
      bgColor: event => {
        setColor("bgColor", "backgroundColor", event);
      },
      fillColor: event => {
        setColor("fillColor", "backgroundColor", event);
      },
      fgColor: event => {
        setColor("fgColor", "color", event);
      },
      textColor: event => {
        setColor("textColor", "color", event);
      },
      borderColor: event => {
        setColor("borderColor", "borderColor", event);
      },
      strokeColor: event => {
        setColor("strokeColor", "borderColor", event);
      }
    };

    for (const name of Object.keys(jsEvent.detail)) {
      const action = actions[name] || commonActions[name];

      if (action) {
        action(jsEvent);
      }
    }
  }

}

class TextWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    const isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, {
      isRenderable
    });
  }

  setPropertyOnSiblings(base, key, value, keyInStorage) {
    const storage = this.annotationStorage;

    for (const element of document.getElementsByName(base.name)) {
      if (element !== base) {
        element[key] = value;
        const data = Object.create(null);
        data[keyInStorage] = value;
        storage.setValue(element.getAttribute("id"), data);
      }
    }
  }

  render() {
    const storage = this.annotationStorage;
    const id = this.data.id;
    this.container.className = "textWidgetAnnotation";
    let element = null;

    if (this.renderInteractiveForms) {
      const storedData = storage.getValue(id, {
        value: this.data.fieldValue,
        valueAsString: this.data.fieldValue
      });
      const textContent = storedData.valueAsString || storedData.value || "";
      const elementData = {
        userValue: null,
        formattedValue: null,
        beforeInputSelectionRange: null,
        beforeInputValue: null
      };

      if (this.data.multiLine) {
        element = document.createElement("textarea");
        element.textContent = textContent;
      } else {
        element = document.createElement("input");
        element.type = "text";
        element.setAttribute("value", textContent);
      }

      elementData.userValue = textContent;
      element.setAttribute("id", id);
      element.addEventListener("input", event => {
        storage.setValue(id, {
          value: event.target.value
        });
        this.setPropertyOnSiblings(element, "value", event.target.value, "value");
      });

      let blurListener = event => {
        if (elementData.formattedValue) {
          event.target.value = elementData.formattedValue;
        }

        event.target.scrollLeft = 0;
        elementData.beforeInputSelectionRange = null;
      };

      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("focus", event => {
          if (elementData.userValue) {
            event.target.value = elementData.userValue;
          }
        });
        element.addEventListener("updatefromsandbox", jsEvent => {
          const actions = {
            value(event) {
              elementData.userValue = event.detail.value || "";
              storage.setValue(id, {
                value: elementData.userValue.toString()
              });

              if (!elementData.formattedValue) {
                event.target.value = elementData.userValue;
              }
            },

            valueAsString(event) {
              elementData.formattedValue = event.detail.valueAsString || "";

              if (event.target !== document.activeElement) {
                event.target.value = elementData.formattedValue;
              }

              storage.setValue(id, {
                formattedValue: elementData.formattedValue
              });
            },

            selRange(event) {
              const [selStart, selEnd] = event.detail.selRange;

              if (selStart >= 0 && selEnd < event.target.value.length) {
                event.target.setSelectionRange(selStart, selEnd);
              }
            }

          };

          this._dispatchEventFromSandbox(actions, jsEvent);
        });
        element.addEventListener("keydown", event => {
          elementData.beforeInputValue = event.target.value;
          let commitKey = -1;

          if (event.key === "Escape") {
            commitKey = 0;
          } else if (event.key === "Enter") {
            commitKey = 2;
          } else if (event.key === "Tab") {
            commitKey = 3;
          }

          if (commitKey === -1) {
            return;
          }

          elementData.userValue = event.target.value;
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id,
              name: "Keystroke",
              value: event.target.value,
              willCommit: true,
              commitKey,
              selStart: event.target.selectionStart,
              selEnd: event.target.selectionEnd
            }
          });
        });
        const _blurListener = blurListener;
        blurListener = null;
        element.addEventListener("blur", event => {
          if (this._mouseState.isDown) {
            elementData.userValue = event.target.value;
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value: event.target.value,
                willCommit: true,
                commitKey: 1,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              }
            });
          }

          _blurListener(event);
        });
        element.addEventListener("mousedown", event => {
          elementData.beforeInputValue = event.target.value;
          elementData.beforeInputSelectionRange = null;
        });
        element.addEventListener("keyup", event => {
          if (event.target.selectionStart === event.target.selectionEnd) {
            elementData.beforeInputSelectionRange = null;
          }
        });
        element.addEventListener("select", event => {
          elementData.beforeInputSelectionRange = [event.target.selectionStart, event.target.selectionEnd];
        });

        if (this.data.actions?.Keystroke) {
          element.addEventListener("input", event => {
            let selStart = -1;
            let selEnd = -1;

            if (elementData.beforeInputSelectionRange) {
              [selStart, selEnd] = elementData.beforeInputSelectionRange;
            }

            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value: elementData.beforeInputValue,
                change: event.data,
                willCommit: false,
                selStart,
                selEnd
              }
            });
          });
        }

        this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.value);
      }

      if (blurListener) {
        element.addEventListener("blur", blurListener);
      }

      element.disabled = this.data.readOnly;
      element.name = this.data.fieldName;

      if (this.data.maxLen !== null) {
        element.maxLength = this.data.maxLen;
      }

      if (this.data.comb) {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / this.data.maxLen;
        element.classList.add("comb");
        element.style.letterSpacing = `calc(${combWidth}px - 1ch)`;
      }
    } else {
      element = document.createElement("div");
      element.textContent = this.data.fieldValue;
      element.style.verticalAlign = "middle";
      element.style.display = "table-cell";
    }

    this._setTextStyle(element);

    this.container.appendChild(element);
    return this.container;
  }

  _setTextStyle(element) {
    const TEXT_ALIGNMENT = ["left", "center", "right"];
    const {
      fontSize,
      fontColor
    } = this.data.defaultAppearanceData;
    const style = element.style;

    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

    if (this.data.textAlignment !== null) {
      style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    }
  }

}

class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  render() {
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.fieldValue && (data.exportValue && data.exportValue === data.fieldValue || !data.exportValue && data.fieldValue !== "Off")
    }).value;

    if (typeof value === "string") {
      value = value !== "Off";
      storage.setValue(id, {
        value
      });
    }

    this.container.className = "buttonWidgetAnnotation checkBox";
    const element = document.createElement("input");
    element.disabled = data.readOnly;
    element.type = "checkbox";
    element.name = this.data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.addEventListener("change", function (event) {
      const name = event.target.name;

      for (const checkbox of document.getElementsByName(name)) {
        if (checkbox !== event.target) {
          checkbox.checked = false;
          storage.setValue(checkbox.parentNode.getAttribute("data-annotation-id"), {
            value: false
          });
        }
      }

      storage.setValue(id, {
        value: event.target.checked
      });
    });

    if (this.enableScripting && this.hasJSActions) {
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            event.target.checked = event.detail.value !== "Off";
            storage.setValue(id, {
              value: event.target.checked
            });
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this.container.appendChild(element);
    return this.container;
  }

}

class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  render() {
    this.container.className = "buttonWidgetAnnotation radioButton";
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.fieldValue === data.buttonValue
    }).value;

    if (typeof value === "string") {
      value = value !== data.buttonValue;
      storage.setValue(id, {
        value
      });
    }

    const element = document.createElement("input");
    element.disabled = data.readOnly;
    element.type = "radio";
    element.name = data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.addEventListener("change", function (event) {
      const {
        target
      } = event;

      for (const radio of document.getElementsByName(target.name)) {
        if (radio !== target) {
          storage.setValue(radio.getAttribute("id"), {
            value: false
          });
        }
      }

      storage.setValue(id, {
        value: target.checked
      });
    });

    if (this.enableScripting && this.hasJSActions) {
      const pdfButtonValue = data.buttonValue;
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            const checked = pdfButtonValue === event.detail.value;

            for (const radio of document.getElementsByName(event.target.name)) {
              const radioId = radio.getAttribute("id");
              radio.checked = radioId === id && checked;
              storage.setValue(radioId, {
                value: radio.checked
              });
            }
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this.container.appendChild(element);
    return this.container;
  }

}

class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
  render() {
    const container = super.render();
    container.className = "buttonWidgetAnnotation pushButton";

    if (this.data.alternativeText) {
      container.title = this.data.alternativeText;
    }

    return container;
  }

}

class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderInteractiveForms
    });
  }

  render() {
    this.container.className = "choiceWidgetAnnotation";
    const storage = this.annotationStorage;
    const id = this.data.id;
    storage.getValue(id, {
      value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined
    });
    const selectElement = document.createElement("select");
    selectElement.disabled = this.data.readOnly;
    selectElement.name = this.data.fieldName;
    selectElement.setAttribute("id", id);

    if (!this.data.combo) {
      selectElement.size = this.data.options.length;

      if (this.data.multiSelect) {
        selectElement.multiple = true;
      }
    }

    for (const option of this.data.options) {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;

      if (this.data.fieldValue.includes(option.exportValue)) {
        optionElement.setAttribute("selected", true);
      }

      selectElement.appendChild(optionElement);
    }

    const getValue = (event, isExport) => {
      const name = isExport ? "value" : "textContent";
      const options = event.target.options;

      if (!event.target.multiple) {
        return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
      }

      return Array.prototype.filter.call(options, option => option.selected).map(option => option[name]);
    };

    const getItems = event => {
      const options = event.target.options;
      return Array.prototype.map.call(options, option => {
        return {
          displayValue: option.textContent,
          exportValue: option.value
        };
      });
    };

    if (this.enableScripting && this.hasJSActions) {
      selectElement.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            const options = selectElement.options;
            const value = event.detail.value;
            const values = new Set(Array.isArray(value) ? value : [value]);
            Array.prototype.forEach.call(options, option => {
              option.selected = values.has(option.value);
            });
            storage.setValue(id, {
              value: getValue(event, true)
            });
          },

          multipleSelection(event) {
            selectElement.multiple = true;
          },

          remove(event) {
            const options = selectElement.options;
            const index = event.detail.remove;
            options[index].selected = false;
            selectElement.remove(index);

            if (options.length > 0) {
              const i = Array.prototype.findIndex.call(options, option => option.selected);

              if (i === -1) {
                options[0].selected = true;
              }
            }

            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          clear(event) {
            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            storage.setValue(id, {
              value: null,
              items: []
            });
          },

          insert(event) {
            const {
              index,
              displayValue,
              exportValue
            } = event.detail.insert;
            const optionElement = document.createElement("option");
            optionElement.textContent = displayValue;
            optionElement.value = exportValue;
            selectElement.insertBefore(optionElement, selectElement.children[index]);
            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          items(event) {
            const {
              items
            } = event.detail;

            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            for (const item of items) {
              const {
                displayValue,
                exportValue
              } = item;
              const optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.appendChild(optionElement);
            }

            if (selectElement.options.length > 0) {
              selectElement.options[0].selected = true;
            }

            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          indices(event) {
            const indices = new Set(event.detail.indices);
            const options = event.target.options;
            Array.prototype.forEach.call(options, (option, i) => {
              option.selected = indices.has(i);
            });
            storage.setValue(id, {
              value: getValue(event, true)
            });
          },

          editable(event) {
            event.target.disabled = !event.detail.editable;
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      selectElement.addEventListener("input", event => {
        const exportValue = getValue(event, true);
        const value = getValue(event, false);
        storage.setValue(id, {
          value: exportValue
        });
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id,
            name: "Keystroke",
            value,
            changeEx: exportValue,
            willCommit: true,
            commitKey: 1,
            keyDown: false
          }
        });
      });

      this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], event => event.target.checked);
    } else {
      selectElement.addEventListener("input", function (event) {
        storage.setValue(id, {
          value: getValue(event)
        });
      });
    }

    this.container.appendChild(selectElement);
    return this.container;
  }

}

class PopupAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    const IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
    this.container.className = "popupAnnotation";

    if (IGNORE_TYPES.includes(this.data.parentType)) {
      return this.container;
    }

    const selector = `[data-annotation-id="${this.data.parentId}"]`;
    const parentElements = this.layer.querySelectorAll(selector);

    if (parentElements.length === 0) {
      return this.container;
    }

    const popup = new PopupElement({
      container: this.container,
      trigger: Array.from(parentElements),
      color: this.data.color,
      title: this.data.title,
      modificationDate: this.data.modificationDate,
      contents: this.data.contents
    });
    const page = this.page;

    const rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

    const popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
    const popupTop = rect[1];
    this.container.style.transformOrigin = `${-popupLeft}px ${-popupTop}px`;
    this.container.style.left = `${popupLeft}px`;
    this.container.style.top = `${popupTop}px`;
    this.container.appendChild(popup.render());
    return this.container;
  }

}

class PopupElement {
  constructor(parameters) {
    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.title = parameters.title;
    this.modificationDate = parameters.modificationDate;
    this.contents = parameters.contents;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  render() {
    const BACKGROUND_ENLIGHT = 0.7;
    const wrapper = document.createElement("div");
    wrapper.className = "popupWrapper";
    this.hideElement = this.hideWrapper ? wrapper : this.container;
    this.hideElement.hidden = true;
    const popup = document.createElement("div");
    popup.className = "popup";
    const color = this.color;

    if (color) {
      const r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
      const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
      const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
      popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
    }

    const title = document.createElement("h1");
    title.textContent = this.title;
    popup.appendChild(title);

    const dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

    if (dateObject) {
      const modificationDate = document.createElement("span");
      modificationDate.textContent = "{{date}}, {{time}}";
      modificationDate.dataset.l10nId = "annotation_date_string";
      modificationDate.dataset.l10nArgs = JSON.stringify({
        date: dateObject.toLocaleDateString(),
        time: dateObject.toLocaleTimeString()
      });
      popup.appendChild(modificationDate);
    }

    const contents = this._formatContents(this.contents);

    popup.appendChild(contents);

    if (!Array.isArray(this.trigger)) {
      this.trigger = [this.trigger];
    }

    for (const element of this.trigger) {
      element.addEventListener("click", this._toggle.bind(this));
      element.addEventListener("mouseover", this._show.bind(this, false));
      element.addEventListener("mouseout", this._hide.bind(this, false));
    }

    popup.addEventListener("click", this._hide.bind(this, true));
    wrapper.appendChild(popup);
    return wrapper;
  }

  _formatContents(contents) {
    const p = document.createElement("p");
    const lines = contents.split(/(?:\r\n?|\n)/);

    for (let i = 0, ii = lines.length; i < ii; ++i) {
      const line = lines[i];
      p.appendChild(document.createTextNode(line));

      if (i < ii - 1) {
        p.appendChild(document.createElement("br"));
      }
    }

    return p;
  }

  _toggle() {
    if (this.pinned) {
      this._hide(true);
    } else {
      this._show(true);
    }
  }

  _show(pin = false) {
    if (pin) {
      this.pinned = true;
    }

    if (this.hideElement.hidden) {
      this.hideElement.hidden = false;
      this.container.style.zIndex += 1;
    }
  }

  _hide(unpin = true) {
    if (unpin) {
      this.pinned = false;
    }

    if (!this.hideElement.hidden && !this.pinned) {
      this.hideElement.hidden = true;
      this.container.style.zIndex -= 1;
    }
  }

}

class FreeTextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "freeTextAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class LineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "lineAnnotation";
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const line = this.svgFactory.createElement("svg:line");
    line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
    line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
    line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
    line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
    line.setAttribute("stroke-width", data.borderStyle.width || 1);
    line.setAttribute("stroke", "transparent");
    svg.appendChild(line);
    this.container.append(svg);

    this._createPopup(line, data);

    return this.container;
  }

}

class SquareAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "squareAnnotation";
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const square = this.svgFactory.createElement("svg:rect");
    square.setAttribute("x", borderWidth / 2);
    square.setAttribute("y", borderWidth / 2);
    square.setAttribute("width", width - borderWidth);
    square.setAttribute("height", height - borderWidth);
    square.setAttribute("stroke-width", borderWidth || 1);
    square.setAttribute("stroke", "transparent");
    square.setAttribute("fill", "none");
    svg.appendChild(square);
    this.container.append(svg);

    this._createPopup(square, data);

    return this.container;
  }

}

class CircleAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "circleAnnotation";
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const circle = this.svgFactory.createElement("svg:ellipse");
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("rx", width / 2 - borderWidth / 2);
    circle.setAttribute("ry", height / 2 - borderWidth / 2);
    circle.setAttribute("stroke-width", borderWidth || 1);
    circle.setAttribute("stroke", "transparent");
    circle.setAttribute("fill", "none");
    svg.appendChild(circle);
    this.container.append(svg);

    this._createPopup(circle, data);

    return this.container;
  }

}

class PolylineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "polylineAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);
    let points = [];

    for (const coordinate of data.vertices) {
      const x = coordinate.x - data.rect[0];
      const y = data.rect[3] - coordinate.y;
      points.push(x + "," + y);
    }

    points = points.join(" ");
    const polyline = this.svgFactory.createElement(this.svgElementName);
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("fill", "none");
    svg.appendChild(polyline);
    this.container.append(svg);

    this._createPopup(polyline, data);

    return this.container;
  }

}

class PolygonAnnotationElement extends PolylineAnnotationElement {
  constructor(parameters) {
    super(parameters);
    this.containerClassName = "polygonAnnotation";
    this.svgElementName = "svg:polygon";
  }

}

class CaretAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "caretAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class InkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "inkAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const width = data.rect[2] - data.rect[0];
    const height = data.rect[3] - data.rect[1];
    const svg = this.svgFactory.create(width, height);

    for (const inkList of data.inkLists) {
      let points = [];

      for (const coordinate of inkList) {
        const x = coordinate.x - data.rect[0];
        const y = data.rect[3] - coordinate.y;
        points.push(`${x},${y}`);
      }

      points = points.join(" ");
      const polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "none");

      this._createPopup(polyline, data);

      svg.appendChild(polyline);
    }

    this.container.append(svg);
    return this.container;
  }

}

class HighlightAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("highlightAnnotation");
    }

    this.container.className = "highlightAnnotation";
    return this.container;
  }

}

class UnderlineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("underlineAnnotation");
    }

    this.container.className = "underlineAnnotation";
    return this.container;
  }

}

class SquigglyAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("squigglyAnnotation");
    }

    this.container.className = "squigglyAnnotation";
    return this.container;
  }

}

class StrikeOutAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("strikeoutAnnotation");
    }

    this.container.className = "strikeoutAnnotation";
    return this.container;
  }

}

class StampAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "stampAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class FileAttachmentAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true
    });
    const {
      filename,
      content
    } = this.data.file;
    this.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    this.content = content;
    this.linkService.eventBus?.dispatch("fileattachmentannotation", {
      source: this,
      id: (0, _util.stringToPDFString)(filename),
      filename,
      content
    });
  }

  render() {
    this.container.className = "fileAttachmentAnnotation";
    const trigger = document.createElement("div");
    trigger.style.height = this.container.style.height;
    trigger.style.width = this.container.style.width;
    trigger.addEventListener("dblclick", this._download.bind(this));

    if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
      this._createPopup(trigger, this.data);
    }

    this.container.appendChild(trigger);
    return this.container;
  }

  _download() {
    this.downloadManager?.openOrDownloadData(this.container, this.content, this.filename);
  }

}

class AnnotationLayer {
  static render(parameters) {
    const sortedAnnotations = [],
          popupAnnotations = [];

    for (const data of parameters.annotations) {
      if (!data) {
        continue;
      }

      if (data.annotationType === _util.AnnotationType.POPUP) {
        popupAnnotations.push(data);
        continue;
      }

      sortedAnnotations.push(data);
    }

    if (popupAnnotations.length) {
      sortedAnnotations.push(...popupAnnotations);
    }

    for (const data of sortedAnnotations) {
      const element = AnnotationElementFactory.create({
        data,
        layer: parameters.div,
        page: parameters.page,
        viewport: parameters.viewport,
        linkService: parameters.linkService,
        downloadManager: parameters.downloadManager,
        imageResourcesPath: parameters.imageResourcesPath || "",
        renderInteractiveForms: parameters.renderInteractiveForms !== false,
        svgFactory: new _display_utils.DOMSVGFactory(),
        annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
        enableScripting: parameters.enableScripting,
        hasJSActions: parameters.hasJSActions,
        mouseState: parameters.mouseState || {
          isDown: false
        }
      });

      if (element.isRenderable) {
        const rendered = element.render();

        if (data.hidden) {
          rendered.style.visibility = "hidden";
        }

        if (Array.isArray(rendered)) {
          for (const renderedElement of rendered) {
            parameters.div.appendChild(renderedElement);
          }
        } else {
          if (element instanceof PopupAnnotationElement) {
            parameters.div.prepend(rendered);
          } else {
            parameters.div.appendChild(rendered);
          }
        }
      }
    }
  }

  static update(parameters) {
    const transform = `matrix(${parameters.viewport.transform.join(",")})`;

    for (const data of parameters.annotations) {
      const elements = parameters.div.querySelectorAll(`[data-annotation-id="${data.id}"]`);

      if (elements) {
        for (const element of elements) {
          element.style.transform = transform;
        }
      }
    }

    parameters.div.hidden = false;
  }

}

exports.AnnotationLayer = AnnotationLayer;