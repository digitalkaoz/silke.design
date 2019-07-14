import React, { FunctionComponent } from "react";
import { useSiteData, useRouteData } from "react-static";
import universal from "react-universal-component";
import "typeface-roboto";
import "typeface-fjalla-one";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skills from "../components/Skills";
import "../_index.scss";
import { PageData, SiteData } from "../types";
import { ProjectsProps } from "../components/Projects";
import { Loading, Failed } from "../utils";

const Projects = universal(import("../components/Projects"), {
  loading: Loading,
  error: Failed
}) as FunctionComponent<ProjectsProps>;

const Home: FunctionComponent<{}> = () => {
  const { footerLinks }: SiteData = useSiteData();
  const { projects, skills }: PageData = useRouteData();

  return (
    <>
      <Header />
      <main>
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
      <Footer links={footerLinks} />
    </>
  );
};

export default Home;
