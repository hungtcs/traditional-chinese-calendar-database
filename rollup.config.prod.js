import pkg from './package.json';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'TraditionalChineseCalendarDatabase',
      format: 'umd',
      sourcemap: false,
      amd: {
        id: 'hungtcs.traditional-chinese-calendar-database'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: false,
    },
  ],
  plugins: [
    del({
      targets: [
        'dist/**'
      ],
    }),
    terser({
      format: {
        comments: false,
      },
    }),
    typescript({
      tsconfig: 'tsconfig.lib.json',
    }),
  ]
};
