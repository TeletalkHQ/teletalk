import {
	Box,
	TableHead,
	TableRow,
	TableRowProps,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { TCell } from "./tCell";
import { Order, THeadProps } from "./types";

export type Headers<K extends string | number | symbol> = Record<
	K,
	string | number | undefined
>;

export type GetHeadersType<
	Schema,
	ExtraFields extends string = string,
> = Partial<Headers<keyof Schema> | Headers<ExtraFields>>;

interface Props<Schema, ExtraFields extends string = string>
	extends THeadProps {
	disablePadding?: boolean;
	headers: GetHeadersType<Schema, ExtraFields>;
	hiddenTHeads?: Array<keyof Schema | ExtraFields>;
	numeric?: boolean;
	order: Order;
	orderBy: keyof Schema;
	tRowProps?: TableRowProps;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Schema
	) => void;
}

export function AdvTHead<Schema, ExtraFields extends string = string>({
	disablePadding,
	headers,
	hiddenTHeads,
	numeric,
	onRequestSort,
	order,
	orderBy,
	tRowProps,
	...rest
}: Props<Schema, ExtraFields>) {
	const theme = useTheme();
	const createSortHandler =
		(property: keyof Schema) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	const isHeaderHidden = (name: string) =>
		hiddenTHeads?.includes(name as keyof Schema);

	return (
		<TableHead {...rest}>
			<TableRow {...tRowProps}>
				{Object.entries(headers).map(([name, value], index) => (
					<TCell
						key={`${name}+${index}`}
						align={numeric ? "right" : "left"}
						// padding={disablePadding ? "none" : "normal"}
						sortDirection={orderBy === name ? order : false}
						sx={{
							bgcolor: theme.palette.secondary[800],
						}}
					>
						{isHeaderHidden(name) ? (
							""
						) : (
							<TableSortLabel
								active={orderBy === name}
								direction={orderBy === name ? order : "asc"}
								onClick={createSortHandler(name as keyof Schema)}
							>
								<Typography variant="s"> {value as string} </Typography>
								{orderBy === name ? (
									<Box component="span" sx={visuallyHidden}>
										{order === "desc"
											? "sorted descending"
											: "sorted ascending"}
									</Box>
								) : null}
							</TableSortLabel>
						)}
					</TCell>
				))}
			</TableRow>
		</TableHead>
	);
}
