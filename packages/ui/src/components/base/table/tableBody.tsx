import TableBodyMui, { TableBodyProps } from "@mui/material/TableBody";
import { FC } from "react";

export const TableBody: FC<TableBodyProps> = ({ ...rest }) => {
	return <TableBodyMui {...rest} />;
};
