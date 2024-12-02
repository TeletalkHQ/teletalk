import snakeCase from "lodash/snakeCase";
import { ScreamingSnakeCase } from "type-fest";

export const convertToScreamingSnakeCase = <T extends string>(value: string) =>
	snakeCase(value).toUpperCase() as ScreamingSnakeCase<T>;

export * from "./decorators";
