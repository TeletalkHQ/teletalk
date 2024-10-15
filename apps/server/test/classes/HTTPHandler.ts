import { IOName, RouteSchema } from "@repo/schema";
import axios, { AxiosResponse } from "axios";
import { expect } from "chai";

import { ConfigService } from "~/modules/config/config.service";
import { GetAPIInput, GetAPIOutput } from "~/types";

import { FIELD_TYPE } from "@/constants";
import { getServiceInstance } from "@/utils/app";

import { logHelper } from "./LogHelper";

const configService = await getServiceInstance(ConfigService);

export interface HTTPHandlerOptions {
	shouldLogDetails: boolean;
}

// TODO: Remove
type ErrorReason = string;
interface CustomError {
	reason: ErrorReason;
}

type ResponseType<T extends IOName> = AxiosResponse<
	Awaited<GetAPIOutput<T>> | { errors: Array<CustomError> }
>;

type RequestBody<T extends IOName> = GetAPIInput<T>;

export class HTTPHandler<T extends IOName> {
	private expectedError?: CustomError;

	private options: HTTPHandlerOptions = {
		shouldLogDetails: false,
	};

	private body: RequestBody<T>;
	private response: ResponseType<T>;

	constructor(private routeSchema: RouteSchema<T>) {}

	private getOptions() {
		return this.options;
	}
	updateOptions(newOptions: Partial<HTTPHandlerOptions>) {
		this.options = this.mergeOptions(newOptions);
		return this;
	}
	private mergeOptions(newOptions: Partial<HTTPHandlerOptions>) {
		return {
			...this.getOptions(),
			...newOptions,
		};
	}

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
		data: RequestBody<T>,
		reason?: ErrorReason,
		options: Partial<HTTPHandlerOptions> = this.getOptions()
	) {
		if (this.options.shouldLogDetails) logHelper.logStartTestRequest();

		const finalOptions = this.mergeOptions(options);

		if (data) this.setBody(data);

		if (this.options.shouldLogDetails)
			logHelper.logRequestDetails(
				finalOptions,
				this.getBody(),
				this.routeSchema,
				this.expectedError
			);

		if (reason) this.setExpectedError(reason);

		const response = await axios({
			method: this.routeSchema.method,
			data: this.getBody(),
			// FIXME: `pathname` may include query parameter!
			url: `http://localhost:${configService.getPort()}/${this.routeSchema.rootPath}/${this.routeSchema.pathname}`,
		});

		this.setResponse(response);

		this.checkStatusCode().checkErrors();

		if (this.options.shouldLogDetails) logHelper.logEndTestRequest();

		return this.getResponse();
	}

	getResponse() {
		return this.response;
	}

	private setResponse(response: ResponseType<T>) {
		this.response = response;
		return this;
	}

	private checkStatusCode() {
		expect(this.routeSchema.statusCode).to.be.equal(this.response.status);

		return this;
	}

	private isRequestFailed() {
		return this.getResponse().status >= 400;
	}

	private checkErrors() {
		if (this.isRequestFailed() && !this.expectedError)
			throw Error("ERROR_NOT_SPECIFIED", { cause: "REQUEST_FAILED" });

		if (!this.isRequestFailed() && this.expectedError)
			throw Error("REQUEST_DID_NOT_FAILED", { cause: "ERROR_EXPECTED" });

		if (!this.isRequestFailed() && !this.expectedError) return;

		const expectedReason = this.expectedError?.reason;

		const response = this.getResponse();

		if (!("errors" in response.data)) throw Error("ERRORS_ARRAY_MISSING");

		expect(response.data.errors).to.be.an(FIELD_TYPE.ARRAY);

		const foundError = response.data.errors.find(
			(i) => i.reason === expectedReason
		);
		expect(foundError?.reason).to.be.equal(expectedReason);

		return this;
	}
}

export const httpHandler = <T extends IOName>(routeSchema: RouteSchema<T>) =>
	new HTTPHandler<T>(routeSchema);
