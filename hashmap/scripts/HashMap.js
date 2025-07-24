import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

export default class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode |= 0;
        }

        return Math.abs(hashCode);
    }

    accessor(key) {
        const index = this.hash(key) % this.buckets.length;

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds: " + index);
        }

        return index;
    }

    grow() {
        if (this.length() / this.capacity > this.loadFactor) {
            this.capacity *= 2;
            const newBuckets = new Array(this.capacity);
            for (let i = 0; i < this.buckets.length; i++) {
                if (this.buckets[i] !== undefined) {
                    newBuckets[i] = this.buckets[i];
                }
            }
            this.buckets = newBuckets;
        }
    }

    set(key, value) {
        const index = this.accessor(key);

        const node = new Node(key, value);

        if (this.buckets[index] === undefined) {
            this.buckets[index] = new LinkedList(node);
        } else {
            const existingNode = this.buckets[index].find(key);

            if (existingNode !== -1) {
                this.buckets[index].removeAt(existingNode);
            }
            this.buckets[index].append(node);
        }

        this.grow();
    }

    get(key) {
        const index = this.accessor(key);

        if (this.buckets[index] === undefined) return null;

        const node = this.buckets[index].find(key);
        if (node === -1) return null;
        return this.buckets[index].at(node).value;
    }

    has(key) {
        const index = this.accessor(key);

        if (this.buckets[index] === undefined) return false;
        return this.buckets[index].contains(key);
    }

    remove(key) {
        const index = this.accessor(key);

        if (this.buckets[index] === undefined) return false;

        const node = this.buckets[index].find(key);
        if (node === -1) return false;
        this.buckets[index].removeAt(node);
        return true;
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                count += this.buckets[i].size;
            }
        }
        return count;
    }

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                let node = this.buckets[i].head;
                while (node !== null) {
                    keys.push(node.key);
                    node = node.next;
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                let node = this.buckets[i].head;
                while (node !== null) {
                    values.push(node.value);
                    node = node.next;
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                let node = this.buckets[i].head;
                while (node !== null) {
                    entries.push([node.key, node.value]);
                    node = node.next;
                }
            }
        }
        return entries;
    }
}
