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
exports.Binder = void 0;

var _xfa_object = require("./xfa_object.js");

var _template = require("./template.js");

var _som = require("./som.js");

var _namespaces = require("./namespaces.js");

var _util = require("../../shared/util.js");

function createText(content) {
  const node = new _template.Text({});
  node[_xfa_object.$content] = content;
  return node;
}

class Binder {
  constructor(root) {
    this.root = root;
    this.datasets = root.datasets;

    if (root.datasets && root.datasets.data) {
      this.emptyMerge = false;
      this.data = root.datasets.data;
    } else {
      this.emptyMerge = true;
      this.data = new _xfa_object.XmlObject(_namespaces.NamespaceIds.datasets.id, "data");
    }

    this.root.form = this.form = root.template[_xfa_object.$clone]();
  }

  _isConsumeData() {
    return !this.emptyMerge && this._mergeMode;
  }

  _isMatchTemplate() {
    return !this._isConsumeData();
  }

  bind() {
    this._bindElement(this.form, this.data);

    return this.form;
  }

  getData() {
    return this.data;
  }

  _bindValue(formNode, data, picture) {
    if (formNode[_xfa_object.$hasSettableValue]()) {
      if (data[_xfa_object.$isDataValue]()) {
        const value = data[_xfa_object.$getDataValue]();

        formNode[_xfa_object.$setValue](createText(value));

        formNode[_xfa_object.$data] = data;
      } else if (formNode instanceof _template.Field && formNode.ui && formNode.ui.choiceList && formNode.ui.choiceList.open === "multiSelect") {
        const value = data[_xfa_object.$getChildren]().map(child => child[_xfa_object.$content].trim()).join("\n");

        formNode[_xfa_object.$setValue](createText(value));

        formNode[_xfa_object.$data] = data;
      } else if (this._isConsumeData()) {
        (0, _util.warn)(`XFA - Nodes haven't the same type.`);
      }
    } else if (!data[_xfa_object.$isDataValue]() || this._isMatchTemplate()) {
      this._bindElement(formNode, data);

      formNode[_xfa_object.$data] = data;
    } else {
      (0, _util.warn)(`XFA - Nodes haven't the same type.`);
    }
  }

