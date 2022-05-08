const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
import typescript from '@rollup/plugin-typescript';

export default {
    input: "./src/index.ts",
    output: {
        name: 'StructBuffer',
        file: "dist/umd/struct-buffer.js",
        format: "umd",
    },
    plugins: [commonjs(),resolve(), typescript({ tsconfig: './tsconfig.esm.json' })],
};
