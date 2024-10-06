import { EventName, IOCollection } from "@repo/schema";
import { SocketResponse, SocketRoute } from "@repo/socket";
import chai from "chai";
import { Socket as Client } from "socket.io-client";

import { RequesterOptions } from "@/types";
import { loggerHelper } from "@/utils/logHelper";
import { FIELD_TYPE } from "@/variables";

export class Requester<T extends EventName> {
	private error?: Error;
	private event: SocketRoute<T>;
	private options: RequesterOptions = {};
	private requestData: IOCollection[T]["input"];
	private response: SocketResponse<T>;
	private socket: Client;

	constructor(socket: Client, event: SocketRoute<T>) {
		this.setSocket(socket);
		this.setEvent(event);
	}

	getOptions() {
		return { ...this.options };
	}
	setOptions(newOptions: Partial<RequesterOptions>) {
		this.options = this.mergeOptions(newOptions);
		return this;
	}
	mergeOptions(newOptions: Partial<RequesterOptions>) {
		return {
			...this.getOptions(),
			...newOptions,
		};
	}

	getSocket() {
		return this.socket;
	}
	setSocket(socket: Client) {
		this.socket = socket;
		return this;
	}

	getEvent() {
		return this.event;
	}
	getEventName() {
		return this.getEvent().name;
	}
	setEvent(event: typeof this.event) {
		this.event = event;
		return this;
	}
	getInputFields() {
		return this.getEvent().inputValidator;
	}

	getError() {
		return this.error;
	}
	setError(reason: ErrorReason) {
		this.error = errorStore.find(reason);
		return this;
	}

	private getEmitData() {
		return this.requestData;
	}
	private setEmitData(requestData: IOCollection[T]["input"]) {
		this.requestData = requestData;
		return this;
	}

	async emit() {
		const response = (await new Promise((resolve, _reject) => {
			// this.socket.connect();
			this.socket.emit(this.getEventName(), this.getEmitData(), resolve);
		})) as SocketResponse<T>;

		// this.socket.disconnect();
		this.setResponse(response);

		return this;
	}

	async emitFull(
		data: IOCollection[T]["input"],
		reason?: ErrorReason,
		options: Partial<RequesterOptions> = this.getOptions()
	) {
		loggerHelper.logStartTestRequest();

		const finalOptions = this.mergeOptions(options);

		if (data) this.setEmitData(data);

		loggerHelper.logRequestDetails(
			finalOptions,
			this.getEmitData(),
			this.getEvent(),
			this.getError()
		);

		if (reason) this.setError(reason);

		await this.emit();

		this.checkOk().checkErrors();

		loggerHelper.logEndTestRequest();

		return this.getResponse();
	}

	getResponse() {
		return this.response;
	}

	private setResponse(response: SocketResponse<T>) {
		this.response = response;
		return this;
	}

	private checkOk() {
		const requestOk = this.getError() ? false : true;
		const responseOk = this.getResponse().ok;
		chai.expect(responseOk).to.be.equal(requestOk);
		return this;
	}

	private checkErrors() {
		const responseOk = this.getResponse().ok;
		if (responseOk !== true) this.checkErrorReason();

		return this;
	}
	private checkErrorReason() {
		const expectedError = this.getError();
		if (!expectedError) throw "Error is not defined";

		const { reason: expectedReason } = expectedError;
		const { errors } = this.getResponse();
		chai.expect(errors).to.be.an(FIELD_TYPE.ARRAY);

		const error = errors?.find((i) => i.reason === expectedReason);
		chai.expect(error?.reason).to.be.equal(expectedReason);

		return this;
	}
}

export const requesterMaker = <T extends EventName>(
	socket: Client,
	event: SocketRoute<T>
) => new Requester(socket, event);
