// @ts-nocheck
const gb = typeof global !== 'undefined' ? global : typeof globalThis !== 'undefined' ? globalThis : window

if (!Reflect.get(gb, 'TextEncoder')) {
  Reflect.set(gb, 'TextEncoder', require('util').TextEncoder)
}

if (!Reflect.get(gb, 'TextDecoder')) {
  Reflect.set(gb, 'TextDecoder', require('util').TextDecoder)
}
