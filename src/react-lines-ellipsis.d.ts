declare module "react-lines-ellipsis" {
  type ExpandCollapseProps = {
    text: string;
    maxLine: Number;
    component?: string;
    onClick?: Function;
    basedOn?: string;
  };

  declare class ExpandCollapse extends React.Component<ExpandCollapseProps> {}

  export default ExpandCollapse;
}
