import { ScreamingSnakeCase } from "type-fest";

import { nativeModels } from "../../../models/native";

export type FieldType =
	| "array"
	| "boolean"
	| "date"
	| "number"
	| "object"
	| "string";

export interface NativeModel {
	defaultValue?: any;
	empty?: boolean;
	length?: number;
	max?: number;
	min?: number;
	numeric?: boolean;
	required?: boolean;
	trim?: boolean;
	type: FieldType;
	unique?: boolean;
}

export interface AvatarSrc extends NativeModel {
	type: "string";
	max: 800000;
	min: 0;
	required: true;
	defaultValue: "";
	trim: true;
	empty: true;
}

export interface Bio extends NativeModel {
	type: "string";
	max: 255;
	min: 0;
	required: true;
	defaultValue: "";
	trim: true;
	empty: true;
}

export interface Blacklist extends NativeModel {
	type: "array";
	required: true;
	empty: true;
}

export interface Contacts extends NativeModel {
	type: "array";
	required: true;
	empty: true;
}

export interface CountryCode extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 1;
	max: 4;
	numeric: true;
	trim: true;
}

export interface CountryName extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 2;
	max: 50;
	trim: true;
}

export interface CountryShortName extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 2;
	max: 80;
	trim: true;
}

export interface FirstName extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 2;
	max: 18;
	trim: true;
}

export interface IsActive extends NativeModel {
	type: "boolean";
	required: true;
	defaultValue: false;
}

export interface IsOnline extends NativeModel {
	type: "boolean";
	required: true;
	defaultValue: false;
}

export interface LastName extends NativeModel {
	type: "string";
	required: true;
	empty: true;
	min: 2;
	max: 18;
	trim: true;
}

export interface MacAddress extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 12;
	max: 16;
	trim: true;
	unique: true;
}

export interface PhoneNumber extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 10;
	max: 14;
	numeric: true;
	unique: true;
}

export interface Sessions extends NativeModel {
	type: "array";
	required: true;
	empty: true;
}

export interface Status extends NativeModel {
	type: "object";
	required: true;
	defaultValue: object;
}

export interface Username extends NativeModel {
	type: "string";
	required: true;
	empty: true;
	min: 0;
	max: 12;
	unique: false;
	trim: true;
}

export interface VerificationCode extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	length: 6;
	numeric: true;
	trim: true;
}

export interface ChatId extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 30;
	max: 35;
	trim: true;
	unique: true;
}

export interface ClientId extends NativeModel {
	type: "string";
	empty: false;
	required: true;
	min: 100;
	max: 150;
	unique: true;
	trim: true;
}

export interface CreatedAt extends NativeModel {
	type: "number";
	required: true;
	empty: false;
}

export interface MessageId extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	max: 45;
	min: 40;
	trim: true;
	unique: true;
}

export interface Id extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 30;
	max: 35;
	trim: true;
	unique: true;
}

export type UserId = Id;

export interface Messages extends NativeModel {
	type: "array";
	required: true;
	empty: true;
}

export interface MessageText extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 1;
	max: 1000;
	trim: true;
}

export interface Participants extends NativeModel {
	type: "array";
	required: true;
	length: 2;
	empty: false;
}

export interface PrivateChats extends NativeModel {
	type: "array";
	required: true;
}

export interface WelcomeMessage extends NativeModel {
	type: "string";
	required: true;
	empty: false;
	min: 10;
	max: 100;
	trim: true;
}

export interface Pong extends NativeModel {
	type: "number";
	required: true;
	empty: false;
	min: 1;
	max: 10;
	trim: false;
}

export type NativeModelCollection = typeof nativeModels;

export type Field = keyof NativeModelCollection;

export type NativeModelKey = keyof NativeModel;

type AllErrorKeys = {
	[T in keyof NativeModelCollection]: `${T}_${keyof NativeModelCollection[T] &
		string}_error`;
};

export type ModelErrorReason = ScreamingSnakeCase<
	AllErrorKeys[keyof AllErrorKeys] | `${keyof NativeModelCollection}_invalid`
>;

export type ModelPicker<T extends NativeModelKey> = Pick<
	NativeModel,
	Extract<NativeModelKey, T>
>;
