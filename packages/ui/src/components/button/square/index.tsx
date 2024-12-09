import type { ButtonProps } from "@mui/material";
import type { FC } from "react";

// import styles from "./index.module.scss";

interface Props extends ButtonProps {
	className?: string;
	isActive?: boolean;
}

export const SquareButton: FC<Props> = () =>
	// {
	// className,
	// isActive = false,
	// style,
	// variant,
	// ...rest
	// }
	{
		// return (
		// 	<Button
		// 		className={`${isActive ? styles.active : styles.container} ${className}`}
		// 		fullWidth
		// 		style={{
		// 			minWidth: "0px",
		// 			height: "100%",
		// 			borderRadius: "4px",
		// 			padding: "4px",
		// 			...style,
		// 		}}
		// 		{...rest}
		// 	/>
		// );
		return <div>fixme</div>;
	};
