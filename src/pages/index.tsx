import React, {FunctionComponent} from "react";
import { withSiteData, withRouteData } from "react-static";
import universal from "react-universal-component";
import 'typeface-roboto';
import 'typeface-fjalla-one';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skills from "../components/Skills";
import "../_index.scss";
import { PageData, SiteData } from "../types";
import { ProjectsProps } from "../components/Projects";

type UniversalContext = {
  error?:string;
}

const Failed = (context: UniversalContext) =>
  (context.error && console.error(context.error)) || <div id="projects" />;

const Loading = () => <div id="projects" />;

const Projects = universal(import("../components/Projects"), {
  loading: Loading,
  error: Failed,
}) as FunctionComponent<ProjectsProps>;

const Home = ({ footerLinks = [], skills = [], projects = [] }: PageData&SiteData) => (
  <>
    <Header />
    <main>
      <Skills skills={skills} />
      <Projects projects={projects} />
    </main>
    <Footer links={footerLinks} />
  </>
);

export default withSiteData(withRouteData(Home));
