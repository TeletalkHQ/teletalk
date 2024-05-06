import { EventName } from "@repo/type-store";
import { Socket as ClientSocket } from "socket.io-client";

import { middlewares } from "~/socket/middlewares";

import { Requester } from "@/classes/Requester";
import { mergedServices } from "@/services";

export type RequesterMaker<T extends EventName> = (
	socketClient: ClientSocket
) => Requester<T>;

export type E2eFailTestInitializer<T extends EventName> = (
	configuredRequester: Requester<T>,
	data: Readonly<object>
) => void;

export type AssertionInitializerOptions = {
	stringEquality: boolean;
};
export interface AssertionInitializerArgs<DataType, TestDataType = DataType> {
	equalValue?: DataType;
	testValue: TestDataType;
}

export type AssertionInitializer<
	EqualDataType,
	TestDataType = EqualDataType,
> = (
	data: AssertionInitializerArgs<EqualDataType, TestDataType>,
	options: Partial<AssertionInitializerOptions>
) => void;

export interface RequesterOptions {}

export type MiddlewareName = keyof typeof middlewares;
export type ServiceName = keyof typeof mergedServices;

export type { ClientSocket };
