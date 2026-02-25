/**
 * Hide the third-party copy-page button on the home landing page only.
 * The plugin injects the button dynamically, so we re-apply visibility on
 * route changes and relevant DOM mutations.
 */
(function hideCopyButtonOnHomePage() {
  const HOME_MARKER_SELECTOR = ".hero-container";
  const COPY_BUTTON_CONTAINER_ID = "copy-page-button-container";
  const COPY_BUTTON_WRAPPER_ID = "copy-page-button-list-item";
  const TOC_LIST_SELECTOR = ".table-of-contents.table-of-contents__left-border, .table-of-contents";

  function isHomeLandingPage() {
    return Boolean(document.querySelector(HOME_MARKER_SELECTOR));
  }

  function placeCopyButtonInsideTocList() {
    const container = document.getElementById(COPY_BUTTON_CONTAINER_ID);
    if (!container) return;

    const tocList = document.querySelector(TOC_LIST_SELECTOR);
    if (!tocList) return;

    let wrapper = document.getElementById(COPY_BUTTON_WRAPPER_ID);
    if (!wrapper) {
      wrapper = document.createElement("li");
      wrapper.id = COPY_BUTTON_WRAPPER_ID;
      wrapper.className = "table-of-contents__list-item copy-page-button-list-item";
    }

    if (container.parentElement !== wrapper) {
      wrapper.appendChild(container);
    }

    if (wrapper.parentElement !== tocList) {
      tocList.prepend(wrapper);
    } else if (tocList.firstElementChild !== wrapper) {
      tocList.prepend(wrapper);
    }
  }

  function applyCopyButtonVisibility() {
    const isHome = isHomeLandingPage();
    const container = document.getElementById(COPY_BUTTON_CONTAINER_ID);
    if (!container) return;
    container.style.display = isHome ? "none" : "";
    placeCopyButtonInsideTocList();
  }

  function scheduleVisibilityUpdate() {
    window.requestAnimationFrame(applyCopyButtonVisibility);
  }

  function startMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "childList") continue;
        if (
          mutation.addedNodes.length > 0 ||
          mutation.removedNodes.length > 0
        ) {
          scheduleVisibilityUpdate();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  function initialize() {
    scheduleVisibilityUpdate();

    // Docusaurus SPA navigation event.
    document.addEventListener("docusaurus-route-update", () => {
      scheduleVisibilityUpdate();
      window.setTimeout(scheduleVisibilityUpdate, 100);
    });

    // Browser history navigation.
    window.addEventListener("popstate", scheduleVisibilityUpdate);

    startMutationObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
