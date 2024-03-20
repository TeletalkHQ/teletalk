import Image, { ImageProps } from "next/image";

const Img: React.FC<ImageProps> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};

export default Img;
