// Post-build step: rewrite extensionless relative imports in `dist/**/*.{js,d.ts}`
// to fully-qualified Node ESM specifiers (`./x.js` or `./dir/index.js`).
//
// The library compiles with `moduleResolution: "bundler"`, which emits
// extensionless relative imports (e.g. `from "./client"`). Node's native ESM
// loader and TypeScript's `nodenext` resolver both require explicit extensions,
// so this script is required for the package to be consumable from a plain
// Node ESM backend (not just a bundler).
import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full, out);
        else if (full.endsWith(".js") || full.endsWith(".d.ts")) out.push(full);
    }
    return out;
}

// Matches `from "./x"`, `from '../x'`, `export * from "./x"`, `import("./x")`.
const RE = /((?:from\s*|import\()\s*["'])(\.\.?\/[^"']+?)(["'])/g;

function resolveSpec(file, spec) {
    if (/\.(js|json|mjs|cjs|d\.ts)$/.test(spec)) return null;
    const base = join(dirname(file), spec);
    if (existsSync(base + ".js")) return spec + ".js";
    if (existsSync(join(base, "index.js"))) return spec + "/index.js";
    return null;
}

let changed = 0;
for (const file of walk(join(root, "dist"))) {
    const src = readFileSync(file, "utf8");
    const next = src.replace(RE, (match, pre, spec, post) => {
        const resolved = resolveSpec(file, spec);
        return resolved ? `${pre}${resolved}${post}` : match;
    });
    if (next !== src) {
        writeFileSync(file, next);
        changed++;
    }
}
console.log(`fix-esm: rewrote ${changed} files`);
