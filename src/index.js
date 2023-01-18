import { prettyPrint } from "./prettyprint";
import { Tree } from "./bst";

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
prettyPrint(rebalanced);