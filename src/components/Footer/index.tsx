import React, { memo, FunctionComponent } from "react";
import Sticky from 'react-stickynode';

import Icon, { IconProps } from "../Icon";

import "./Footer.scss";

export type FooterProps = {
  links: Array<IconProps>;
};

const Footer: FunctionComponent<FooterProps> = ({ links }) => (
  <Sticky>
   <footer>
     {links.map(link => (
       <div key={link.name} className="icon--container"><Icon {...link} /></div>
     ))}
     <div className="copyright">
       <p>&copy; {new Date().getFullYear()} - Silke Schönthal - Hamburg</p>
     </div>
   </footer>
  </Sticky>
);

export default memo(Footer);