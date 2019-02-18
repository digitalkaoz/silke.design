import React from "react";
import { Root, Routes, withSiteData } from "react-static";
import Helmet from "react-helmet";

import "./App.scss";

const App = ({siteTitle, description}) => 
  <Root>
        <Helmet>
          <meta name="theme-color" content="#57809a" />
          <script
            defer
            src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"
          />
          {/* <script src="/register-service-worker.js" /> */}
          <title>{siteTitle}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        <Routes />
      </Root>


export default withSiteData(App);
