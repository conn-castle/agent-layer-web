// @ts-check
import fs from "node:fs";
import { themes as prismThemes } from "prism-react-renderer";

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = "/";
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || "G-BF2NZXRW05";
const REDIRECT_MANIFEST_URL = new URL("./redirect-manifest.json", import.meta.url);

function readRedirectManifest() {
  if (!fs.existsSync(REDIRECT_MANIFEST_URL)) {
    return [];
  }

  const manifest = JSON.parse(fs.readFileSync(REDIRECT_MANIFEST_URL, "utf8"));
  if (!Array.isArray(manifest)) {
    throw new Error("redirect-manifest.json must contain an array");
  }

  for (const entry of manifest) {
    if (
      !entry ||
      typeof entry !== "object" ||
      typeof entry.from !== "string" ||
      typeof entry.to !== "string"
    ) {
      throw new Error("redirect-manifest.json entries must include string from/to fields");
    }
  }

  return manifest;
}

const retiredDocRedirects = readRedirectManifest();

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

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Agent Layer",
  tagline: "One repo-local source of truth for instructions, slash commands, and MCP servers across coding agents.",
  favicon: "img/favicon/favicon.ico",

  url: "https://agent-layer.dev",
  baseUrl: BASE_URL,

  organizationName: "conn-castle",
  projectName: "agent-layer-web",

  headTags: faviconHeadTags,

  scripts: [
    {
      src: `${BASE_URL}js/hide-copy-button-home.js`,
      defer: true,
    },
  ],

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
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

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: "/docs",
        indexBlog: false,
        indexPages: true,
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: retiredDocRedirects,
      },
    ],
    [
      "docusaurus-plugin-copy-page-button",
      {
        enabledActions: ["copy", "view"],
      },
    ],
    ...(isProd
      ? [
          // IMPORTANT: plugin order is intentional.
          // consentDefaultsPlugin MUST run before plugin-google-gtag so consent
          // defaults are queued before GA initializes.
          // We use standalone plugin registration (instead of preset gtag option)
          // to keep this order explicit and visible.
          function consentDefaultsPlugin() {
            return {
              name: "consent-defaults-plugin",
              injectHtmlTags() {
                return {
                  headTags: [
                    {
                      tagName: "script",
                      attributes: {
                        src: `${BASE_URL}js/consent-defaults.js`,
                      },
                    },
                  ],
                };
              },
            };
          },
          [
            "@docusaurus/plugin-google-gtag",
            {
              trackingID: GA4_MEASUREMENT_ID,
              anonymizeIP: true,
            },
          ],
        ]
      : []),
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
          {
            type: "dropdown",
            to: "/best-practices",
            label: "Best Practices",
            position: "left",
            items: [
              { to: "/best-practices", label: "Overview" },
              { to: "/skill-design", label: "Skill Design" },
              { to: "/cli-skill-design", label: "CLI Skill Design" },
              { to: "/instruction-design", label: "Instruction Design" },
            ],
          },
          { to: "/install", label: "Install", position: "left" },
          { to: "/security", label: "Security", position: "left" },
          { to: "/faq", label: "FAQ", position: "left" },
          { to: "/changelog", label: "Changelog", position: "left" },
          { type: "search", position: "right" },
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
