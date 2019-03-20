import { SkillsProps, SkillProps } from "./components/Skills";
import { ProjectsProps, ProjectProps } from "./components/Projects";
import { IconProps } from "./components/Icon";

export type PageData = {
  skills: SkillProps[];
  projects: ProjectProps[];
};

export type SiteData = {
  siteTitle: string;
  author: string;
  description: string;
  shortcode: string;
  footerLinks: IconProps[];
};