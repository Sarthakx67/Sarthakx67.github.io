// Post-build prerender for GitHub Pages.
// Runs the built TanStack Start server bundle in-process (Node/Bun) and
// captures HTML for each route, then writes files into dist/client/ so
// GitHub Pages can serve them as a static site.
import { pathToFileURL } from "node:url";
import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import path from "node:path";

const ROUTES = [
  "/",
  "/projects/retail-store-eks",
  "/projects/roboshop-infra",
];

const serverEntry = path.resolve("dist/server/index.mjs");
await access(serverEntry).catch(() => {
  console.error(`Cannot find ${serverEntry}. Did you run \`bun run build\` first?`);
  process.exit(1);
});

const mod = await import(pathToFileURL(serverEntry).href);
const handler = mod.default ?? mod.handler ?? mod;
if (typeof handler?.fetch !== "function") {
  console.error("Server bundle does not expose a fetch(handler). Aborting.");
  process.exit(1);
}

const outDir = path.resolve("dist/client");
let firstHtml = null;

for (const route of ROUTES) {
  const req = new Request(`http://localhost${route}`, { method: "GET" });
  let res;
  try {
    const ctx = { waitUntil() {}, passThroughOnException() {} };
    ctx.context = ctx;
    res = await handler.fetch(req, {}, ctx);
  } catch (err) {
    console.error(`✗ ${route} — handler threw:`, err);
    process.exit(1);
  }
  const html = await res.text();
  if (res.status >= 500) {
    console.error(`✗ ${route} — ${res.status}\n${html.slice(0, 500)}`);
    process.exit(1);
  }
  const outPath =
    route === "/"
      ? path.join(outDir, "index.html")
      : path.join(outDir, route.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  if (!firstHtml) firstHtml = html;
  console.log(`✓ ${route} → ${path.relative(process.cwd(), outPath)} (${res.status})`);
}

// SPA-style fallback so unknown deep links still hydrate the app.
if (firstHtml) {
  await writeFile(path.join(outDir, "404.html"), firstHtml, "utf8");
}
await writeFile(path.join(outDir, ".nojekyll"), "");
console.log("✓ Wrote 404.html and .nojekyll");
