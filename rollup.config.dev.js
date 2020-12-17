import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'TraditionalChineseCalendarDatabase',
      format: 'umd',
      sourcemap: true,
      amd: {
        id: 'hungtcs.traditional-chinese-calendar-database'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.lib.json',
    }),
  ]
};