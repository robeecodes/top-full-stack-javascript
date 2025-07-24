import Node from "./Node.js";
import mergeSort from "./utils/mergeSort.js";
import removeDuplicates from "./utils/removeDuplicates.js";

export default class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        const sortedArr = removeDuplicates(mergeSort(arr));

        return this.buildBalancedTree(sortedArr);
    }

    buildBalancedTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildBalancedTree(arr.slice(0, mid));
        root.right = this.buildBalancedTree(arr.slice(mid + 1));

        return root;
    }

    insert(value, curr = this.root) {
        if (value < curr.data) {
            if (curr.left === null) {
                curr.left = new Node(value);
            } else if (value > curr.left.data) {
                const tmp = curr.left;
                curr.left = new Node(value);
                curr.left.left = tmp;
            } else {
                this.insert(value, curr.left);
            }
        } else if (value > curr.data) {
            if (curr.right === null) {
                curr.right = new Node(value);
            } else if (value > curr.right.data) {
                const tmp = curr.right;
                curr.right = new Node(value);
                curr.right.right = tmp;
            } else {
                this.insert(value, curr.right);
            }
        }
    }

    delete(value, curr = this.root, prev = this.root) {
        if (curr === null) return null;

        if (value < curr.data) {
            this.delete(value, curr.left, curr);
        } else if (value > curr.data) {
            this.delete(value, curr.right, curr);
        } else if (value === curr.data) {
            // Case 1: No children (leaf node)
            if (curr.left === null && curr.right === null) {
                // If it's the root node
                if (curr === this.root) {
                    this.root = null;
                } else {
                    // Remove reference from parent
                    if (prev.left === curr) {
                        prev.left = null;
                    } else {
                        prev.right = null;
                    }
                }
            }
            // Case 2: One child
            else if (curr.left === null) {
                if (curr === this.root) {
                    this.root = curr.right;
                } else if (prev.left === curr) {
                    prev.left = curr.right;
                } else {
                    prev.right = curr.right;
                }
            }
            else if (curr.right === null) {
                if (curr === this.root) {
                    this.root = curr.left;
                } else if (prev.left === curr) {
                    prev.left = curr.left;
                } else {
                    prev.right = curr.left;
                }
            }
            // Case 3: Two children
            else {
                // Find the minimum value in right subtree (successor)
                let successorParent = curr;
                let successor = curr.right;
                
                while (successor.left !== null) {
                    successorParent = successor;
                    successor = successor.left;
                }
                
                // Replace current node's data with successor's data
                curr.data = successor.data;
                
                // Delete the successor (which has at most one child)
                if (successorParent === curr) {
                    successorParent.right = successor.right;
                } else {
                    successorParent.left = successor.right;
                }
            }
        }
    }

    find(value, curr = this.root) {
        if (curr === null) return null;
        if (value === curr.data) return curr;
        if (value < curr.data) return this.find(value, curr.left);
        return this.find(value, curr.right);
    }

    levelOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error('Callback is required');
        }
        const queue = [this.root];
        while (queue.length > 0) {
            const curr = queue.shift();
            callback(curr);
            if (curr.left !== null) {
                queue.push(curr.left);
            }
            if (curr.right !== null) {
                queue.push(curr.right);
            }
        }
    }

    preOrderForEach(callback, node = this.root) {
        if (callback === undefined) {
            throw new Error('Callback is required');
        }
        if (node === null) return;
        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    inOrderForEach(callback, node = this.root) {
        if (callback === undefined) {
            throw new Error('Callback is required');
        }
        if (node === null) return;

        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node = this.root) {
        if (callback === undefined) {
            throw new Error('Callback is required');
        }
        if (node === null) return;
        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }

    height(value) {
        const curr = this.find(value);
        if (curr === null) return null;
        return this.findHeightRecursive(curr);
    }

    findHeightRecursive(node) {
        if (node === null) return -1;
        return 1 + Math.max(this.findHeightRecursive(node.left), this.findHeightRecursive(node.right));
    }

    depth(value) {
        const curr = this.find(value);
        if (curr === null) return null;
        return this.findDepthRecursive(curr);
    }

    findDepthRecursive(node, curr = this.root, depth = 0) {
        if (!curr) return -1;
        if (node === curr) return depth;
        if (node.value < curr.value) return this.findDepthRecursive(node, curr.left, depth + 1);
        else return this.findDepthRecursive(node, curr.right, depth + 1);
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        // Get height of left and right subtrees
        const heightLeft = this.findHeightRecursive(node.left);
        const heightRight = this.findHeightRecursive(node.right);

        // Check if current node is balanced
        if (Math.abs(heightLeft - heightRight) > 1) return false;

        // Recursively check left and right subtrees
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const arr = [];

        this.levelOrderForEach(node => arr.push(node.data));

        this.root = this.buildTree(arr);
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

}