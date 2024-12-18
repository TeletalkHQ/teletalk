import snakeCase from "lodash/snakeCase";
import type { ScreamingSnakeCase } from "type-fest";

export const convertToScreamingSnakeCase = <T extends string>(value: string) =>
	snakeCase(value).toUpperCase() as ScreamingSnakeCase<T>;
