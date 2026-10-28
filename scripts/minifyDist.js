/**
 * Minifies the JS files in a directory in place. Used by CI to measure the
 * compressed size of the build. Does nothing unless MINIFY=true.
 */
import fs from 'node:fs';
import path from 'node:path';
import { minify } from 'terser';

async function minifyDir(dir) {
  for (const file of fs.globSync('**/*.js', { cwd: dir })) {
    const filePath = path.join(dir, file);
    const code = fs.readFileSync(filePath, 'utf-8');

    const result = await minify(code, {
      compress: {
        directives: false,
        global_defs: { 'process.env.NODE_ENV': 'production' }
      },
      module: true
    });

    fs.writeFileSync(filePath, result.code);
  }
}

if (process.env.MINIFY === 'true') {
  minifyDir(path.resolve(process.argv[2]));
}
