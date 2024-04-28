//CLEANME
// export const validationCheckers = Object.keys(models.native).reduce(
// 	(prevValue, currValue) => {
// 		const fieldName = currValue as Field;
// 		prevValue[fieldName] = (result) => {
// 		if()
// processValidationError(result).process()
// 		};

// 		return prevValue;
// 	},
// 	{} as ValidationCheckerFnCollection
// );

// const {
// 	countryCode: defaultCountryCodeChecker,
// 	countryName: defaultCountryNameChecker,
// } = validationCheckers;

// validationCheckers.countryCode = (result, value) => {
// 	if (result === true) {
// 		const country = countries.find((c) => c.countryCode === value);
// 		if (!country) throw errorStore.find("COUNTRY_CODE_NOT_SUPPORTED");

// 		return;
// 	}

// 	defaultCountryCodeChecker(result, value);
// };

// validationCheckers.countryName = (result, value) => {
// 	if (result === true) {
// 		const country = countries.find((c) => c.countryName === value);
// 		if (!country) throw errorStore.find("COUNTRY_NAME_NOT_SUPPORTED");

// 		return;
// 	}

// 	defaultCountryNameChecker(result, value);
// };

// const notImplementedCheckerFn = (fieldName: Field) =>
// 	(() => {
// 		throw `${fieldName}ValidationChecker is not implemented`;
// 	}) as ValidationCheckerFn;

// validationCheckers.id = notImplementedCheckerFn("id");
// validationCheckers.createdAt = notImplementedCheckerFn("createdAt");
// validationCheckers.isActive = notImplementedCheckerFn("isActive");
// validationCheckers.macAddress = notImplementedCheckerFn("macAddress");
// validationCheckers.messageId = notImplementedCheckerFn("messageId");
// validationCheckers.senderId = notImplementedCheckerFn("senderId");
