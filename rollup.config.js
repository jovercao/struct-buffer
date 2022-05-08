import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
    input: "./src/index.ts",
    output: {
        name: 'StructBuffer',
        file: "dist/umd/struct-buffer.js",
        format: "umd",
    },
    plugins: [commonjs(), nodeResolve({ extensions }), typescript({ tsconfig: './tsconfig.rollup.json' })],
};
