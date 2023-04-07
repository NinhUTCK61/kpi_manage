const path= require('path')

/** @type {import("next-i18next").UserConfig} */

const config = {
  i18n: {
    locales: ["en", "jp"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
};

exports.module = {
  config
};