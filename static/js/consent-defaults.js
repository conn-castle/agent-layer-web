/**
 * Consent Mode defaults for region-aware GA4 behavior without consent UX:
 * - Ads storage is denied globally.
 * - Analytics storage is denied for EU/EEA/UK/CH (cookieless pings only).
 * - Analytics storage is granted for the rest of the world.
 */
(function initializeConsentDefaults() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const analyticsDeniedRegionCodes = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
    "IS",
    "LI",
    "NO",
    "CH",
    "GB",
  ];

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    region: analyticsDeniedRegionCodes,
  });

  window.gtag("set", "ads_data_redaction", true);
})();
