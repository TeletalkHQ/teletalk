import { StringMap } from "teletalk-type-store";

type Key = "session" | "configs";

export class Storage {
  private storage?: globalThis.Storage;

  constructor() {
    if (typeof window !== "undefined") this.storage = localStorage;
  }

  get(key: Key) {
    return this.storage?.getItem(key);
  }

  set(key: Key, value: string | StringMap) {
    const finalData = typeof value === "object" ? JSON.stringify(value) : value;
    this.storage?.setItem(key, finalData);
  }

  clear() {
    this.storage?.clear();
  }

  remove(key: Key) {
    this.storage?.removeItem(key);
  }

  isInitialized() {
    return !!this.storage;
  }
}

export const storage = new Storage();
