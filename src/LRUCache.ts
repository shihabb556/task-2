type CacheKey = string;
type CacheValue = number;

class Node {
  key: CacheKey;
  value: CacheValue;
  prev: Node | null = null;
  next: Node | null = null;

  constructor(key: CacheKey, value: CacheValue) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache {
  private readonly capacity: number;
  private readonly cache = new Map<CacheKey, Node>();

  // head = Least Recently Used
  // tail = Most Recently Used
  private head: Node | null = null;
  private tail: Node | null = null;

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Cache capacity must be a positive integer.");
    }

    this.capacity = capacity;
  }

  get(key: CacheKey): CacheValue {
    const node = this.cache.get(key);

    if (!node) {
      return -1;
    }

    // Successful get makes this key most recently used.
    this.moveToTail(node);

    return node.value;
  }

  put(key: CacheKey, value: CacheValue): void {
    const existingNode = this.cache.get(key);

    // Update existing key.
    if (existingNode) {
      existingNode.value = value;
      this.moveToTail(existingNode);
      return;
    }

    // Add new key.
    const newNode = new Node(key, value);

    this.cache.set(key, newNode);
    this.addToTail(newNode);

    // Remove LRU item if capacity exceeded.
    if (this.cache.size > this.capacity) {
      this.removeHead();
    }
  }

  // For testing/demo purposes.
  getOrder(): string[] {
    const order: string[] = [];
    let current = this.head;

    while (current) {
      order.push(current.key);
      current = current.next;
    }

    return order;
  }

  private addToTail(node: Node): void {
    node.prev = this.tail;
    node.next = null;

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }

    this.tail = node;
  }

  private removeNode(node: Node): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    node.prev = null;
    node.next = null;
  }

  private moveToTail(node: Node): void {
    if (node === this.tail) {
      return;
    }

    this.removeNode(node);
    this.addToTail(node);
  }

  private removeHead(): void {
    if (!this.head) {
      return;
    }

    const lruNode = this.head;

    this.removeNode(lruNode);
    this.cache.delete(lruNode.key);
  }
}