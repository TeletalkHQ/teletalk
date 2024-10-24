import MuiTable, { TableProps } from "@mui/material/Table";
import { FC } from "react";

export const Table: FC<TableProps> = ({ ...rest }) => {
	return <MuiTable {...rest} />;
};
