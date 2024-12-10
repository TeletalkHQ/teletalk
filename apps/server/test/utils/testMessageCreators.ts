import { IOName } from "@repo/schema";

type ErrorReason = string;

type MiddlewareName = string;
type ServiceName = string;
type ClassName = string;
type UnitTargetName = MiddlewareName | ServiceName | ClassName | `fn${string}`;

type Block = "suite" | "test";
type Type = "e2e" | "unit";
type Status = "success" | "failure";
type Prefix =
	| "event"
	| "httpRoute"
	| "middleware"
	| "service"
	| "function"
	| "class";

const generator = (
	block: Block,
	type: Type,
	status: Status,
	name: UnitTargetName | IOName,
	prefix: Prefix,
	description = "N/A"
) => {
	return `${block}: [type:${type}] [status:${status}] [${prefix}:${name.replace(
		"fn",
		""
	)}] [description:${description}]`;
};

const e2eSuccessSuite = (name: IOName, prefix: Prefix, description?: string) =>
	generator("suite", "e2e", "success", name, prefix, description);

const e2eFailSuite = (name: IOName, prefix: Prefix, description?: string) =>
	generator("suite", "e2e", "failure", name, prefix, description);

const e2eSuccessTest = (name: IOName, prefix: Prefix, description?: string) =>
	generator("test", "e2e", "success", name, prefix, description);

const e2eFailTest = (name: IOName, prefix: Prefix, _reason: ErrorReason) =>
	generator(
		"test",
		"e2e",
		"failure",
		name,
		prefix,
		`expected error reason is ${"errorStore.find(reason).reason"}`
	);

const unitSuccessSuite = (
	name: UnitTargetName,
	prefix: Prefix,
	description?: string
) => generator("suite", "unit", "success", name, prefix, description);

const unitFailSuite = (
	name: UnitTargetName,
	prefix: Prefix,
	description?: string
) => generator("suite", "unit", "failure", name, prefix, description);

const unitSuccessTest = (
	name: UnitTargetName,
	prefix: Prefix,
	description?: string
) => generator("test", "unit", "success", name, prefix, description);

const unitFailTest = (
	name: UnitTargetName,
	prefix: Prefix,
	_reason: ErrorReason
) =>
	generator(
		"test",
		"unit",
		"failure",
		name,
		prefix,
		`expected error reason is ${"errorStore.find(reason).reason"}`
	);

export const messageCreators = {
	e2eFailSuite,
	e2eFailTest,
	e2eSuccessSuite,
	e2eSuccessTest,
	unitFailSuite,
	unitFailTest,
	unitSuccessSuite,
	unitSuccessTest,
};
