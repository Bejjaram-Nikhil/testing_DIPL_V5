import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnalyticsTracker } from "../system/AnalyticsTracker";
import { OrganizationSchema } from "../system/OrganizationSchema";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteLayout() {
  const location = useLocation();

  // Reset the scroll position whenever the route changes, or move to a
  // specific policy section when a footer hash link is used.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.hash, location.pathname]);

  // main#main-content is the shared wrapper for all public page content.
  // Header and Footer are kept here so individual pages stay focused on content.
  return (
    <>
      <AnalyticsTracker />
      <OrganizationSchema />
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
    </>
  );
}
