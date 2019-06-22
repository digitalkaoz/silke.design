import { readFileSync } from "fs";
//import { SiteData, PageData } from "./src";
//import { ReactStaticConfig, Route} from "react-static";

const getConfig = file =>
  JSON.parse(readFileSync(`${__dirname}/config/${file}.json`).toString());

export default {
  extractCssChunks: true,
  // inlineCss: true,

  // siteRoot: `https://${config.website}`,

  //extensions: [".tsx", ".ts", ".jsx", ".js"],

  getSiteData: async () /*: Promise<SiteData>*/ => ({
    siteTitle: "Portfolio | Silke Schönthal",
    author: "Silke Schönthal",
    description: "Portfolio | Silke Schönthal",
    shortcode: "SD",
    footerLinks: await getConfig("footer")
  }),

  getRoutes: async () /*: Route[]*/ => [
    {
      path: "/",
      template: "src/pages/index",
      getData: () /*: Promise<PageData> */ => ({
        skills: getConfig("skills"),
        projects: getConfig("projects").sort((a, b) =>
          a.skills.br.name > b.skills.br.name ? -1 : 1
        )
      })
    }
  ],
  plugins: [
    "react-static-plugin-typescript",
    [
      "react-static-plugin-sass",
      {
        includePaths: [`${__dirname}/node_modules`]
        // other options for the sass-loader
      }
    ]
  ]
} /* as ReactStaticConfig*/;
