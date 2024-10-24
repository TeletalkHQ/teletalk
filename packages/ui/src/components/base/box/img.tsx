import Image, { ImageProps } from "next/image";

export const Img: React.FC<ImageProps> = (props) => {
	return <Image {...props} alt={props.alt || "Unknown Image"} />;
};
