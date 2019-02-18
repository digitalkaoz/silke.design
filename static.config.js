import { readFileSync } from "fs";

const getConfig = async file =>
  JSON.parse(readFileSync(`${__dirname}/config/${file}.json`).toString());

export default {
  extractCssChunks: true,
  // inlineCss: true,

  // siteRoot: `https://${config.website}`,

  getSiteData: async () => ({
    siteTitle: "Portfolio | Silke Schönthal",
    author: "Silke Schönthal",
    description: "Portfolio | Silke Schönthal",
    shortcode: "SD",
    footerLinks: await getConfig("footer")
  }),

  getRoutes: async () => [
    {
      path: "/",
      getData: async () => ({
        skills: await getConfig("skills"),
        projects: await getConfig("projects")
      })
    }
  ],
  plugins: [
    [
      "react-static-plugin-sass",
      {
        includePaths: [`${__dirname}/node_modules`]
        // other options for the sass-loader
      }
    ]
  ]
};
