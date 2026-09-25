# LRU Cache

A TypeScript implementation of a Least Recently Used (LRU) Cache.

## Features

- `get(key)` returns the stored value or `-1`
- `put(key, value)` inserts or updates a value
- Successful `get()` makes the key most recently used
- Automatically removes the least recently used item when capacity is exceeded
- Average O(1) time complexity for `get()` and `put()`

## Data Structures

The implementation uses:

### 1. Map

A JavaScript `Map` stores:

`key -> linked list node`

This allows the cache to find a key in O(1) average time.

### 2. Doubly Linked List

The linked list maintains usage order.

- Head = Least Recently Used
- Tail = Most Recently Used

When a key is accessed or updated, its node is moved to the tail.

When the cache exceeds its capacity, the node at the head is removed.

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| get() | O(1) average |
| put() | O(1) average |
| Eviction | O(1) |

## Space Complexity

O(capacity)

The cache stores at most `capacity` nodes.

## Example

```ts
const cache = new LRUCache(2);

cache.put("A", 10);
cache.put("B", 20);

cache.get("A"); // 10

cache.put("C", 30);

cache.get("B"); // -1
cache.get("C"); // 30
cache.get("A"); // 10