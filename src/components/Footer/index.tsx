import React from "react";
import Sticky from 'react-stickynode';
import {isMobile} from "../../";

import Icon, { IconProps } from "../Icon";

import "./Footer.scss";

export type FooterProps = {
  links: Array<IconProps>;
};

const Footer = ({ links }: FooterProps) => (
  <Sticky>
   <footer>
     {links.map(link => (
       <div className="icon--container"><Icon key={link.name} {...link} /></div>
     ))}
     <div className="copyright">
       <p>&copy; {new Date().getFullYear()} - Silke Schönthal - Hamburg</p>
     </div>
   </footer>
  </Sticky>
);

export default Footer;