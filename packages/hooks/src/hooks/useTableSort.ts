"use client";

import {
	TableBodyTypeMap,
	TableCellProps,
	TableContainerProps,
	TableHeadProps,
	TableProps,
	TableRowProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { MouseEvent, ReactNode, useMemo, useState } from "react";

export type Order = "asc" | "desc";

export type TData<K extends string, U = string | number | ReactNode> = Record<
	K,
	U
>;
export type Data<K extends string, U = string | number | ReactNode> = Array<
	TData<K, U>
>;
export type Header = Array<string>;
export type TRowProps = TableRowProps;
export type TBodyProps = OverridableComponent<
	TableBodyTypeMap<object, "tbody">
>;
export type THeadProps = TableHeadProps;
export type TContainerProps = TableContainerProps;
export type TBaseProps = TableProps;
export type TCellProps = TableCellProps;

interface Params<T extends string, U = string | number | ReactNode> {
	data: Data<T, U>;
	defaultSortKey: T;
	sortOrder?: Order;
}

// FIXME: Return type
export const useTableSort = <
	DataItemKey extends string,
	U = string | number | ReactNode,
>({
	data,
	defaultSortKey,
	sortOrder = "asc",
}: Params<DataItemKey, U>) => {
	const [order, setOrder] = useState<Order>(sortOrder);
	const [orderBy, setOrderBy] = useState<DataItemKey>(defaultSortKey);

	const handleRequestSort = (
		_event: MouseEvent<unknown>,
		property: DataItemKey
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const sortedData = useMemo(
		() => data.slice().sort(getComparator(order, orderBy)),
		[order, orderBy, data]
	);

	return {
		handleRequestSort,
		sortedData,
		order,
		orderBy,
	};
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}
function getComparator<
	Key extends keyof any,
	U = string | number | React.ReactNode,
>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: U }, b: { [key in Key]: U }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
