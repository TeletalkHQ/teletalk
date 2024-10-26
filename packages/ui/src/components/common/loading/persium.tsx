// TODO: Remove

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@mui/material";

import { Box } from "../../base";

export const PersiumLoading = () => {
	const theme = useTheme();

	return (
		<Box.Flex
			ai="center"
			fullHeight
			fullWidth
			jc="center"
			style={{
				maxHeight: "500px",
			}}
		>
			<Box.Div
				style={{
					position: "relative",
				}}
			>
				<Box.Div
					style={{
						height: " 100px",
						width: " 100px",
						borderRadius: " 50%",
						border: ` 3px solid ${theme.palette.primary.main}`,
					}}
				/>
				<Box.Div
					className="persium-spinner"
					style={{ position: "absolute", top: 0, left: 0 }}
				/>
			</Box.Div>
			<img
				alt="pe-loading-logo"
				src="./icons/PersiumLoading.svg"
				style={{
					height: "100px",
					width: "100px",
					padding: "10px",
					position: "absolute",
				}}
			/>
		</Box.Flex>
	);
};
