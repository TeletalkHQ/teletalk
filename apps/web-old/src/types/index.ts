import { ErrorReason, ErrorSide, NativeError } from "@repo/error-store";
import { Route } from "@repo/types";
import type { EventName, VoidWithArg } from "@repo/types";

import { Transition } from "~/components";

export type TransitionName = keyof typeof Transition;

// TODO: Move name to Route interface
export interface SocketRoute extends Route {
	name: EventName;
}

export type Protocol = "http" | "https";

export type Url = `${Protocol}://${string}`;

export type NotificationSide = ErrorSide;
export type NotificationReason = ErrorReason;
export type Notification = NativeError;

export interface Environments {
	NEXT_PUBLIC_CLIENT_BASE_URL: Url;
	NODE_ENV: "development" | "production";
	NEXT_PUBLIC_SERVER_BASE_URL: Url;
}

export type EnvName = keyof Environments;

export type RuntimeMode = Environments["NODE_ENV"];

export type ServerAvailabilityStatus =
	| "idle"
	| "pending"
	| "offline"
	| "online";

export type StatusColors = { [key in ServerAvailabilityStatus]: string };

export interface ServerTestResult {
	url: Url;
	ping: number | undefined;
	status: ServerAvailabilityStatus;
}

export type UpdateLoadingFn = VoidWithArg<boolean>;

export type * from "./components";
export type * from "./models";
