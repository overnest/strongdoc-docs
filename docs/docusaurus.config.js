module.exports = {
  title: 'StrongDoc',
  tagline: 'The Privacy API',
  url: 'https://docs.strongsalt.com',
  baseUrl: '/',
  favicon: 'img/SS_favicon.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'api-key',
      indexName: 'strongdoc',
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
    navbar: {
      title: '',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      links: [{search: true}],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/Getting Started',
            },
            {
              label: 'Api Reference',
              to: 'https://api.strongsalt.com/swagger',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Platform',
              href: 'https://www.strongsalt.com/platform',
            },
            {
              label: 'News',
              href: 'https://www.strongsalt.com/news',
            },
            {
              label: 'About',
              href: 'https://www.strongsalt.com/company',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              to: 'https://twitter.com/getstrongsalt',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/user/StrongSalt',
            },
            {
              label: 'FaceBook',
              href: 'https://www.facebook.com/strongsalt',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/strongsalt',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} StrongSalt, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
