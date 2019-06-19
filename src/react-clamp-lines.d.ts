declare module "react-clamp-lines" {
  type ExpandCollapseProps = {
    id?: string;
    text: string;
    lines: Number;
    innerElement?: string;
    onClick?: Function;
    ellipsis?: string;
    lessText?: string;
    moreText?: string;
    buttons?: boolean;
  };

  declare class ExpandCollapse extends React.Component<ExpandCollapseProps> {}

  export default ExpandCollapse;
}
