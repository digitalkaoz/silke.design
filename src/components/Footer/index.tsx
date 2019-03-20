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
     <div className="copyright">
       <p>Silke Schönthal</p>
       <p>Hamburg</p>
     </div>
     {links.map(link => (
       <Icon key={link.name} {...link} />
     ))}
   </footer>
  </Sticky>
);

export default Footer;