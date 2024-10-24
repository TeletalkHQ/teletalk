import { StoreSetFn, VoidWithArg } from "@repo/types";

export type TableName =
	| "organisations"
	| "packages"
	| "permissions"
	| "roles"
	| "rawData"
	| "sensors"
	| "sensorTypes"
	| "sensorVendors"
	| "stations"
	| "users"
	| "calculatedData";

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
