import { shouldConserveData } from "./network";

const publicRouteLoaders: Record<string, () => Promise<unknown>> = {
  "/about": () => import("../pages/AboutPage"),
  "/projects": () => import("../pages/ProjectsPage"),
  "/kpis": () => import("../pages/KpisPage"),
  "/blogs": () => import("../pages/BlogsPage"),
  "/contact": () => import("../pages/ContactPage"),
  "/policies": () => import("../pages/PoliciesPage"),
};

const prefetchedRoutes = new Set<string>();

export function prefetchPublicRoute(href: string) {
  if (typeof window === "undefined" || shouldConserveData()) return;

  const pathname = href.split(/[?#]/, 1)[0]?.replace(/\/$/, "") || "/";
  const routeKey = pathname.startsWith("/projects/") ? "/projects" : pathname;
  const loader = publicRouteLoaders[routeKey];

  if (!loader || prefetchedRoutes.has(routeKey)) return;
  prefetchedRoutes.add(routeKey);
  void loader().catch(() => prefetchedRoutes.delete(routeKey));
}

