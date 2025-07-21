import Node from './Node.js';

export default class LinkedList {
    constructor(head = null) {
        this._head = head;
    }

    append(value) {
        const newNode = new Node(value);
        if (this._head === null) {
            this._head = newNode;
            return;
        }
        try {
            this.tail.next = newNode;
        } catch (error) {
            this._head = newNode;
        }
    }

    prepend(value) {
        const newHead = new Node(value);
        newHead.next = this._head;
        this._head = newHead;
    }

    get size() {
        let count = 0;
        let current = this._head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }

    get head() {
        return this._head;
    }

    get tail() {
        if (this._head === null) {
            return null;
        }
        let current = this._head;
        while (current.next !== null) {
            current = current.next;
        }
        return current;
    }

    at(index) {
        if (this._head === null || index < 0) {
            return null;
        }
        
        let i = 0;
        let current = this._head;
        while (i < index && current !== null) {
            current = current.next;
            i++;
        }
        return current;
    }

    pop() {
        if (this._head === null) {
            return null;
        }
        
        if (this._head.next === null) {
            const value = this._head.value;
            this._head = null;
            return value;
        }

        let current = this._head;
        let previous = null;
        
        while (current.next !== null) {
            previous = current;
            current = current.next;
        }
        
        previous.next = null;
        return current.value;
    }

    contains(value) {
        let current = this._head;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(value) {
        let i = 0;
        let current = this._head;
        while (current !== null) {
            if (current.value === value) {
                return i;
            }
            current = current.next;
            i++;
        }
        return -1;
    }

    toString() {
        if (this._head === null) {
            return 'null';
        }
        
        let current = this._head;
        let str = '';
        while (current !== null) {
            str += `( ${current.value} ) -> `;
            current = current.next;
        }
        str += 'null';
        return str;
    }
    
    insertAt(value, index) {
        // Handle negative index
        if (index < 0) {
            return false;
        }

        // Handle insertion at beginning
        if (index === 0) {
            this.prepend(value);
            return true;
        }

        // Handle empty list
        if (this._head === null) {
            return false;
        }

        let current = this._head;
        let previous = null;
        let i = 0;

        // Traverse to position or end of list
        while (i < index && current !== null) {
            previous = current;
            current = current.next;
            i++;
        }

        // Check if index is out of bounds
        if (i < index) {
            return false;
        }

        // Perform insertion
        const newNode = new Node(value);
        newNode.next = current;
        previous.next = newNode;
        return true;
    }

    removeAt(index) {
        // Handle negative index
        if (index < 0) {
            return false;
        }

        // Handle empty list first
        if (this._head === null) {
            return false;
        }

        // Handle deletion at beginning
        if (index === 0) {
            const nextNode = this._head.next;
            this._head.next = null;
            this._head = nextNode;
            return true;
        }

        let current = this._head;
        let previous = null;
        let i = 0;

        // Traverse to position or end of list
        while (i < index && current !== null) {
            previous = current;
            current = current.next;
            i++;
        }

        // Check if index is out of bounds or current node is null
        if (i < index || current === null) {
            return false;
        }

        // Perform deletion
        previous.next = current.next;
        current.next = null;
        current = null;
        return true;
    }
}