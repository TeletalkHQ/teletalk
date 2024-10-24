export type SvgElement = React.FC<React.SVGProps<SVGSVGElement>>;

const Icons = {};

export const SVGIcons = Icons as { [key in keyof typeof Icons]: SvgElement };
