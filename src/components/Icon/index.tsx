import React, { FunctionComponent, memo } from 'react';
import { SimpleImg } from 'react-simple-img';

export type IconProps = {
  src: string;
  name: string;
  target?: string;
};

export type ImageIconProps = {
  src: string;
  name: string;
  target?: string;
  asIcon?: boolean;
};

const LinkIcon: FunctionComponent<IconProps> = ({ src, target, name }) => (
  <a href={target} target="_blank" rel="noopener noreferrer" aria-label={name} className="icon">
    <ImageIcon src={src} target={target} name={name} asIcon={false} />
  </a>
);

const ImageIcon: FunctionComponent<ImageIconProps> = ({ src, name, asIcon = true }) => (
  <SimpleImg
    src={src}
    placeholder="linear-gradient(rgba(0,0,0,0) 0%, rgb(0, 0, 0,1) 100%)"
    alt={name}
    className={asIcon ? 'icon' : ''}
  />
);

const Icon: FunctionComponent<IconProps> = ({ src, target, name }) => {
  return target ? (
    <LinkIcon src={src} target={target} name={name} />
  ) : (
    <ImageIcon src={src} target={target} name={name} />
  );
};

export default memo(Icon);
