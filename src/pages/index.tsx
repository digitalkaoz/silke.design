import React, {FunctionComponent} from "react";
import { useRouteData, useSiteData } from "react-static";
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

export default () => {
  const { footerLinks } = useSiteData() as SiteData;
  const { skills,projects } = useRouteData() as PageData;

  return (<>
    <Header />
    <main>
      <Skills skills={skills} />
      <Projects projects={projects} />
    </main>
    <Footer links={footerLinks} />
  </>)
};
