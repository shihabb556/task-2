import { LRUCache } from "./LRUCache";

const cache = new LRUCache(2);

console.log("LRU Cache Demo");
console.log("----------------");

cache.put("A", 10);
console.log("PUT A=10");
console.log("Order:", cache.getOrder().join(" -> "));

cache.put("B", 20);
console.log("PUT B=20");
console.log("Order:", cache.getOrder().join(" -> "));

console.log("GET A ->", cache.get("A"));
console.log("Order:", cache.getOrder().join(" -> "));

cache.put("C", 30);
console.log("PUT C=30");
console.log("EVICT B");
console.log("Order:", cache.getOrder().join(" -> "));

console.log("GET B ->", cache.get("B"));
console.log("GET C ->", cache.get("C"));
console.log("GET A ->", cache.get("A"));

console.log("----------------");
console.log("Final Order:", cache.getOrder().join(" -> "));