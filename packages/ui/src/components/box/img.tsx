import type { ImageProps } from "next/image";
import Image from "next/image";

export const Img: React.FC<ImageProps> = (props) => {
	return <Image {...props} alt={props.alt || "Unknown Image"} />;
};
