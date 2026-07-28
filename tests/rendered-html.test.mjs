import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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
  assert.match(html, /Full stack developer|Full Stack Developer/);
  assert.match(html, /MERN Stack/);
  assert.match(html, /frontend engineering/i);
  assert.match(html, /400\+ problems solved|LeetCode 400\+/i);
  assert.match(html, /7\.50/);
  assert.match(html, /Shrushti2003/);
  assert.match(html, /linkedin\.com\/in\/shrushti-swarnakar/);
  assert.match(html, /Pune, India/);
  assert.match(html, /Open to internships and entry level software roles/i);
  assert.match(html, /Let(?:&#x27;|&apos;|')s Connect/);
  assert.match(html, /aria-label="Go to contact section"/);
  assert.match(html, /polished interfaces meet dependable backend systems/i);
  assert.doesNotMatch(html, /ARES AI/);
  assert.match(html, /Strategy Hub/);
  assert.match(html, /Zylora/);
  assert.match(html, /CloudNest Drive/);
  assert.match(html, /LumiBooks/);
  assert.match(html, /Netflix Clone/);
  assert.match(html, /Music Player App/);
  assert.match(html, /Car Game/);
  assert.match(html, /https:\/\/github\.com\/Shrushti2003\/Music-Player/);
  assert.match(html, /https:\/\/github\.com\/Shrushti2003\/Car-Game/);
  assert.doesNotMatch(html, /TicTacToe Game|Student Manager/);
  assert.match(html, /href="\/projects\/strategy-hub"/);
  assert.match(html, /href="\/projects\/zylora"/);
  assert.match(html, /href="\/projects\/cloudnest-drive"/);
  assert.match(html, /href="\/projects\/lumibooks"/);
  assert.match(html, /href="\/projects\/netflix-clone"/);
  assert.match(html, /Bachelor of Computer Applications/);
  assert.match(html, /Full stack development training|Full Stack Web Development/i);
  assert.match(html, /Data Structures in C\+\+/);
  assert.match(html, /Selected Work/);
  assert.match(html, /Expertise/);
  assert.match(html, /MongoDB/);
  assert.match(html, /Copy email/);
  assert.match(html, /href="\/documents\/shrushti-resume\.pdf"/);
  assert.match(html, /target="_blank"[^>]*>\s*Resume|href="\/documents\/shrushti-resume\.pdf"[^>]*target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.equal((html.match(/class="[^"]*contact-link/g) ?? []).length, 5);
  assert.doesNotMatch(html, /class="[^"]*email-main/);
  assert.doesNotMatch(html, />\s*Email\s*<\/a>/);
  assert.doesNotMatch(html, /Digital Architecture in Motion/);
  assert.doesNotMatch(html, /INTERFACE \/ API \/ DATA/i);
  assert.doesNotMatch(html, /AVAILABLE NOW/i);
  assert.doesNotMatch(html, /Verified projects are presented/i);
  assert.doesNotMatch(html, /Services/);
  assert.doesNotMatch(html, /FAQ/);
  assert.doesNotMatch(html, /Technical Recruiter|Senior Full Stack Engineer|Startup Founder/);
  assert.doesNotMatch(html, /No company|No experience|Still learning|Aspiring Developer|Entry level developer|Junior programmer/i);
  assert.match(html, /About me/i);
  assert.match(html, /I care about how a product feels and how well it works/);
  assert.match(html, /IDEA/);
  assert.match(html, /INTERFACE/);
  assert.match(html, /LOGIC/);
  assert.match(html, /PRODUCT/);
  assert.match(html, /Product thinking/);
  assert.match(html, /Full stack execution/);
  assert.match(html, /Learning by building/);
  assert.match(html, /Certificates/);
  assert.match(html, /Data Structures in C\+\+/);
  assert.match(html, /Contact/);
  assert.match(html, /Back to top/);
  assert.match(html, /Node\.js/);
  assert.match(html, /Express/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("navigation, hero typography, button states, and foundational data are regression-checked", async () => {
  const [home, css, button, navbar, data] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/ui/button.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/layout/Navbar.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-data.ts", import.meta.url), "utf8"),
  ]);

  for (const id of ["work", "expertise", "about", "journey", "certificates", "contact"]) {
    assert.match(home, new RegExp(`href="#${id}"`));
    assert.match(home, new RegExp(`id="${id}"`));
  }

  assert.match(css, /\.hero-name span\s*\{[^}]*font-style:\s*italic/s);
  assert.match(button, /button-primary/);
  assert.match(css, /\.button-primary,\s*\.button-primary:visited\s*\{[^}]*color:\s*#ffffff/s);
  assert.match(css, /\.button-primary:hover,\s*\.button-primary:focus,\s*\.button-primary:focus-visible\s*\{[^}]*color:\s*var\(--pink\)/s);
  assert.match(css, /\.button-primary:active\s*\{[^}]*color:\s*#ffffff/s);
  assert.match(navbar, /IntersectionObserver/);
  assert.doesNotMatch(navbar, /requestAnimationFrame|offsetTop|offsetHeight|window\.addEventListener\("scroll"/);
  assert.match(navbar, /aria-current/);
  assert.match(data, /title:\s*"Music Player App"[\s\S]*?technology:\s*"C\+\+"/);
  assert.match(data, /title:\s*"Car Game"[\s\S]*?technology:\s*"C\+\+"/);
  assert.doesNotMatch(data, /TicTacToe Game|Student Manager/);
});

test("expertise constellation uses verified local data and accessible central control", async () => {
  const [home, css, component, data] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/TechStackConstellation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(home, /Tools I use to build full stack web apps/);
  assert.match(home, /class="[^"]*tech-core-button/);
  assert.match(home, /aria-expanded="false"/);
  assert.match(css, /\.expertise-section\s*\{[^}]*background:\s*#f7f4ef/s);
  assert.match(component, /<motion\.button/);
  assert.match(component, /type="button"/);
  assert.match(component, /aria-expanded=\{isOpen\}/);
  assert.match(component, /left:\s*center\.x/);
  assert.match(component, /top:\s*center\.y/);
  assert.match(component, /className="tech-core-inner"[\s\S]*whileTap/);
  const coreButtonOpeningTag = component.match(/<motion\.button[\s\S]*?>/)?.[0] ?? "";
  assert.doesNotMatch(coreButtonOpeningTag, /whileTap=/);
  assert.match(component, /setIsOpen\(\(open\) => !open\)/);
  assert.match(component, /useReducedMotion/);
  assert.match(component, /ResizeObserver/);
  assert.match(component, /techStack\.map/);
  assert.match(component, /role="list"/);
  assert.match(component, /role="listitem"/);
  assert.doesNotMatch(home, /tech-system|tech-center|tech-orbit/);
  assert.doesNotMatch(css, /tech-system|tech-center|tech-orbit|\.tech-node\s*\{/);
  assert.doesNotMatch(component, /fonts\.googleapis|fonts\.gstatic|material-symbols|cdn\.tailwindcss|https?:\/\//i);
  const techStackSource = data.match(/export const techStack:[\s\S]*?export const engineeringPrinciples/)?.[0] ?? "";
  assert.doesNotMatch(techStackSource, /Placeholder|Bubble|Orbit demo|Docker|Kubernetes|AWS|GraphQL|Redis|Python|Angular|Vue|PostgreSQL/);

  for (const tech of [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Vite",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "Mongoose",
    "JWT Auth",
    "Firebase",
    "Cloudinary",
    "Zustand",
    "C++",
    "Git",
    "GitHub",
  ]) {
    assert.match(data, new RegExp(`name:\\s*"${tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(home, new RegExp(tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("hero CGI portrait stays contained without scroll-controlled fullscreen behavior", async () => {
  const [home, css, portfolio, transition] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/Portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/HeroVisual.tsx", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/media/cgi-developer-reference.png", import.meta.url));
  await access(new URL("../public/media/cgi-developer-clean.webp", import.meta.url));
  await access(new URL("../public/media/cgi-developer-clean.png", import.meta.url));

  assert.equal((home.match(/class="[^"]*cgi-developer-artwork/g) ?? []).length, 1);
  assert.match(home, /srcSet="\/media\/cgi-developer-clean\.webp"/);
  assert.match(home, /src="\/media\/cgi-developer-clean\.png"/);
  assert.match(home, /CGI female developer working at a laptop/);
  assert.match(home, /class="[^"]*cgi-effects-canvas/);
  assert.doesNotMatch(home, /\scontrols(=|\s|>)/);
  assert.doesNotMatch(home, /<video|video-project-3|create_a_10_second_cinematic/);
  assert.match(home, /class="[^"]*hero-video-anchor/);
  assert.match(home, /class="[^"]*hero-video-shell/);
  assert.doesNotMatch(home, /hero-work-reveal-preview|01 \/ Selected Work/);
  assert.doesNotMatch(home, /hero-video-transition-layer|hero-video-poster/);
  assert.match(css, /\.hero-video-shell\s*\{[\s\S]*?position:\s*absolute/s);
  assert.match(css, /\.hero-video-shell\s*\{[\s\S]*?inset:\s*-10% -14% -12% -12%/s);
  assert.match(css, /\.hero-video-shell\s*\{[\s\S]*?box-shadow:\s*none/s);
  assert.match(css, /\.hero-video-anchor\s*\{[\s\S]*?background:\s*transparent/s);
  assert.match(home, /class="[^"]*cgi-static-suppression/);
  assert.doesNotMatch(css, /hero-video-x|hero-video-y|hero-video-width|hero-video-height|hero-video-opacity|selected-work-reveal|cgi-ui-opacity|data-cgi-sequence/);
  assert.doesNotMatch(css, /hero-work-reveal-preview|hero-video-transition-layer|hero-video-poster|margin-top:\s*clamp\(150vh/);
  assert.match(transition, /requestAnimationFrame/);
  assert.match(transition, /ResizeObserver/);
  assert.match(transition, /drawGlobe/);
  assert.match(transition, /drawParticles/);
  assert.match(transition, /drawRays/);
  assert.match(transition, /drawCodeFields/);
  assert.match(transition, /drawNetwork/);
  assert.match(transition, /drawLightWaves/);
  assert.match(transition, /drawFabricSheen/);
  assert.match(transition, /drawEnergyTrails/);
  assert.match(transition, /drawSuppression/);
  assert.match(transition, /drawHairWisps/);
  assert.match(transition, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(transition, /drawBlink|blink|eyelid|pupil|eyes\s*=|lid\.addColorStop|ScrollTrigger|wheel|touchmove|preventDefault|scrollY|startScroll|endScroll|targetProgress|selected-work-reveal|cgi-ui-opacity|hero-work-reveal-preview|01 \/ Selected Work|<video|video-project-3/i);
  assert.match(transition, /addEventListener\("scroll", handlePageScroll, \{ passive: true \}\)/);
  assert.match(portfolio, /<HeroVisual \/>/);
  assert.doesNotMatch(portfolio, /Lenis|smoothWheel|lenis\.raf|useScroll|useTransform|scrollYProgress|heroDepth|progress-line/);
  assert.doesNotMatch(portfolio, /OrbitalField|ArchitectureScene/);
});

test("all project case-study routes render and avoid unsupported live-demo or secret text", async () => {
  const routes = [
    ["strategy-hub", "Strategy Hub"],
    ["zylora", "Zylora"],
    ["cloudnest-drive", "CloudNest Drive"],
    ["lumibooks", "LumiBooks"],
    ["netflix-clone", "Netflix Clone"],
  ];

  for (const [slug, title] of routes) {
    const response = await render(`/projects/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /Key Features/);
    assert.match(html, /Product walkthrough/);
    assert.match(html, /Verified From/);
    assert.doesNotMatch(html, />\s*Source\s*</i);
    assert.doesNotMatch(html, /\.zip\b/i);
    assert.doesNotMatch(html, /API_KEY|SECRET|TOKEN=|PASSWORD=|MONGO_URI|CLERK_SECRET|GEMINI_API_KEY|TMDB_API_KEY/i);

    if (slug === "netflix-clone") {
      assert.doesNotMatch(html, /Live Demo/);
      assert.match(html, /Educational clone project only/);
      const architectureLabels = [...html.matchAll(/<span>(Frontend|Backend|Database|Authentication|External API)<\/span>/g)].map(
        (match) => match[1],
      );
      assert.deepEqual(architectureLabels, ["Frontend", "Backend", "Database", "Authentication", "External API"]);
      assert.equal(architectureLabels.length, 5);
    }
  }
});

test("case-study source metadata is removed from shared types and data", async () => {
  const [types, data, caseStudyPage] = await Promise.all([
    readFile(new URL("../types/portfolio.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/CaseStudyPage.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(types, /sourceZip|sourceArchive|sourceFile/);
  assert.doesNotMatch(data, /sourceZip|sourceArchive|sourceFile|\.zip\b/);
  assert.doesNotMatch(caseStudyPage, /\["Source"/);
  assert.match(caseStudyPage, /architectureItems = caseStudy\.architecture\.filter/);
});

test("removes starter-only preview code and keeps portfolio metadata", async () => {
  const [page, layout, siteConfig, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<Portfolio \/>/);
  assert.match(layout, /siteTitle/);
  assert.match(siteConfig, /Shrushti Swarnakar \| Full Stack Developer/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|@react-three\/fiber|gsap|lenis|three/);
  assert.doesNotMatch(page + layout + siteConfig, /codex-preview|_sites-preview|Starter Project/);

  await assert.rejects(access(new URL("app/_sites-preview", root)));
  await access(new URL("public/og.png", root));
});

test("worker serves static assets through the deployment asset binding", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("worker-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("https://portfolio.test/assets/test.css"),
    {
      ASSETS: {
        fetch: async () => new Response("body{}", { headers: { "content-type": "text/css" } }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/css");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(await response.text(), "body{}");
});
