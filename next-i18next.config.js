// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: 'jp',
    locales: ['en', 'jp'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  /** To avoid issues when deploying to some paas (vercel...) */

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
}
