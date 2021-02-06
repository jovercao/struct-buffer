/**
 * 设置数组嵌套层数
 * @param array
 * @param deeps
 * @param isString
 */
export function unflattenDeep(
  array: any[] | string,
  deeps: number[],
  isString = false
) {
  let r: any = array;

  if (isString && typeof r === "string") r = (r as any).split("");

  for (let i = deeps.length - 1; i >= 1; i--) {
    const isFirst = i === deeps.length - 1;
    const value = deeps[i];
    r = r.reduce((acc: any, it: any, index: number) => {
      if (index % value === 0) acc.push([]);
      acc[acc.length - 1].push(it);
      return acc;
    }, []);

    if (isString && isFirst) {
      r = r.map((it: any) => it.join(""));
    }
  }
  return r;
}

export function zeroMemory(view: DataView, length: number, offset: number) {
  while (length-- > 0) view.setUint8(offset++, 0);
}

export function createDataView(byteLength: number, view?: DataView) {
  return view ? view : new DataView(new ArrayBuffer(byteLength));
}

export function makeDataView(view: ArrayBufferView | number[]): DataView {
  if (view instanceof DataView) return view;
  if (Array.isArray(view)) view = Uint8Array.from(view);
  if (!ArrayBuffer.isView(view))
    throw new Error(`Type Error: (${view}) is not an ArrayBuffer!!!`);
  return new DataView(view.buffer);
}

export function arrayProxy(
  context: any,
  cb: (target: any, index: number) => any
) {
  return new Proxy(context, {
    get(o: any, k: string | number | symbol) {
      if (k in o) return o[k];
      if (/\d+/.test(k.toString())) return cb(o, parseInt(k as string));
    },
  });
}

/**
 * 收集index到deeps，上下文不变
 * @param context
 */
export function arrayNextProxy(context: any) {
  const proxy = arrayProxy(context, (o, i) => {
    o.deeps.push(i);
    return proxy;
  });
  return proxy;
}

/**
 * ```
 * b('61 62 63 64 0a')
 *
 * b('616263640a')
 * b('0x610x620x630x640x0a')
 * b('0x61 0x62 0x63 0x64 0x0a')
 * b('616263 640a')
 *
 * // => <61 62 63 64 0a>
 * ```
 */
export function sbytes(str: string): DataView {
  str = str.replace(/0x|h|\s/g, "");
  if (str.length % 2 !== 0) str = str.slice(0, -1);
  str = str.replace(/(\w{2})(?=\w)/g, "$1 ");
  return new DataView(
    Uint8Array.from(str.split(/\s+/).map((it) => parseInt(it, 16))).buffer
  );
}

const HEX_EXP = /^(0x([0-9a-f]{1,2})|([0-9a-f]{1,2})h|\\x([0-9a-f]{1,2}))/i;
const HEX_SEARCH_EXP = /0x([0-9a-f]{1,2})|([0-9a-f]{1,2})h|\\x([0-9a-f]{1,2})/i;

/**
 * ```ts
 * b2('abc 0x640x0a')
 * b2('abc 0x640ah')
 * b2('abc \\x640ah')
 * // => <61 62 63 20 64 0a>
 *
 * unpack('3sxbb3s', b2('abc \\x640ahend'))
 * // => [ 'abc', 100, 10, 'end' ]
 * ```
 */
export function sbytes2(str: string, te = new TextEncoder()): DataView {
  let m;
  const bytes = [];
  while (str.length) {
    m = str.match(HEX_EXP);
    if (m && m[1]) {
      const v = m[2] ?? m[3] ?? m[4] ?? 0;
      bytes.push(parseInt(v, 16));
      str = str.substr(m[1].length);
    } else if (str.length) {
      const i = str.search(HEX_SEARCH_EXP);
      if (i < 0) {
        // all string
        bytes.push(...te.encode(str));
        str = "";
      } else {
        const s = str.substr(0, i);
        bytes.push(...te.encode(s));
        str = str.substr(i);
      }
    }
  }

  return new DataView(Uint8Array.from(bytes).buffer);
}

/**
 *
 * ArrayBufferView or number[] to string
 * ```ts
 * sview([2, 0, 0, 1])
 * // => 02 00 00 01
 *
 * sview(new Uint8Array([0, 1, 10]))
 * // => 00 01 0a
 *
 * sview(b2('abc01h2h3h'))
 * // => 61 62 63 01 02 03
 * ```
 */
export function sview(view: ArrayBufferView | number[]): string {
  const v = makeDataView(view);
  const lst = [];
  for (let i = 0; i < v.byteLength; i++) {
    lst.push(v.getUint8(i).toString(16).padStart(2, "0"));
  }
  return lst.join(" ");
}
