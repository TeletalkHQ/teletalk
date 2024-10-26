import { TableCellProps, TableRow } from "@mui/material";
import React from "react";

import { Skeleton } from "../loading";
import TCell from "./tCell";
import { GetHeadersType } from "./tHead";
import { TRowProps } from "./types";

export type CellValueComponent<Schema> = (item: Schema) => React.ReactNode;

export type CellValueComponents<
	Schema,
	ExtraFields extends string = string,
> = Partial<
	| Record<keyof Schema, CellValueComponent<Schema>>
	| Record<ExtraFields, CellValueComponent<Schema>>
>;

interface Props<Schema, ExtraFields extends string = string> extends TRowProps {
	components?: CellValueComponents<Schema, ExtraFields>;
	headers: GetHeadersType<Schema, ExtraFields>;
	isLoading?: boolean;
	row: Schema;
	rowSpacing?: string;
	tCellClassnames?: string;
	tCellProps?: TableCellProps;
}

function TRow<Schema, ExtraFields extends string = string>({
	className,
	components,
	headers,
	isLoading,
	row,
	rowSpacing,
	tCellClassnames,
	tCellProps,
	...rest
}: Props<Schema, ExtraFields>) {
	type Key = keyof Schema;

	return (
		<TableRow className={`bg-light ${className}`} {...rest}>
			{Object.entries(headers).map(([name], index) => {
				// TODO: Remove assertion
				const ValueComponent = components?.[name as Key] as
					| CellValueComponent<Schema>
					| undefined;

				return (
					<TCell
						className={`rounded-none first:rounded-[8px_0_0_8px] last:rounded-[0_8px_8px_0] !border-none ${tCellClassnames}`}
						{...tCellProps}
						key={`${name}+${index}`}
					>
						<Skeleton height={40} isLoading={isLoading}>
							{/* TODO: Convert to component - ValueComponent */}
							<>
								{ValueComponent
									? ValueComponent(row)
									: (row[name as Key] ?? "-")}
							</>
						</Skeleton>
					</TCell>
				);
			})}
		</TableRow>
	);
}

export default TRow;
