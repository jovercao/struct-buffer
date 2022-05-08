// @ts-nocheck

if (!Reflect.get(globalThis, 'TextEncoder')) {
  Reflect.set(globalThis, 'TextEncoder', require('util').TextEncoder)
}

if (!Reflect.get(globalThis, 'TextDecoder')) {
  Reflect.set(globalThis, 'TextDecoder', require('util').TextDecoder)
}
