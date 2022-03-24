import del from "rollup-plugin-delete";
import ts from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

const production = process.env.NODE_ENV=='production';

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: false
    },
    plugins: [
      production && del({ targets: "dist/*"}),
      ts({
          declaration: false,
          outDir: "dist",
          sourceMap: false
      }),
      production && terser()
    ],
    external: ["polka", "https", "sharp"],
  }
];
