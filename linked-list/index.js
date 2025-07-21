import LinkedList from "./LinkedList.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
console.log(list.find("hamster"));
console.log(list.removeAt(2));
console.log(list.toString());
console.log(list.find("hamster"));
console.log(list.insertAt("chicken", 2));
console.log(list.toString());
console.log(list.find("chicken"));
console.log(list.size);
console.log(list.contains("shark"));
console.log(list.contains("cat"));

list.pop();
console.log(list.toString());

list.prepend("fish");
console.log(list.toString());
console.log(list.head);
console.log(list.tail);