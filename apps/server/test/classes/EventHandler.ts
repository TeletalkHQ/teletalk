import { FIELD_TYPE } from "@repo/constants";
import {
	EventName,
	EventSchema,
	SocketRequestBody,
	SocketResponse,
} from "@repo/schema";
import { expect } from "chai";
import { Socket } from "socket.io-client";

import { logHelper } from "./LogHelper";

export interface EventHandlerOptions {
	session?: string;
	shouldLogDetails?: boolean;
}

// TODO: Remove
type ErrorReason = string;
interface CustomError {
	reason: ErrorReason;
}

export type EventHandlerResponse<T extends EventName> = SocketResponse<T>;

type RequestBody<T extends EventName> = SocketRequestBody<T>;

export class EventHandler<T extends EventName> {
	private expectedError?: CustomError;

	private options: EventHandlerOptions = {
		session: undefined,
		shouldLogDetails: false,
	};

	private body: RequestBody<T>;
	private response: EventHandlerResponse<T>;

	constructor(
		private eventSchema: EventSchema<T>,
		private socket: Socket,
		options: EventHandlerOptions = {}
	) {
		this.updateOptions(options);
	}

	updateOptions(newOptions: Partial<EventHandlerOptions>) {
		this.options = this.mergeOptions(newOptions);
		return this;
	}
	private mergeOptions(newOptions: Partial<EventHandlerOptions>) {
		return {
			...this.options,
			...newOptions,
		};
	}

	// TODO: Remove
	setExpectedError(_reason: ErrorReason) {
		// this.error = errorStore.find(reason);
		return this;
	}

	private getBody() {
		return this.body;
	}
	private setBody(body: RequestBody<T>) {
		this.body = body;
		return this;
	}

	async send(
		body: RequestBody<T>,
		reason?: ErrorReason,
		options: Partial<EventHandlerOptions> = this.options
	) {
		if (this.options.shouldLogDetails) logHelper.logStartTestRequest();

		const finalOptions = this.mergeOptions(options);

		if (body) this.setBody(body);

		if (this.options.shouldLogDetails)
			logHelper.logRequestDetails(
				finalOptions,
				this.getBody(),
				this.eventSchema,
				this.expectedError
			);

		if (reason) this.setExpectedError(reason);

		const response = (await new Promise((resolve, _reject) => {
			// this.socket.connect();
			this.socket.emit(this.eventSchema.ioName, this.getBody(), resolve);
		})) as SocketResponse<T>;
		// this.socket.disconnect();

		this.setResponse(response);

		this.checkErrors();

		if (this.options.shouldLogDetails) logHelper.logEndTestRequest();

		return this.getResponse();
	}

	getResponse() {
		return this.response;
	}

	getSession() {
		return this.options.session;
	}

	private setResponse(response: EventHandlerResponse<T>) {
		this.response = response;
		return this;
	}

	private isEventFailed() {
		return this.getResponse().ok === false;
	}

	private checkErrors() {
		if (this.isEventFailed() && !this.expectedError)
			throw Error("ERROR_NOT_SPECIFIED");

		if (!this.isEventFailed() && this.expectedError)
			throw Error("REQUEST_DID_NOT_FAILED");

		if (!this.isEventFailed() && !this.expectedError) return;

		const expectedReason = this.expectedError?.reason;

		const response = this.getResponse();

		if (!response.errors) throw Error("ERRORS_ARRAY_MISSING");

		expect(response.errors).to.be.an(FIELD_TYPE.ARRAY);

		const foundError = response.errors.find((i) => i.reason === expectedReason);
		expect(foundError?.reason).to.be.equal(expectedReason);

		return this;
	}
}

export const eventHandler = <T extends EventName>(
	eventSchema: EventSchema<T>,
	socket: Socket,
	options?: EventHandlerOptions
) => new EventHandler<T>(eventSchema, socket, options);
