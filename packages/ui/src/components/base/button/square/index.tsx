import { ButtonProps } from "@mui/material";
import { FC } from "react";

import { Button } from "../button";
import styles from "./index.module.scss";

interface Props extends ButtonProps {
	className?: string;
	isActive?: boolean;
}

export const SquareButton: FC<Props> = ({
	className,
	isActive = false,
	style,
	variant,
	...rest
}) => {
	return (
		<Button
			fullWidth
			className={`${isActive ? styles.active : styles.container} ${className}`}
			style={{
				minWidth: "0px",
				height: "100%",
				borderRadius: "4px",
				padding: "4px",
				...style,
			}}
			{...rest}
		/>
	);
};
