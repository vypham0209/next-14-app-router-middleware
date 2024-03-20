//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  path.join(__dirname, './intl/i18n.ts'),
);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  images: {
    domains: ['picsum.photos', 'd2o4cgdx89n2vy.cloudfront.net'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=302',
          },
        ],
      },
    ];
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(withNextIntl(nextConfig));