  _findDataByNameToConsume(name, isValue, dataNode, global) {
    if (!name) {
      return null;
    }

    let generator, match;

    for (let i = 0; i < 3; i++) {
      generator = dataNode[_xfa_object.$getRealChildrenByNameIt](name, false, true);

      while (true) {
        match = generator.next().value;

        if (!match) {
          break;
        }

        if (isValue === match[_xfa_object.$isDataValue]()) {
          return match;
        }
      }

      if (dataNode[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.datasets.id && dataNode[_xfa_object.$nodeName] === "data") {
        break;
      }

      dataNode = dataNode[_xfa_object.$getParent]();
    }

    if (!global) {
      return null;
    }

    generator = this.data[_xfa_object.$getRealChildrenByNameIt](name, false, false);

    while (true) {
      match = generator.next().value;

      if (!match) {
        break;
      }

      if (match[_xfa_object.$global]) {
        return match;
      }
    }

    generator = this.data[_xfa_object.$getAttributeIt](name, true);
    match = generator.next().value;

    if (match && match[_xfa_object.$isDataValue]()) {
      return match;
    }

    return null;
  }

  _setProperties(formNode, dataNode) {
    if (!formNode.hasOwnProperty("setProperty")) {
      return;
    }

    for (const {
      ref,
      target,
      connection
    } of formNode.setProperty.children) {
      if (connection) {
        continue;
      }

      if (!ref) {
        continue;
      }

      const [node] = (0, _som.searchNode)(this.root, dataNode, ref, false, false);

      if (!node) {
        (0, _util.warn)(`XFA - Invalid reference: ${ref}.`);
        continue;
      }

      if (!node[_xfa_object.$isDescendent](this.data)) {
        (0, _util.warn)(`XFA - Invalid node: must be a data node.`);
        continue;
      }

      const [targetNode] = (0, _som.searchNode)(this.root, formNode, target, false, false);

      if (!targetNode) {
        (0, _util.warn)(`XFA - Invalid target: ${target}.`);
        continue;
      }

      if (!targetNode[_xfa_object.$isDescendent](formNode)) {
        (0, _util.warn)(`XFA - Invalid target: must be a property or subproperty.`);
        continue;
      }

      const targetParent = targetNode[_xfa_object.$getParent]();

      if (targetNode instanceof _template.SetProperty || targetParent instanceof _template.SetProperty) {
        (0, _util.warn)(`XFA - Invalid target: cannot be a setProperty or one of its properties.`);
        continue;
      }

      if (targetNode instanceof _template.BindItems || targetParent instanceof _template.BindItems) {
        (0, _util.warn)(`XFA - Invalid target: cannot be a bindItems or one of its properties.`);
        continue;
      }

      const content = node[_xfa_object.$text]();

      const name = targetNode[_xfa_object.$nodeName];

      if (targetNode instanceof _xfa_object.XFAAttribute) {
        const attrs = Object.create(null);
        attrs[name] = content;
        const obj = Reflect.construct(Object.getPrototypeOf(targetParent).constructor, [attrs]);
        targetParent[name] = obj[name];
        continue;
      }

      if (!targetNode.hasOwnProperty(_xfa_object.$content)) {
        (0, _util.warn)(`XFA - Invalid node to use in setProperty`);
        continue;
      }

      targetNode[_xfa_object.$data] = node;
      targetNode[_xfa_object.$content] = content;

      targetNode[_xfa_object.$finalize]();
    }
  }

  _bindItems(formNode, dataNode) {
    if (!formNode.hasOwnProperty("items") || !formNode.hasOwnProperty("bindItems") || formNode.bindItems.isEmpty()) {
      return;
    }

    for (const item of formNode.items.children) {
      formNode[_xfa_object.$removeChild](item);
    }

    formNode.items.clear();
    const labels = new _template.Items({});
    const values = new _template.Items({});

    formNode[_xfa_object.$appendChild](labels);

    formNode.items.push(labels);

    formNode[_xfa_object.$appendChild](values);

    formNode.items.push(values);

    for (const {
      ref,
      labelRef,
      valueRef,
      connection
    } of formNode.bindItems.children) {
      if (connection) {
        continue;
      }

      if (!ref) {
        continue;
      }

      const nodes = (0, _som.searchNode)(this.root, dataNode, ref, false, false);

      if (!nodes) {
        (0, _util.warn)(`XFA - Invalid reference: ${ref}.`);
        continue;
      }

      for (const node of nodes) {
        if (!node[_xfa_object.$isDescendent](this.datasets)) {
          (0, _util.warn)(`XFA - Invalid ref (${ref}): must be a datasets child.`);
          continue;
        }

        const [labelNode] = (0, _som.searchNode)(this.root, node, labelRef, true, false);

        if (!labelNode) {
          (0, _util.warn)(`XFA - Invalid label: ${labelRef}.`);
          continue;
        }

        if (!labelNode[_xfa_object.$isDescendent](this.datasets)) {
          (0, _util.warn)(`XFA - Invalid label: must be a datasets child.`);
          continue;
        }

        const [valueNode] = (0, _som.searchNode)(this.root, node, valueRef, true, false);

        if (!valueNode) {
          (0, _util.warn)(`XFA - Invalid value: ${valueRef}.`);
          continue;
        }

        if (!valueNode[_xfa_object.$isDescendent](this.datasets)) {
          (0, _util.warn)(`XFA - Invalid value: must be a datasets child.`);
          continue;
        }

        const label = createText(labelNode[_xfa_object.$text]());
        const value = createText(valueNode[_xfa_object.$text]());

        labels[_xfa_object.$appendChild](label);

        labels.text.push(label);

        values[_xfa_object.$appendChild](value);

        values.text.push(value);
      }
    }
  }

  _bindOccurrences(formNode, matches, picture) {
    let baseClone;

    if (matches.length > 1) {
      baseClone = formNode[_xfa_object.$clone]();
    }

    this._bindValue(formNode, matches[0], picture);

    this._setProperties(formNode, matches[0]);

    this._bindItems(formNode, matches[0]);

    if (matches.length === 1) {
      return;
    }

    const parent = formNode[_xfa_object.$getParent]();

    const name = formNode[_xfa_object.$nodeName];

    const pos = parent[_xfa_object.$indexOf](formNode);

    for (let i = 1, ii = matches.length; i < ii; i++) {
      const match = matches[i];

      const clone = baseClone[_xfa_object.$clone]();

      clone.occur.min = 1;
      clone.occur.max = 1;
      clone.occur.initial = 1;
      parent[name].push(clone);

      parent[_xfa_object.$insertAt](pos + i, clone);

      this._bindValue(clone, match, picture);

      this._setProperties(clone, match);

      this._bindItems(clone, match);
    }
  }

  _createOccurrences(formNode) {
    if (!this.emptyMerge) {
      return;
    }

    const {
      occur
    } = formNode;

    if (!occur || occur.initial <= 1) {
      return;
    }

    const parent = formNode[_xfa_object.$getParent]();

    const name = formNode[_xfa_object.$nodeName];

    for (let i = 0, ii = occur.initial; i < ii; i++) {
      const clone = formNode[_xfa_object.$clone]();

      clone.occur.min = 1;
      clone.occur.max = 1;
      clone.occur.initial = 1;
      parent[name].push(clone);

      parent[_xfa_object.$appendChild](clone);
    }
  }

  _getOccurInfo(formNode) {
    const {
      occur
    } = formNode;
    const dataName = formNode.name;

    if (!occur || !dataName) {
      return [1, 1];
    }

    const max = occur.max === -1 ? Infinity : occur.max;
    return [occur.min, max];
  }

  _bindElement(formNode, dataNode) {
    const uselessNodes = [];

    this._createOccurrences(formNode);

    for (const child of formNode[_xfa_object.$getChildren]()) {
      if (child[_xfa_object.$data]) {
        continue;
      }

      if (this._mergeMode === undefined && child[_xfa_object.$nodeName] === "subform") {
        this._mergeMode = child.mergeMode === "consumeData";
      }

      let global = false;
      let picture = null;
      let ref = null;
      let match = null;

      if (child.bind) {
        switch (child.bind.match) {
          case "none":
            this._bindElement(child, dataNode);

            continue;

          case "global":
            global = true;
            break;

          case "dataRef":
            if (!child.bind.ref) {
              (0, _util.warn)(`XFA - ref is empty in node ${child[_xfa_object.$nodeName]}.`);

              this._bindElement(child, dataNode);

              continue;
            }

            ref = child.bind.ref;
            break;

          default:
            break;
        }

        if (child.bind.picture) {
          picture = child.bind.picture[_xfa_object.$content];
        }
      }

      const [min, max] = this._getOccurInfo(child);

      if (ref) {
        match = (0, _som.searchNode)(this.root, dataNode, ref, true, false);

        if (match === null) {
          match = (0, _som.createDataNode)(this.data, dataNode, ref);

          if (this._isConsumeData()) {
            match[_xfa_object.$consumed] = true;
          }

          match = [match];
        } else {
          if (this._isConsumeData()) {
            match = match.filter(node => !node[_xfa_object.$consumed]);
          }

          if (match.length > max) {
            match = match.slice(0, max);
          } else if (match.length === 0) {
            match = null;
          }

          if (match && this._isConsumeData()) {
            match.forEach(node => {
              node[_xfa_object.$consumed] = true;
            });
          }
        }
      } else {
        if (!child.name) {
          this._bindElement(child, dataNode);

          continue;
        }

        if (this._isConsumeData()) {
          const matches = [];

          while (matches.length < max) {
            const found = this._findDataByNameToConsume(child.name, child[_xfa_object.$hasSettableValue](), dataNode, global);

            if (!found) {
              break;
            }

            found[_xfa_object.$consumed] = true;
            matches.push(found);
          }

          match = matches.length > 0 ? matches : null;
        } else {
          match = dataNode[_xfa_object.$getRealChildrenByNameIt](child.name, false, false).next().value;

          if (!match) {
            match = new _xfa_object.XmlObject(dataNode[_xfa_object.$namespaceId], child.name);

            dataNode[_xfa_object.$appendChild](match);
          }

          match = [match];
        }
      }

      if (match) {
        if (match.length < min) {
          (0, _util.warn)(`XFA - Must have at least ${min} occurrences: ${formNode[_xfa_object.$nodeName]}.`);
          continue;
        }

        this._bindOccurrences(child, match, picture);
      } else if (min > 0) {
        this._setProperties(child, dataNode);

        this._bindItems(child, dataNode);

        this._bindElement(child, dataNode);
      } else {
        uselessNodes.push(child);
      }
    }

    uselessNodes.forEach(node => node[_xfa_object.$getParent]()[_xfa_object.$removeChild](node));
  }

}

exports.Binder = Binder;