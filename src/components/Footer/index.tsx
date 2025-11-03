import { memo, FunctionComponent } from 'react';

import Icon, { IconProps } from '../Icon';

import './footer.css';

export type FooterProps = {
  links: Array<IconProps>;
};

const Footer: FunctionComponent<FooterProps> = ({ links }) => (
  <footer>
    <h2>Let&apos;s connect</h2>
    <div className="contacts">
      {links.map((link) => (
        <div key={link.name} className="icon--container">
          <Icon {...link} />
        </div>
      ))}
    </div>
    <div className="copyright">
      <p>&copy; {new Date().getFullYear()} - Silke Schönthal - Hamburg</p>
    </div>
  </footer>
);

export default memo(Footer);
