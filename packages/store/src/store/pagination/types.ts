import { VoidWithArg } from "@repo/types";

import { StoreSetFn } from "../../utils";

export type TableName = "users";

export interface PaginationDefaultProps {
	page: number;
	perPage: number;
	total: number;
}

export type PaginationState = {
	[key in TableName]: PaginationDefaultProps;
};

export interface Handlers {
	updatePagination: VoidWithArg<{
		name: TableName;
		props: Partial<PaginationDefaultProps>;
	}>;
}

export interface State {
	pagination: PaginationState;
}
export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
