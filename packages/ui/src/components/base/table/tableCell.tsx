import TableCellBase, { TableCellProps } from "@mui/material/TableCell";
import { DASHBOARD_BASE_THEME } from "@repo/theme";
import { FC } from "react";

export const TableCell: FC<TableCellProps> = ({ sx, ...rest }) => {
	return (
		<TableCellBase
			align="center"
			padding="none"
			sx={{
				backgroundColor: DASHBOARD_BASE_THEME.COLORS["005"],
				color: DASHBOARD_BASE_THEME.COLORS["016"],
				boxShadow:
					"-1px -1px 1px 0px rgba(105, 105, 105, 0.25),2px 2px 2px 0px rgba(0, 0, 0, 0.25)",
				border: "none",
				outline: "none",
				borderRadius: "999px",
				...sx,
			}}
			{...rest}
		/>
	);
};
