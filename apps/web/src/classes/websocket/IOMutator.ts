import {
	Interceptors,
	RequestTransformer,
	ResponseTransformer,
} from "@repo/hl-types";
import { EventName, IOCollection } from "@repo/type-store";

//UNUSED, //!UNSTABLE
export class IOMutator<T extends EventName> {
	private requestInterceptors: Interceptors<T> = [];
	private requestTransformer: RequestTransformer<T> = (requestData) =>
		requestData;
	private responseInterceptors: Interceptors<T> = [];
	private responseTransformer: ResponseTransformer<T> = (response) => response;

	private executeRequestTransformer(reqData: IOCollection[T]["input"]) {
		return this.requestTransformer(reqData);
	}

	private executeRequestInterceptors(reqData: IOCollection[T]["input"]) {
		return this.executeInterceptors(this.requestInterceptors, reqData);
	}

	private executeResponseTransformer(resData: IOCollection[T]["output"]) {
		return this.responseTransformer(resData);
	}

	private executeResponseInterceptors(resData: IOCollection[T]["output"]) {
		return this.executeInterceptors(this.responseInterceptors, resData);
	}

	private executeInterceptors(
		interceptors: Interceptors<T>,
		//CLEANME: Duplicate type
		data: IOCollection[T]["input"] | IOCollection[T]["output"]
	) {
		let newData = data;

		interceptors.forEach((interceptor) => {
			newData = interceptor(newData);
		});

		return newData;
	}
}

export const ioMutator = new IOMutator();
