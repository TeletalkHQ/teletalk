import TableContainerMui, {
	TableContainerProps,
} from "@mui/material/TableContainer";
import { FC } from "react";

export const TableContainer: FC<TableContainerProps> = ({ ...rest }) => {
	return <TableContainerMui {...rest} />;
};
