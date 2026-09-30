// PostHog web analytics (project "Conn Castle Sites"), loaded through the
// managed first-party proxy at lantern.agent-layer.dev (GitHub Pages cannot
// run a proxy). Visiting any page with ?owner=1 tags this
// browser as Nick's so his visits stay counted but identifiable.
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_BHtwwAqkFjpvoWoJ2KwLTeRK9W9k5SWLw8ENhUZW2web', {
  api_host: 'https://lantern.agent-layer.dev',
  ui_host: 'https://us.posthog.com',
  defaults: '2026-08-30',
  person_profiles: 'identified_only',
  autocapture: true,
  capture_pageleave: true,
  capture_heatmaps: true,
  capture_performance: { web_vitals: true },
  disable_session_recording: true,
  disable_surveys: true,
  capture_dead_clicks: false,
  capture_exceptions: false,
  loaded: function (ph) {
    var url = new URL(window.location.href);
    if (url.searchParams.get('owner') !== '1') return;
    ph.setInternalOrTestUser();
    ph.register({ is_owner: true });
    url.searchParams.delete('owner');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  },
});
