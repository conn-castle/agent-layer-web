// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = "/";
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || "G-BF2NZXRW05";

/** @type {import("@docusaurus/types").HtmlTagObject[]} */
const faviconHeadTags = [
  {
    tagName: "link",
    attributes: {
      rel: "icon",
      type: "image/png",
      href: `${BASE_URL}img/favicon/favicon-96x96.png`,
      sizes: "96x96",
    },
  },
  {
    tagName: "link",
    attributes: {
      rel: "icon",
      type: "image/svg+xml",
      href: `${BASE_URL}img/favicon/favicon.svg`,
    },
  },
  {
    tagName: "link",
    attributes: { rel: "shortcut icon", href: `${BASE_URL}img/favicon/favicon.ico` },
  },
  {
    tagName: "link",
    attributes: {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: `${BASE_URL}img/favicon/apple-touch-icon.png`,
    },
  },
  {
    tagName: "meta",
    attributes: { name: "apple-mobile-web-app-title", content: "Agent Layer" },
  },
  {
    tagName: "link",
    attributes: { rel: "manifest", href: `${BASE_URL}img/favicon/site.webmanifest` },
  },
];

/** @type {import("@docusaurus/types").HtmlTagObject[]} */
const ga4HeadTags = isProd
  ? [
      // GA4 with consent-mode default denied to avoid cookies without a banner.
      // Note: depending on visitor location and browser, this may result in limited
      // (modeled) reporting. This is intentional to satisfy "no cookies" by default.
      {
        tagName: "link",
        attributes: { rel: "preconnect", href: "https://www.google-analytics.com" },
      },
      {
        tagName: "link",
        attributes: { rel: "preconnect", href: "https://www.googletagmanager.com" },
      },
      {
        tagName: "script",
        attributes: {},
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          // Default-deny consent so we don't write/read cookies without an explicit user action.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
          gtag('set', 'ads_data_redaction', true);

          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `,
      },
      {
        tagName: "script",
        attributes: {
          src: `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
          async: "true",
        },
      },
    ]
  : [];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Agent Layer",
  tagline: "One repo-local source of truth for instructions, slash commands, and MCP servers across coding agents.",
  favicon: "img/favicon/favicon.ico",

  url: "https://agent-layer.dev",
  baseUrl: BASE_URL,

  organizationName: "conn-castle",
  projectName: "agent-layer-web",

  headTags: [...faviconHeadTags, ...ga4HeadTags],

  clientModules: isProd ? ["./src/clientModules/ga4RouteTracking.js"] : [],

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "docs",
          sidebarPath: "./sidebars.js",
          includeCurrentVersion: false,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/branding/logo.svg",
      metadata: [
        {
          name: "keywords",
          // Google doesn't rely on this heavily, but it helps keep intent explicit for some tooling.
          content:
            "agent layer, mcp server setup, claude code, openai codex, vibe coding, repo-local instructions, coding agent config, slash commands for coding agents",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      navbar: {
        title: "",
        logo: {
          alt: "Agent Layer",
          src: "img/branding/header_wordmark.svg",
          srcDark: "img/branding/header_wordmark_dark.svg",
        },
        items: [
          { to: "/docs", label: "Docs", position: "left" },
          { to: "/install", label: "Install", position: "left" },
          { to: "/security", label: "Security", position: "left" },
          { to: "/faq", label: "FAQ", position: "left" },
          { to: "/changelog", label: "Changelog", position: "left" },
          { type: "docsVersionDropdown", position: "right" },
          {
            href: "https://github.com/conn-castle/agent-layer",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Docs", to: "/docs" },
              { label: "Install", to: "/install" },
              { label: "Security", to: "/security" },
              { label: "FAQ", to: "/faq" },
              { label: "Changelog", to: "/changelog" },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Issues",
                href: "https://github.com/conn-castle/agent-layer/issues",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Conn Castle Studios.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
