declare module "react-simple-img" {
  type SimpleImgProps = {
    src: string;
    placeholder?: string;
    alt?: string;
    className?: string;
  };

  declare class SimpleImg extends React.Component<SimpleImgProps> {}
}
