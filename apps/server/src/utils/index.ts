import { errors } from "@repo/error-store";
import { EventName, IOCollection } from "@repo/type-store";
import generatePassword from "generate-password";
import { Socket } from "socket.io";

import { envManager } from "~/classes/EnvironmentManager";
import {
	Environments,
	SocketMiddleware,
	SocketMiddlewareEvent,
	SocketNext,
	SocketResponse,
	UnknownError,
} from "~/types";

import { databaseUtils } from "./database";
import { middlewareUtils } from "./middleware";

type Url = EventName | EventName[];

const isEventNameMatch = (url: Url, reqUrl: string) =>
	(Array.isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

const crashServer = (message: unknown) => {
	logger.error(message);
	process.exit(1);
};

interface ExecuteMiddlewaresArgs {
	middlewares: SocketMiddleware[];
	next: SocketNext;
	socket: Socket;
	socketMiddlewareEvent: SocketMiddlewareEvent;
}

const executeMiddlewares = async ({
	middlewares,
	next,
	socket,
	socketMiddlewareEvent,
}: ExecuteMiddlewaresArgs) => {
	for await (const m of middlewares) {
		const result = await m(
			socket,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			() => {},
			socketMiddlewareEvent
		);

		if (result?.ok === false) {
			return;
		}
	}

	next();
};

const logEnvironments = () => logger.debug(sortEnvironments());

const passwordGenerator = (options: generatePassword.GenerateOptions = {}) => {
	return generatePassword.generate({
		exclude: "",
		length: 6,
		lowercase: false,
		numbers: true,
		symbols: false,
		uppercase: false,
		...options,
	});
};

const sortEnvironments = () =>
	Object.entries(envManager.getEnv())
		.map(([prop, value]) => ({ prop, value }))
		.sort((a, b) => a.prop.localeCompare(b.prop))
		.reduce((prevValue, currentValue) => {
			const value = currentValue.value;
			(prevValue as any)[currentValue.prop] = value;

			return prevValue;
		}, {} as Environments);

const extractClientFromCookie = (cookie: string) => {
	const [rawCookie] = cookie.split("; ");
	return rawCookie.split("=")[1];
};

const resolveResponseError = (error: UnknownError) =>
	Array.isArray(error)
		? error
		: typeof error === "object" && "reason" in error!
			? [error]
			: [errors.custom.find((i) => i.reason === "UNKNOWN_ERROR")!];

//TODO: Add more support like trim and required

const createSuccessResponse = <T extends EventName>(
	eventName: T,
	data: IOCollection[T]["output"]
): SocketResponse => ({
	data,
	errors: [],
	ok: true,
	eventName,
});

const createFailureResponse = (
	eventName: EventName,
	errors: UnknownError
): SocketResponse => ({
	data: {},
	errors: resolveResponseError(errors),
	eventName,
	ok: false,
});

export const utils = {
	...middlewareUtils,
	...databaseUtils,
	crashServer,
	createFailureResponse,
	createSuccessResponse,
	executeMiddlewares,
	extractClientFromCookie,
	isEventNameMatch,
	logEnvironments,
	passwordGenerator,
	resolveResponseError,
	sortEnvironments,
};
