import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Shrushti Swarnakar/);
  assert.match(html, /Full Stack Developer/);
  assert.match(html, /MERN Stack Developer/);
  assert.match(html, /Frontend Engineer/);
  assert.match(html, /400\+ problems solved|LeetCode 400\+/i);
  assert.match(html, /7\.50/);
  assert.match(html, /Shrushti2003/);
  assert.match(html, /linkedin\.com\/in\/shrushti-swarnakar/);
  assert.match(html, /India/);
  assert.match(html, /software-development internships|Software Development Internship/i);
  assert.doesNotMatch(html, /ARES AI/);
  assert.match(html, /Strategy Hub/);
  assert.match(html, /Zylora/);
  assert.match(html, /CloudNest Drive/);
  assert.match(html, /BookNest/);
  assert.match(html, /Netflix Clone/);
  assert.match(html, /Bachelor of Computer Applications/);
  assert.match(html, /Full Stack Development/);
  assert.match(html, /Data Structures &amp; Algorithms/);
  assert.match(html, /Selected projects/);
  assert.match(html, /Capabilities and skills/);
  assert.match(html, /MongoDB/);
  assert.match(html, /Copy email/);
  assert.match(html, /Creative Code Playground/);
  assert.doesNotMatch(html, /Services/);
  assert.doesNotMatch(html, /FAQ/);
  assert.doesNotMatch(html, /Technical Recruiter|Senior Full Stack Engineer|Startup Founder/);
  assert.doesNotMatch(html, /No company|No experience|Still learning|Aspiring Developer|Entry level developer|Junior programmer/i);
  assert.match(html, /Development journey/);
  assert.match(html, /Certificates/);
  assert.match(html, /Contact/);
  assert.match(html, /Back to top/);
  assert.match(html, /Node\.js/);
  assert.match(html, /Express/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("removes starter-only preview code and keeps portfolio metadata", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<Portfolio \/>/);
  assert.match(layout, /Shrushti Swarnakar \| Full Stack Developer/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|_sites-preview|Starter Project/);

  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await access(new URL("public/og.png", root));
});
