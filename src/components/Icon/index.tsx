import { FunctionComponent, memo } from 'react';

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
  <img src={src} alt={name} className={asIcon ? 'icon' : ''} loading="lazy" decoding="async" />
);

const Icon: FunctionComponent<IconProps> = ({ src, target, name }) => {
  return target ? (
    <LinkIcon src={src} target={target} name={name} />
  ) : (
    <ImageIcon src={src} target={target} name={name} />
  );
};

export default memo(Icon);
