import React from "react";
import { withSiteData, withRouteData } from "react-static";
import universal from "react-universal-component";

import { SimpleImgProvider } from "react-simple-img";

import Header from "../components/Header";
//import Footer from "../components/Footer";
//import Skills from "../components/Skills";

const Failed = context =>
  (context.error && console.error(context.error)) || <div id="projects" />;

const Loading = () => <div id="projects" />;

// const Projects = universal(import("../components/Projects"), {
//   loading: Loading,
//   error: Failed
// });

const Home = ({ footerLinks = [], skills = [], projects = [] }) => (
  <SimpleImgProvider config={{ disableAnimationAfterCache: true }}>
    <Header />
    <main>
      {/* <Skills skills={skills} />
      <Projects projects={projects} />
      <Footer links={footerLinks} /> */}
    </main>
  </SimpleImgProvider>
);

export default withSiteData(withRouteData(Home));
