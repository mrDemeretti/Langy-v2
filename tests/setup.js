/**
 * Test Setup — loads browser globals for unit testing.
 * The app uses `const X = ...` at top level, which in the browser
 * becomes a global. In Node/vitest, we replicate this with vm.runInThisContext.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import vm from 'vm';

const root = resolve(import.meta.dirname, '..');

function loadScript(relativePath) {
    const code = readFileSync(resolve(root, relativePath), 'utf-8');
    vm.runInThisContext(code, { filename: relativePath });
}

// Load files in dependency order (mimicking index.html script order)
loadScript('src/utils/config.js');
loadScript('src/utils/core.js');
loadScript('src/utils/icons.js');
loadScript('src/utils/state.js');
