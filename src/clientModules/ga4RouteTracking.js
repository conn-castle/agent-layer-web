/**
 * GA4 route tracking for Docusaurus SPA navigation.
 *
 * We intentionally don't assume GA is present in all environments. In dev,
 * GA scripts are not injected (see docusaurus.config.js), so this becomes a no-op.
 */

/** @type {import('@docusaurus/types').ClientModule} */
const clientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      !previousLocation ||
      (location.pathname === previousLocation.pathname &&
        location.search === previousLocation.search &&
        location.hash === previousLocation.hash)
    ) {
      return;
    }

    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    // Docusaurus updates the document title async via react-helmet-async.
    // Defer to next tick to send the current title with the pageview.
    setTimeout(() => {
      window.gtag(
        "set",
        "page_path",
        location.pathname + location.search + location.hash,
      );
      window.gtag("event", "page_view");
    }, 0);
  },
};

export default clientModule;

