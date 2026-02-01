// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Agent Layer",
  tagline: "One repo-local source of truth for instructions, slash commands, and MCP servers across coding agents.",
  favicon: "img/favicon.ico",

  url: "https://agent-layer.dev",
  baseUrl: "/",

  organizationName: "conn-castle",
  projectName: "agent-layer-web",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

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
      navbar: {
        title: "Agent Layer",
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
