export class EventEmitter {
  on() {
    return this
  }
  off() {
    return this
  }
  emit() {
    return true
  }
}
export class Readable extends EventEmitter {
  static from() {
    return new Readable()
  }
}
export class Writable extends EventEmitter {}
export class Transform extends Readable {}
export class Duplex extends Readable {}
export class PassThrough extends Readable {}
export class AsyncLocalStorage {
  run<T, R>(store: T, callback: () => R): R {
    console.log('AsyncLocalStorage.run stub', store)
    return callback()
  }
  getStore(): unknown {
    return undefined
  }
}
export const ReadableStream = globalThis.ReadableStream
export default {
  Readable,
  Writable,
  Transform,
  Duplex,
  PassThrough,
  ReadableStream,
  EventEmitter,
  AsyncLocalStorage,
}
