import HashMap from "./scripts/HashMap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries());
console.log(test.length());

test.set('lion', 'brown')
console.log(test.entries());
console.log(test.length());
console.log(test.capacity);

test.set('moon', 'silver')
console.log(test.entries());
console.log(test.length());
console.log(test.capacity);

console.log(test.get('elephant'));
console.log(test.has('moon'));
console.log(test.remove('moon'));
console.log(test.has('moon'));

console.log(test.entries());
console.log(test.length());
console.log(test.keys());
console.log(test.values());

test.clear();
console.log(test.entries());
console.log(test.length());

// import HashSet from "./scripts/HashSet.js";
//
// const test = new HashSet();
//
// test.set('apple')
// test.set('banana')
// test.set('carrot')
// test.set('dog')
// test.set('elephant')
// test.set('frog')
// test.set('grape')
// test.set('hat')
// test.set('ice cream')
// test.set('jacket')
// test.set('kite')
// test.set('lion')
//
// console.log(test.entries());
// console.log(test.length());
//
// test.set('lion')
// console.log(test.entries());
// console.log(test.length());
// console.log(test.capacity);
//
// test.set('moon')
// console.log(test.entries());
// console.log(test.length());
// console.log(test.capacity);
//
// console.log(test.get('elephant'));
// console.log(test.has('moon'));
// console.log(test.remove('moon'));
// console.log(test.has('moon'));
//
// console.log(test.entries());
// console.log(test.length());
//
// test.clear();
// console.log(test.entries());
// console.log(test.length());