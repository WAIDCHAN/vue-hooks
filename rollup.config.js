import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
    input: 'packages/main.ts',
    output: {
        file: 'dist/vue-hooks.js',
        format: 'es',
        name: '@vue-hooks'
    },
    plugins: [
        typescript(),
        resolve(),
    ],
    external: [ "vue" ]
}
