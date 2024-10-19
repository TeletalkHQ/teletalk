import { FIELD_TYPE } from "@repo/constants";
import {
	HTTPRequestBody,
	HTTPResponse,
	HTTPRouteShortName,
	RouteSchema,
} from "@repo/schema";
import axios, { AxiosResponse } from "axios";
import { expect } from "chai";

import { COOKIE_NAMES } from "~/constants";
import { ConfigService } from "~/modules/config/config.service";

import { getServiceInstance } from "@/utils/app";

import { logHelper } from "./LogHelper";

const configService = await getServiceInstance(ConfigService);

export interface HTTPHandlerOptions {
	session?: string;
	shouldLogDetails?: boolean;
}

// TODO: Remove
type ErrorReason = string;
interface CustomError {
	reason: ErrorReason;
}

export type CookieItem = { value: string; flags: Record<string, boolean> };

export type HTTPHandlerResponse<T extends HTTPRouteShortName> = AxiosResponse<
	Awaited<HTTPResponse<T>>
>;

type RequestBody<T extends HTTPRouteShortName> = {
	data: HTTPRequestBody<T>;
};

export class HTTPHandler<T extends HTTPRouteShortName> {
	private expectedError?: CustomError;

	private options: HTTPHandlerOptions = {
		session: undefined,
		shouldLogDetails: false,
	};

	private body: HTTPRequestBody<T>;
	private response: HTTPHandlerResponse<T>;

	constructor(
		private routeSchema: RouteSchema<T>,
		options: HTTPHandlerOptions = {}
	) {
		this.updateOptions(options);
	}

	updateOptions(newOptions: Partial<HTTPHandlerOptions>) {
		this.options = this.mergeOptions(newOptions);
		return this;
	}
	private mergeOptions(newOptions: Partial<HTTPHandlerOptions>) {
		return {
			...this.options,
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
	private setBody(data: HTTPRequestBody<T>) {
		this.body = data;
		return this;
	}

	async send(
		{ data }: RequestBody<T>,
		reason?: ErrorReason,
		options: Partial<HTTPHandlerOptions> = this.options
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
			headers: {
				Authorization: this.options.session,
			},
		});

		this.setResponse(response);

		this.checkStatusCode().checkErrors();

		if (this.options.shouldLogDetails) logHelper.logEndTestRequest();

		return this.getResponse();
	}

	getResponse() {
		return this.response;
	}

	getSession() {
		return this.getSessionCookie().value;
	}

	getSessionCookie() {
		const cookies = this.extractCookies(this.getResponse().headers);
		if (!(COOKIE_NAMES.SESSION in cookies))
			throw new Error("SESSION_COOKIE_NOT_FOUND");

		// if (typeof cookies.SESSION !== "string")
		// 	throw new Error("SESSION_COOKIE_TYPE_ERROR");

		return cookies.SESSION;
	}

	extractCookies(headers: AxiosResponse["headers"]) {
		const cookies = headers["set-cookie"];

		if (!cookies) throw new Error("SESSION_COOKIE_NOT_FOUND");

		return cookies.reduce(
			(shapedCookies, cookieString) => {
				const [rawCookie, ...flags] = cookieString.split("; ");
				const [cookieName, value] = rawCookie.split("=");
				return {
					...shapedCookies,
					[cookieName]: { value, flags: this.shapeFlags(flags) },
				};
			},
			{} as Record<string, CookieItem>
		);
	}

	shapeFlags(flags: string[]) {
		return flags.reduce((shapedFlags, flag) => {
			const [flagName, rawValue] = flag.split("=");
			const value = rawValue ? rawValue.replace(";", "") : true;
			return { ...shapedFlags, [flagName]: value };
		}, {});
	}

	private setResponse(response: HTTPHandlerResponse<T>) {
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

		const response = this.getResponse() as unknown as AxiosResponse<{
			errors: Array<CustomError>;
		}>;

		if (!response.data.errors) throw Error("ERRORS_ARRAY_MISSING");

		expect(response.data.errors).to.be.an(FIELD_TYPE.ARRAY);

		const foundError = response.data.errors.find(
			(i) => i.reason === expectedReason
		);
		expect(foundError?.reason).to.be.equal(expectedReason);

		return this;
	}
}

export const httpHandler = <T extends HTTPRouteShortName>(
	routeSchema: RouteSchema<T>,
	options?: HTTPHandlerOptions
) => new HTTPHandler<T>(routeSchema, options);
