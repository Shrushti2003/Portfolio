/** Cloudflare Worker entry point for the portfolio app. */
import handler from "vinext/server/app-router-entry";

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type WorkerEnv = Parameters<typeof handler.fetch>[1] & {
  ASSETS?: {
    fetch(request: Request): Promise<Response>;
  };
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const publicAssetPrefixes = [
  "/assets/",
  "/certificates/",
  "/documents/",
  "/fonts/",
  "/media/",
  "/projects/",
];

const publicAssetFiles = new Set([
  "/favicon.svg",
  "/og.png",
]);

function isPublicAssetRequest(pathname: string): boolean {
  return publicAssetFiles.has(pathname) || publicAssetPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (env.ASSETS && isPublicAssetRequest(pathname)) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withSecurityHeaders(assetResponse);
      }
    }

    const response = await handler.fetch(request, env, ctx);
    return withSecurityHeaders(response);
  },
};

export default worker;
