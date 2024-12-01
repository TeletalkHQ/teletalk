import TableCellBase, { TableCellProps } from "@mui/material/TableCell";
import { FC } from "react";

export const TableCell: FC<TableCellProps> = ({ sx, ...rest }) => {
	return <TableCellBase align="center" padding="none" {...rest} />;
};
