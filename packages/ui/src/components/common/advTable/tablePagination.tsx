import {
	Box,
	MenuItem,
	Pagination,
	Select,
	SelectProps,
	useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { PaginationStore } from "@repo/store";
import * as React from "react";

import { useTablePagination } from "../../../hooks";

interface Props {
	tableName: PaginationStore.TableName;
}
interface PaginationAmount {
	label: string;
	value: number;
}
const paginationAmount: Array<PaginationAmount> = [
	{
		label: "10",
		value: 10,
	},
	{
		label: "25",
		value: 25,
	},
	{
		label: "50",
		value: 50,
	},
	{
		label: "100",
		value: 100,
	},
];
export const TablePagination: React.FC<Props> = ({ tableName }) => {
	const { pagination, updatePagination } = useTablePagination(tableName);
	const { palette } = useTheme();

	const handleChangePage = (_event: unknown, newPage: number) => {
		updatePagination({
			page: newPage,
		});
	};

	const handleChangeRowsPerPage: SelectProps["onChange"] = (event) => {
		updatePagination({
			page: 1,
			perPage: Number(event.target.value),
		});
	};

	return (
		<Paper
			elevation={0}
			sx={{
				width: "100%",
				padding: "10px",
				backgroundColor: palette.secondary[800],
				position: "sticky",
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
			<Box
				alignItems="center"
				component="div"
				display="flex"
				height="100%"
				justifyContent="space-between"
				width="100%"
			>
				<Select value={pagination.perPage} onChange={handleChangeRowsPerPage}>
					{paginationAmount.map(({ label, value }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>

				<Pagination
					count={Math.ceil(pagination.total / pagination.perPage)}
					page={pagination.page}
					shape="rounded"
					onChange={handleChangePage}
				/>
			</Box>
		</Paper>
	);
};
