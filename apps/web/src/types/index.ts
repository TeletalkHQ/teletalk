import { IoFields } from "check-fields";
import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationError,
} from "fastest-validator";
import { CSSProperties } from "react";
import type {
  Cellphone,
  ContactItem,
  EventName as MainEventName,
} from "teletalk-type-store";
import { ScreamingSnakeCase } from "type-fest";

import { stuffStore } from "~/classes/StuffStore";
import { Transition } from "~/components";
import { stuff } from "~/data/stuff";

import { DrawerAnchor } from "./store/global";

export interface StringMap {
  [prop: string]: any;
}

export type TransitionName = keyof typeof Transition;

export interface UiConfig {
  drawerDefaultAnchor: DrawerAnchor;
  dialogDefaultTransition: TransitionName;
  maxNotification: number;
}

export type Contacts = ContactItem[];

export type Style = CSSProperties;

export type FullContact = ContactItem & Cellphone;

export type VoidNoArgsFn = () => void;

export type VoidWithArg<Arg> = (arg: Arg) => void;

export type VoidWithTwoArgs<Arg1, Arg2> = (arg1: Arg1, arg2: Arg2) => void;

export * from "~/types/components";

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export type EventName =
  | MainEventName
  | "connect"
  | "connect_error"
  | "disconnect"
  | "pong";

export type ValidatorType = SyncCheckFunction | AsyncCheckFunction;

export type ErrorChecker = VoidWithTwoArgs<any, any>;

export type ValidationErrors = ValidationError[];

export type ValidationResult = true | ValidationErrors;

export interface SocketRoute extends Route {
  name: EventName;
}

export type Protocol = "http" | "https";

export type Url = `${Protocol}://${string}`;

export type NotificationSide = "SERVER" | "CLIENT";

export interface Environments {
  NEXT_PUBLIC_CLIENT_BASE_URL: Url;
  NEXT_PUBLIC_RUNTIME_MODE: "development" | "production";
  NEXT_PUBLIC_SERVER_BASE_URL: Url;
}

export type NativeModelCollection = typeof stuffStore.models;

type AllErrorKeys = {
  [T in keyof NativeModelCollection]: `${T}_${keyof NativeModelCollection[T] &
    string}_error`;
};

export type ModelErrorReason = ScreamingSnakeCase<
  AllErrorKeys[keyof AllErrorKeys] | `${keyof NativeModelCollection}_invalid`
>;

export type Errors = typeof stuffStore.errors;
export type ErrorItem = Errors[number];
export type ErrorReason =
  | ModelErrorReason
  | ErrorItem["reason"]
  | "ECONNABORTED"
  | "EVENT_IS_BROKEN"
  | "REQUIREMENT_ITEM_MISSING"
  | "SERVER_ALREADY_EXIST";

export type NotificationReason = ErrorReason;

export interface NativeError {
  description: string;
  isAuthError: boolean;
  message: string;
  reason: ErrorReason;
  side: NotificationSide;
}

export type Notification = NativeError;

export type EnvName = keyof Environments;

export type RuntimeMode = Environments["NEXT_PUBLIC_RUNTIME_MODE"];

export type Stuff = typeof stuff;

export type Field = keyof typeof stuff.models;

export type FieldType = (typeof stuff.models)[Field]["type"];

export interface NativeModel {
  defaultValue?: any;
  empty?: boolean;
  length?: number;
  maxLength?: number;
  minLength?: number;
  numeric?: boolean;
  required?: boolean;
  trim?: boolean;
  type: FieldType;
  unique?: boolean;
}

export type NativeModelKey = keyof NativeModel;

export type Status = "idle" | "pending" | "offline" | "online";

export type StatusColors = { [key in Status]: string };

export type UrlName = "create" | "messenger" | "signIn" | "verify";

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K];
};

export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? "_"
        : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

export type KeysToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};

export interface ServerTestResult {
  url: Url;
  ping: number | undefined;
  status: Status;
}

export type UpdateLoadingFn = VoidWithArg<boolean>;

export type * from "./api";
export type * from "./components";
export type * from "./models";
export type * from "./store";
export type * from "./utils";
export type * from "./validation";
