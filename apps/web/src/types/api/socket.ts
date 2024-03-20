import { NativeError, VoidWithArg } from "~/types";

export type IO = {
  input: object;
  output: object;
};

export type SocketResponseErrors = NativeError[];

export interface SocketResponse<Data = IO["output"]> {
  data: Data;
  errors: SocketResponseErrors;
  ok: boolean;
}

export type SocketMethods = "on" | "onAny" | "customOn" | "once";

export interface SocketResponse<Data = IO["output"]> {
  data: Data;
  errors: SocketResponseErrors;
  ok: boolean;
}

export type SocketResponseCallback<Data = IO["output"]> = (
  response: SocketResponse<Data>
) => Promise<void> | void;

export type SocketErrorCallback = VoidWithArg<SocketResponseErrors>;

export type RequestTransformer<Data = IO["input"]> = (
  requestData: Data
) => Data;

export type ResponseTransformer<DataType = IO["output"]> = (
  response: DataType
) => DataType;

export type Interceptor<Data> = (data: Data) => Data;

export type Interceptors<Data = IO["input"] | IO["output"]> =
  Interceptor<Data>[];
