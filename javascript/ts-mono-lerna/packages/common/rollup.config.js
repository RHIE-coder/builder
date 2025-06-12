import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from "@rollup/plugin-node-resolve"
import json from '@rollup/plugin-json';
const input = ["build/src/index.js"];

export default [
    {
        input,
        plugins: [
            json(),
            commonjs(),
            nodeResolve(),
        ],
        output: [
            {
                file: "./bundle/index.js",
                format: "es",
            }
        ]
    },
];