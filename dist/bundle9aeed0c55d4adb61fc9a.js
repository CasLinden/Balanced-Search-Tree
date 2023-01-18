/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/prettyprint.js":
/*!****************************!*\
  !*** ./src/prettyprint.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prettyPrint": () => (/* binding */ prettyPrint)
/* harmony export */ });
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prettyprint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prettyprint */ "./src/prettyprint.js");



let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = Tree(arr);


bst.insertNode(100)
bst.insertNode(120)
bst.insertNode(130);
bst.insertNode(140);
bst.deleteNode(8);
bst.find(7)
bst.levelOrder()
console.log(bst.inOrder(bst.root))
console.log(bst.preOrder(bst.root))
console.log(bst.postOrder(bst.root))
bst.depth(bst.find(7))
bst.depth(bst.find(3))
console.log(bst.height(bst.root));
console.log(bst.isBalanced());
let rebalanced = bst.rebalance();
(0,_prettyprint__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(rebalanced);

function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(InputArr) {
  let arr = removeDuplicatesAndSort(InputArr);
  let root = buildTree(arr, 0, arr.length - 1);

  function removeDuplicatesAndSort(arr) {
    const uniqueArr = [...new Set(arr)];
    uniqueArr.sort(function (a, b) {
      return a - b;
    });
    return uniqueArr;
  }

  function buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = Node(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }

  function insertNode(value, current = root) {
    if (value < current.data) {
      if (current.left === null) {
        return (current.left = Node(value));
      }
      insertNode(value, current.left);
    } else if (value > current.data) {
      if (current.right === null) {
        return (current.right = Node(value));
      }
      insertNode(value, current.right);
    }
  }

  function deleteNode(value, current = root) {
    if (current === null) return null;
    if (value === root.data) return _deleteSwitch(current);
    if (current.left?.data === value || current.right?.data === value) {
      let oldNode = current.left?.data === value ? current.left : current.right;
      return _deleteSwitch(oldNode, current);
    }
    if (value < current.data) {
      return deleteNode(value, current.left);
    } else if (value > current.data) {
      return deleteNode(value, current.right);
    }
  }

  function _deleteSwitch(oldNode, parent) {
    if (!oldNode.left && !oldNode.right) {
      _deleter(oldNode, parent);
    } else if (
      (!oldNode.left && oldNode.right) ||
      (oldNode.left && !oldNode.right)
    ) {
      let child = oldNode.left ? oldNode.left : oldNode.right;
      _deleter(oldNode, parent, child);
    } else {
      let successor = oldNode.right;
      while (successor.left) {
        successor = successor.left;
      }
      let successorData = successor.data;
      deleteNode(successor.data);
      oldNode.data = successorData;
    }
  }

  function _deleter(oldNode, parent, newVal = null) {
    if (parent.right === oldNode) {
      parent.right = newVal;
    } else {
      parent.left = newVal;
    }
  }

  function find(value, current = root) {
    if (current === null) return null;
    if (value === current.data) {
      console.log(current);
      return current;
    }
    if (value < current.data) {
      return find(value, current.left);
    } else if (value > current.data) {
      return find(value, current.right);
    }
  }

  function levelOrder(func) {
    if (!func) {
      var output = [];
    }
    let queue = [this.root];
    function enqueueChildren(node) {
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    function processNode(node) {
      enqueueChildren(node);
      if (!func) {
        output.push(node.data);
      } else func(node.data);
    }
    while (queue.length > 0) {
      let node = queue.shift();
      processNode(node);
    }
    if (!func) {
      console.log(`LevelOrder: ${output}`);
    }
  }

  function inOrder(current = this.root, func, output = []) {
    if (current === null) {
      return
    }
    inOrder(current.left, func, output);
    func ? func(current) : output.push(current.data);
    inOrder(current.right, func, output);

    if (output.length > 0) return output;
  }

  function preOrder(current, func, output = []) {
    if (current === null) return;
    func ? func(current) : output.push(current.data);
    preOrder(current.left, func, output);
    preOrder(current.right, func, output);
    if (output.length > 0) return output;
  }

  function postOrder(current, func, output = []) {
    if (current === null) return;
    postOrder(current.left, func, output);
    postOrder(current.right, func, output);
    func ? func(current) : output.push(current.data);
    if (output.length > 0) return output;
  }

  function height(current = root) {
    if (current === null) return -1;

    let leftHeight = height(current.left);
    let rightHeight = height(current.right);

    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  function depth(node, root = this.root, depthCount = 0) {
    if (root === null || node === null) return;
    if (node === root) {
      console.log(depthCount);
      return depthCount;
    }
    if (node.data < root.data) {
      return depth(node, root.left, depthCount + 1);
    } else {
      return depth(node, root.right, depthCount + 1);
    }
  }

  function isBalanced() {
    let leftHeight = height(root.left)
    let rightHeight = height(root.right)
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false
    }
    return true 
  }

  function rebalance() {
    let orderedArr = this.inOrder()
    return buildTree(orderedArr, 0, orderedArr.length - 1);
  }

  return {
    root,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

// function prettyPrint(node, prefix = "", isLeft = true) {
//   if (node.right !== null) {
//     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//   }
//   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//   if (node.left !== null) {
//     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
//   }
// }

})();

/******/ })()
;
//# sourceMappingURL=bundle9aeed0c55d4adb61fc9a.js.map