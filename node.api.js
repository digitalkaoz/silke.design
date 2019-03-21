import ManifestPlugin from "webpack-manifest-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import {InjectManifest} from 'workbox-webpack-plugin';

export default () => ({
  webpack: (config /*: any*/, { stage } /* : any*/) => {
    if (stage === "dev") {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];

      return config;
    }

    if (stage !== "prod") {
      return config;
    }

    config.plugins = [
      ...config.plugins,
      new ManifestPlugin({
        seed: {
          name: "Portfolio | Silke Schönthal",
          short_name: "silke.design",
          start_url: "/",
          display: "standalone",
          theme_color: "#57809a",
          background_color: "#0d0a0d",
          icons: [
            {
              src: "favicon.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "favicon.png",
              sizes: "256x256",
              type: "image/png"
            },
            {
              src: "favicon.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        }
      }),

      new InjectManifest({
        importWorkboxFrom: "local",
        swSrc: './public/sw.js',
        globPatterns: ['dist/**/*.{js,png,svg,jpg,json,html,css}'],
        modifyURLPrefix: {
          // Remove a '/dist' prefix from the URLs:
          '/dist': ''
        }
      }),
    ];

    return config;
  }
});
