import { errorStore } from "@repo/error-store";
import {
	SocketErrorCallback,
	SocketResponse,
	SocketResponseCallback,
} from "@repo/types";
import { EventName, IOCollection, VoidNoArgsFn } from "@repo/types";
import { AutoBind } from "@repo/utils";
import Timeout from "await-timeout";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import type { SocketRoute, UpdateLoadingFn } from "~/types";
import { utils } from "~/utils";

interface Options {
	timeout: number;
}

type FoundInput<T extends EventName> = IOCollection[T]["input"];
type FoundOutput<T extends EventName> = IOCollection[T]["output"];

//TODO: Merge with Requester
export class EventHandler<T extends EventName> {
	private defaultOptions: Options = {
		timeout: appConfigs.getConfigs().api.defaultTimeout,
	};

	private errorCallback: SocketErrorCallback;
	private requestData: FoundInput<T>;
	private response: SocketResponse<T>;
	private responseCallback: SocketResponseCallback<T>;
	private route: SocketRoute;

	constructor(
		private loadingUpdater: UpdateLoadingFn,
		private authErrorHandler: VoidNoArgsFn
	) {}

	getRequestData() {
		return this.requestData;
	}
	setRequestData(requestData: FoundInput<T>) {
		this.requestData = requestData;
		return this;
	}

	setRoute(route: SocketRoute) {
		this.route = route;
		return this;
	}

	getResponse() {
		return this.response;
	}
	setResponse(response: SocketResponse<T>) {
		this.response = response;
		return this;
	}

	getResponseData() {
		return this.getResponse().data;
	}
	setResponseData(responseData: FoundOutput<T>) {
		this.response.data = responseData;
		return this;
	}

	async emit(
		data: FoundInput<T>,
		options: Partial<Options> = this.defaultOptions
	) {
		const mergedOptions = { ...this.defaultOptions, ...options };

		this.loadingUpdater(true);

		await Timeout.set(mergedOptions.timeout);

		await new Promise((resolve, reject) => {
			websocket.client.emit(
				this.route.name,
				data,
				(response: SocketResponse<T>) => {
					this.setResponse(response).setResponseData(response.data);

					this.loadingUpdater(false);

					if (response.ok) resolve(response);

					reject(response);
				}
			);
		});

		return this;
	}

	async emitFull(
		data: FoundInput<T>,
		responseCallback: SocketResponseCallback<T> = () => undefined,
		errorCallback: SocketErrorCallback = (_errors) => {},
		options?: Partial<Options>
	): Promise<SocketResponse<T> | undefined> {
		this.requestData = data;
		this.responseCallback = responseCallback;
		this.errorCallback = errorCallback;

		try {
			return await this.tryToEmitFull(options);
		} catch (error) {
			this.catchEmitFull();
		}
	}

	@AutoBind
	private async tryToEmitFull(options?: Partial<Options>) {
		await this.emit(this.requestData, options);

		await this.outputDataFieldsCheck()
			.logSuccessfulResponse()
			.executeResponseCallback();

		return this.getResponse();
	}

	@AutoBind
	private catchEmitFull() {
		this.errorCallback(this.response.errors);
		utils.printResponseErrors(this.response.errors);
		this.logFailureResponse();
		this.handleAuthError();
	}

	private inputDataFieldsCheck(_inputData = this.getRequestData()) {
		// if (appConfigs.getConfigs().api.shouldCheckInputDataFields)
		// checkFields(
		// 	inputData,
		// 	this.route.inputFields,
		// 	variables.notifications.errors.checkFieldErrors.input
		// );

		return this;
	}

	private outputDataFieldsCheck(_outputData = this.getResponseData()) {
		// if (appConfigs.getConfigs().api.shouldCheckOutputDataFields)
		// checkFields(
		// 	outputData,
		// 	this.route.outputFields,
		// 	variables.notifications.errors.checkFieldErrors.output
		// );

		return this;
	}

	private logSuccessfulResponse(response = this.getResponse()) {
		if (appConfigs.getConfigs().api.shouldLogSuccessfulResponse)
			console.debug("response:", response);

		return this;
	}

	private logFailureResponse() {
		if (appConfigs.getConfigs().api.shouldLogFailureResponse)
			console.error(
				`Api:${this.route.name} Api catch, error:`,
				this.resolveError()
			);
	}

	private resolveError() {
		return (
			Object.values(this.response.errors || [])[0] ||
			errorStore.find("UNKNOWN_ERROR")
		);
	}

	private async executeResponseCallback() {
		await this.responseCallback(this.response);
		return this;
	}

	private handleAuthError() {
		if (this.isAuthErrorHappened()) this.authErrorHandler();
	}

	private isAuthErrorHappened() {
		return this.response.errors.some((i) => i.isAuthError);
	}
}

export const eventHandler = <T extends EventName>(
	loadingUpdater: UpdateLoadingFn,
	authErrorHandler: VoidNoArgsFn
) => new EventHandler<T>(loadingUpdater, authErrorHandler);
