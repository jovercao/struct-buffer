## 5.1.3 2021-10-27

- 📦 update packages

## 5.1.2 2021-9-25

- 📚 update readme

## 5.1.1 2021-9-4

- 🐛 export `bitFields` function

## 5.1.0 2021-9-3

- ✨add [bit-fields](https://docs.microsoft.com/en-us/cpp/cpp/cpp-bit-fields?view=msvc-160) type
- ✅✔️  add bit-fields test

## 5.0.0 2021-8-7

- Fix errors caused by deeps
- You can force a structure to use big-endian or little-endian
- Add more tests

## 4.7.0 2021-7-25

- Add esm module package
- No api changes

## 4.6.1 2021-2-10

- build: Upgrade dependencies, fix packaging errors, and the problem of not being able to find the TEXT function

## 4.6.0 2021-2-8

- feat: Added `TEXT()` utility function
- test: Added "utils" test code

## 4.5.0 2021-2-7

- fix: `calcsize()` Processing format byte order
- feat: Add `makeDataView()` tool function
- feat: `unpack()` function adds an optional parameter of offset
- feat: `pack_into()`,`unpack_from()`,`iter_unpack()`,`new Struct()`
- test: Added `Struct` test
- fix: Matching error when format is "2?"
- build: Upgrade all dependencies

## 4.4.1 2021-2-6

- fix: `sbytes()` Ignore case

## 4.4.0 2021-2-6

- fix: `pack()` has a bug when processing `string_t`
- feat: `sbytes2()`, `b2('abc 0x640ah') => <61 62 63 20 64 0a>`
- perf: `sbytes()` Parse multiple types of byte strings
- test: Optimize test code
- docs: Update the code sample on "readme.md"

## 4.3.0 2021-2-5

- fix: bits(...)[n], `EFLAG[2].decode(...) => [{...},{...}]`
- fix: BOOl, Before:`BOOl.decode(...) => 1`, Now: `BOOl.decode(...) => true`
- feat: bool type
- feat: padding_t type
- feat: `sbytes(...)` and `sview(...)`
- feat: [py-struct](https://docs.python.org/zh-cn/3/library/struct.html), `calcsize(...)`, `unpack(...)`, `pack(...)`

## 4.2.0 2021-1-17

- feat: `bits(...)` see readme.

## 4.1.0 2021-1-9

- When decode input array, convert to Uint8Array

## 4.0.2 2021-1-6

- fix FLOAT and DOUBLE

## 4.0.1 2021-1-5

- build "v4.0.0" 😂

## 4.0.0 2021-1-5

- fix: [#1](https://github.com/januwA/struct-buffer/issues/1)
- Support struct multi array
- Some api changes (e.g. parseCStruct => CStruct.parse, toCStruct => CStruct.from)
- Add When reading a string, it will end reading directly when it encounters 0x0, and the following bytes will be filled with 0

## 3.0.0 2020-12-25

- Support reading "c-struct" string template and converting it into StructBuffer
- Support converting StructBuffer into "c-struct" string
- Support StructBuffer list
- Added typedef function for more convenient type definition
- Added more default types
- Fixed sizeof function

## 2.0.0 2020-12-25

- Support custom type (e.g. short = registerType("short", 2, false))
- struct nesting


## 1.0.0 2020-12-24

- Add sizeof and display function
- Add type array (e.g. BYTE[3], float[4x4])
- Support array nesting (e.g. double[4][2])
- No longer supports string attributes (e.g. 'char' 'DWORD')

## 0.1.0 2020-12-23

- Add structure to ArrayBuffer