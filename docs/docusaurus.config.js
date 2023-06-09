// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Om Startup Framework",
  tagline: "The Framework for Startups",
  url: "https://www.omkar.cloud",
  trailingSlash: true,

  favicon: "img/favicon.ico",
  scripts: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-5QFML2CFEJ",
      async: true,
    },
    {
      src: "/om-startup-framework/ga.js",
    },
  ],
  baseUrl: "/om-startup-framework/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "omkarcloud", // Usually your GitHub org/user name.
  projectName: "om-startup-framework", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: '/',
                  // routeBasePath: '/docs/introduction/',  
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editCurrentVersion: true,
          editUrl:
            "https://github.com/omkarcloud/om-startup-framework/blob/master/docs",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: "img/twitter-card.png",
      navbar: {
        title: "Om Startup Framework",
        logo: {
          alt: "Om Startup Framework Logo",
          src: "img/logo.svg",
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Docs",
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: "https://github.com/omkarcloud/om-startup-framework",
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
              {
                label: "Introduction",
                to: "/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/om-startup-framework',
              // },
              {
                label: "GitHub",
                href: "https://github.com/omkarcloud/om-startup-framework",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: "GitHub",
                href: "https://github.com/omkarcloud/om-startup-framework",
              },
            ],
          },
        ],
        copyright: `Made in Bharat 🇮🇳 - Vande Mataram`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
