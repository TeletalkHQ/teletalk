import {
  IO,
  Interceptors,
  RequestTransformer,
  ResponseTransformer,
} from "~/types";

//UNUSED, //!UNSTABLE
export class IOMutator<IOType extends IO> {
  private requestInterceptors: Interceptors = [];
  private requestTransformer: RequestTransformer<IOType["input"]> = (
    requestData
  ) => requestData;
  private responseInterceptors: Interceptors = [];
  private responseTransformer: ResponseTransformer = (response) => response;

  private executeRequestTransformer(reqData: IOType["input"]) {
    return this.requestTransformer(reqData);
  }

  private executeRequestInterceptors(reqData: IOType["input"]) {
    return this.executeInterceptors(this.requestInterceptors, reqData);
  }

  private executeResponseTransformer(resData: IOType["output"]) {
    return this.responseTransformer(resData);
  }

  private executeResponseInterceptors(resData: IOType["output"]) {
    return this.executeInterceptors(this.responseInterceptors, resData);
  }

  private executeInterceptors(
    interceptors: Interceptors,
    data: IOType["input"] | IOType["output"]
  ) {
    let newData = data;

    interceptors.forEach((interceptor) => {
      newData = interceptor(newData);
    });

    return newData;
  }
}

export const ioMutator = new IOMutator();
