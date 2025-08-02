// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fusio',
  tagline: 'Self-Hosted API Management for Builders.',
  favicon: 'img/fusio_32px.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.fusio-project.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'apioo', // Usually your GitHub org/user name.
  projectName: 'fusio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/apioo/fusio-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/apioo/fusio-docs/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
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
          },
          {
            type: 'doc',
            docId: 'ecosystem/index',
            position: 'left',
            label: 'Ecosystem',
          },
          {
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
              {
                label: 'Ecosystem',
                to: '/docs/ecosystem',
              },
            ],
          },
          {
            title: 'API',
            items: [
              {
                label: 'Backend',
                href: 'https://www.fusio-project.org/api/backend',
              },
              {
                label: 'Consumer',
                href: 'https://www.fusio-project.org/api/consumer',
              },
              {
                label: 'System',
                href: 'https://www.fusio-project.org/api/system',
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
                label: 'Twitter',
                href: 'https://twitter.com/FusioAPI',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/FusioAPI',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/eMrMgwsc6e',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'TypeHub',
                href: 'https://typehub.cloud/',
              },
              {
                label: 'TypeAPI',
                href: 'https://typeapi.org/',
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
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'json'],
      },
    }),
};

export default config;
