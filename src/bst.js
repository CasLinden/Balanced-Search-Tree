import { Node } from "./node";

export function Tree(InputArr) {
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
    if (current === null) return;
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
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return true;
  }

  function rebalance() {
    let orderedArr = this.inOrder();
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
