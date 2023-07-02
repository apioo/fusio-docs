// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fusio',
  tagline: 'Fusio is an open source API management platform which helps to create innovative API solutions.',
  url: 'https://docs.fusio-project.org/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/fusio_32px.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'apioo', // Usually your GitHub org/user name.
  projectName: 'fusio', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/apioo/fusio-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-K58XVFTP9N',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Fusio',
        logo: {
          alt: 'Fusio',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'bootstrap',
            position: 'left',
            label: 'Get started',
          },
          {
            type: 'doc',
            docId: 'installation/index',
            position: 'left',
            label: 'Installation',
          },
          {
            type: 'doc',
            docId: 'use_cases/index',
            position: 'left',
            label: 'Use-Cases',
          },
          {
            type: 'doc',
            docId: 'backend/index',
            position: 'left',
            label: 'Backend',
          },
          {
            type: 'doc',
            docId: 'concepts/index',
            position: 'left',
            label: 'Concepts',
          },          {
            href: 'https://github.com/apioo/fusio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get started',
                to: '/docs/bootstrap',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Use-Cases',
                to: '/docs/use_cases',
              },
              {
                label: 'Backend',
                to: '/docs/backend',
              },
              {
                label: 'Concepts',
                to: '/docs/concepts',
              },
            ],
          },
          {
            title: 'API',
            items: [
              {
                label: 'REST API',
                href: 'https://demo.fusio-project.org/apps/documentation/',
              },
            ],
          },

          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/apioo/fusio',
              },
              {
                label: 'Forum',
                href: 'https://groups.google.com/forum/#!forum/fusio',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/FusioAPI',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/FusioAPI',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Cloud',
                href: 'https://fusio.cloud/',
              },
              {
                label: 'ApiGen',
                href: 'https://apigen.app/',
              },
              {
                label: 'TypeSchema',
                href: 'https://typeschema.org/',
              },
              {
                label: 'PSX',
                href: 'https://phpsx.org/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Christoph Kappestein. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php', 'json'],
      },
    }),
};

module.exports = config;
