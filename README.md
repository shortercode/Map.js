# Map.js
An implementation of a map class for JavaScript

See source code for documentation, is heavily commented.

#### example usage

```
var map = new Map();

var node = document.createElement("div");
var str = "hello";
var int = 1;
var bool = true;

map.set(node, {prop: 1});
map.set(str, {prop: 2});
map.set(int, {prop: 3});
map.set(bool, {prop: 4});

map.get(node) 
// => {prop: 1}

map.size
// => 4

map.delete(str)
// => true

map.size
// => 3
```
