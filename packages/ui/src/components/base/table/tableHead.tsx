import TableHeadMui, { TableHeadProps } from "@mui/material/TableHead";
import { FC } from "react";

export const TableHead: FC<TableHeadProps> = ({ ...rest }) => {
	return <TableHeadMui {...rest} />;
};
