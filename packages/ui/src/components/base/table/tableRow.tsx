import TableRowBase, { TableRowProps } from "@mui/material/TableRow";
import { FC } from "react";

export const TableRow: FC<TableRowProps> = ({ ...rest }) => {
	return <TableRowBase {...rest} />;
};
