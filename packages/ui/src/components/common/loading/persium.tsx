// TODO: Remove

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@mui/material";

import { Div, Flex } from "../../base";

export const PersiumLoading = () => {
	const theme = useTheme();

	return (
		<Flex
			ai="center"
			fullHeight
			fullWidth
			jc="center"
			style={{
				maxHeight: "500px",
			}}
		>
			<Div
				style={{
					position: "relative",
				}}
			>
				<Div
					style={{
						height: " 100px",
						width: " 100px",
						borderRadius: " 50%",
						border: ` 3px solid ${theme.palette.primary.main}`,
					}}
				/>
				<Div
					className="persium-spinner"
					style={{ position: "absolute", top: 0, left: 0 }}
				/>
			</Div>
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
		</Flex>
	);
};
