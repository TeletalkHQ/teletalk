import { State } from "./types";

const defaultPaginationState = {
	page: 1,
	perPage: 10,
	total: 0,
};

export const initialState: State = {
	pagination: {
		calculatedData: defaultPaginationState,
		organisations: defaultPaginationState,
		packages: defaultPaginationState,
		permissions: defaultPaginationState,
		roles: defaultPaginationState,
		rawData: defaultPaginationState,
		sensors: defaultPaginationState,
		sensorTypes: defaultPaginationState,
		sensorVendors: defaultPaginationState,
		stations: defaultPaginationState,
		users: defaultPaginationState,
	},
};
