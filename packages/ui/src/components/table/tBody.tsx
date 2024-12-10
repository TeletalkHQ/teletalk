import { TableBody, TableRow, useTheme } from "@mui/material";
import { Fragment } from "react";

import { type GetHeadersType } from "./tHead";
import { type CellValueComponents, TRow } from "./tRow";
import {
	type OnTRowClick,
	type TBodyProps,
	type TRowProps,
	type TableData,
} from "./types";

interface Props<Schema, ExtraFields extends string = string> {
	data: TableData<Schema>;
	headers: GetHeadersType<Schema, ExtraFields>;
	isLoading?: boolean;
	rowSpacing?: string;
	tBody?: TBodyProps;
	tCellClassnames?: string;
	tRowProps?: TRowProps;
	onTRowClick?: OnTRowClick<Schema>;
	components?: Partial<CellValueComponents<Schema, ExtraFields>>;
}

export function TBody<Schema, ExtraFields extends string = string>({
	data,
	headers,
	isLoading,
	onTRowClick,
	rowSpacing,
	tBody,
	tCellClassnames,
	tRowProps,
	components,
}: Props<Schema, ExtraFields>) {
	const { palette } = useTheme();
	return (
		<TableBody {...tBody}>
			{data.map((row, index) => (
				<Fragment key={index}>
					<TRow
						components={components}
						headers={headers}
						isLoading={isLoading}
						row={row}
						rowSpacing={rowSpacing}
						sx={{
							bgcolor: palette.secondary[800],
							...tRowProps?.sx,
						}}
						tCellClassnames={tCellClassnames}
						{...tRowProps}
						onClick={() => {
							onTRowClick?.(row);
						}}
					/>
					{rowSpacing && (
						<TableRow
							style={{
								height: rowSpacing,
							}}
						/>
					)}
				</Fragment>
			))}
		</TableBody>
	);
}