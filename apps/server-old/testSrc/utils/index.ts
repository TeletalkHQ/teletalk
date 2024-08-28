import { faker } from "@faker-js/faker";
import { ErrorReason, NativeError } from "@repo/error-store";
import { Field, models } from "@repo/model";
import { countries } from "@repo/vars";
import chai from "chai";
import { ValidationSchema } from "fastest-validator";

import { configManager } from "~/classes/ConfigManager";
import { utils as mainUtils } from "~/utils";

import { randomMaker } from "@/classes/RandomMaker";
import { mergedServices } from "@/services";
import { ServiceName } from "@/types";

import {
	requesterCollection,
	requesterMakerHelper,
	setupRequester,
} from "./requesterCollection";
import { createTestMessage } from "./testMessageCreators";

type DescribeArgs = [title: string, suite: () => () => void];
type AsyncDescribeArgs = [title: string, suite: () => Promise<() => void>];

async function asyncDescribe(...args: AsyncDescribeArgs) {
	const [title, suite] = args;

	const describeBody = await suite();

	try {
		describe(title, describeBody);
	} catch (error) {
		mainUtils.crashServer(error);
	}
}

const getWrongCountryCode = (): string => {
	const randomCountryCode = randomMaker.stringNumber(
		models.native.countryCode.max
	);

	const isCountryExist = countries.some(
		(c) => c.countryCode === randomCountryCode
	);

	if (isCountryExist) return getWrongCountryCode();

	return randomCountryCode;
};

function generateDynamicData(
	schema: ValidationSchema
): Record<string, unknown> {
	const data: Record<string, unknown> = {};

	Object.entries(schema).forEach(([fieldName, field]) => {
		const FIELD_NAME = fieldName as Field;
		const fieldModel = models.native[FIELD_NAME];

		switch (field.type) {
			case "string":
				if (FIELD_NAME === "countryCode") {
					data[fieldName] = randomMaker.country().countryCode;
					break;
				}
				if (FIELD_NAME === "countryName") {
					data[fieldName] = randomMaker.country().countryName;
					break;
				}
				if (FIELD_NAME === "phoneNumber") {
					// @ts-ignore
					data[fieldName] = randomMaker.stringNumber(fieldModel.max);
					break;
				}

				data[fieldName] = faker.string.sample(
					// @ts-ignore
					fieldModel.min,
					// @ts-ignore
					fieldModel.max
				);
				break;
			// case "number":
			//   data[fieldName] = faker.datatype.number();
			// break;
			case "boolean":
				data[fieldName] = faker.datatype.boolean();
				break;
			case "object":
				data[fieldName] = generateDynamicData(field.value as ValidationSchema);
				break;
			// case "array":
			//   const fieldArr = Array.isArray(field)
			//     ? field
			//     : [field];
			//   data[fieldName] = fieldArr.map((item) => {
			//     if (typeof item === "string") {
			//       if (fieldName === "countryCode" || fieldName === "phoneNumber") {
			//         return faker.datatype
			//           .number(fieldModel.maxLength)
			//           .toString();
			//       }
			//       return faker.datatype.string(fieldModel.maxLength);
			//     }
			//     // else if (typeof item === "number") {
			//     //   return faker.datatype.number();
			//     // }
			//     else if (typeof item === "boolean") {
			//       return faker.datatype.boolean();
			//     } else if (typeof item === "object") {
			//       return generateDynamicData(item as IoFields);
			//     }
			//     return undefined;
			//   });
			//   break;
			default:
				data[fieldName] = null;
				break;
		}
	});

	return data;
}

const isJestRunning = () => configManager.getConfigs().TEST.RUNNER === "JEST";

const jestDescribe = (...args: DescribeArgs) =>
	isJestRunning() && describe(...args);

const asyncJestDescribe = async (...args: AsyncDescribeArgs) =>
	isJestRunning() && asyncDescribe(...args);

const expectToFail_async = async (
	cb: () => Promise<void>,
	expectedErrorReason: ErrorReason
) => {
	try {
		await cb();
	} catch (error) {
		const e = error as unknown as NativeError;

		chai.expect(e.reason).to.be.equal(expectedErrorReason);
	}
};

const generateServiceFailTest = async <T extends ServiceName>(
	serviceName: T,
	errorReason: ErrorReason,
	arg:
		| Parameters<(typeof mergedServices)[T]>[0]
		| (() =>
				| Parameters<(typeof mergedServices)[T]>[0]
				| Promise<Parameters<(typeof mergedServices)[T]>[0]>)
) => {
	await asyncDescribe(
		utils.createTestMessage.unitFailDescribe(serviceName, "service"),
		async () => {
			return () => {
				it(
					utils.createTestMessage.unitFailTest(
						serviceName,
						"service",
						errorReason
					),
					async () => {
						await utils.expectToFail_async(async () => {
							const data = typeof arg === "function" ? await arg() : arg;

							await mergedServices[serviceName](data as any);
						}, errorReason);
					}
				);
			};
		}
	);
};

export const utils = {
	asyncDescribe,
	asyncJestDescribe,
	createTestMessage,
	expectToFail_async,
	generateDynamicData,
	generateServiceFailTest,
	getWrongCountryCode,
	jestDescribe,
	requesterCollection,
	requesterMakerHelper,
	setupRequester,
};
