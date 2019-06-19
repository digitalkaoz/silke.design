import React from "react";
import { Root, Routes, useSiteData, Head } from "react-static";

import "default-passive-events";
import "./App.scss";

type AppProps = {
  siteTitle: string;
  description: string;
};

export default () => {
  const { siteTitle, description } = useSiteData();

  return (
    <Root>
        <Head>
          <meta name="theme-color" content="#6cc2e1" />
          <script
            defer
            src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"
          />
          <title>{siteTitle}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <script type="module">{`import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs';
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.register();
}
`}</script>
        </Head>
        <Routes />
    </Root>
  );
};
