import Tree from "./scripts/Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);

tree.prettyPrint(tree.root);

console.log(tree.isBalanced());

// tree.levelOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.preOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.inOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.postOrderForEach((node) => {
//     console.log(node.data);
// });

tree.insert(300);
tree.insert(4583);
tree.insert(123);
tree.insert(1234);
tree.insert(12345);
tree.insert(123456);
tree.insert(1234567);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

// tree.levelOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.preOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.inOrderForEach((node) => {
//     console.log(node.data);
// });
// tree.postOrderForEach((node) => {
//     console.log(node.data);
// });