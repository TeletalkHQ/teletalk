import { Box, TableCell } from "@mui/material";

import { TCellProps } from "./types";

interface Props extends TCellProps {}

export function TCell(props: Props) {
	return (
		<TableCell {...props}>
			<Box
				sx={{
					width: 150,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{props.children}
			</Box>
		</TableCell>
	);
}
