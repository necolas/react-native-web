/**
 * Minifies the JS files in a directory in place. Used by CI to measure the
 * compressed size of the build. Does nothing unless MINIFY=true.
 */
import { glob, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { minify } from 'terser';

async function main(dir) {
  for await (const file of glob('**/*.js', { cwd: dir })) {
    const filePath = path.join(dir, file);
    const code = await readFile(filePath, 'utf-8');

    const result = await minify(code, {
      compress: {
        directives: false,
        global_defs: { 'process.env.NODE_ENV': 'production' }
      },
      module: true
    });

    await writeFile(filePath, result.code);
  }
}

if (process.env.MINIFY === 'true') {
  await main(path.resolve(process.argv[2]));
}
