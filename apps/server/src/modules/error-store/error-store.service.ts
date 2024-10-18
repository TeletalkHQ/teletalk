import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";

export type ErrorReason =
	| "USER_NOT_FOUND"
	| "SESSION_NOT_FOUND"
	| "SIGN_IN_CODE_INVALID"
	| "ROUTE_SCHEMA_NOT_FOUND"
	| "USER_BY_SESSION_ID_NOT_FOUND"
	| "SESSION_NOT_FOUND_BY_SESSION_ID"
	| "COOKIES_NOT_FOUND"
	| "INVALID_HOST"
	| "SESSION_NOT_VERIFIED"
	| "STORED_SESSION_NOT_FOUND"
	| "USER_INFO_NOT_FOUND";

export const errorTypes = {
	badRequest: BadRequestException,
	internal: InternalServerErrorException,
	notFound: NotFoundException,
	unauthorized: UnauthorizedException,
};

export type ErrorType = keyof typeof errorTypes;

interface Options {
	shouldLogError?: boolean;
}

@Injectable()
export class ErrorStoreService {
	private logger = new Logger(ErrorStoreService.name);

	private options: Options = {
		shouldLogError: true,
	};

	throw(
		type: ErrorType,
		reason: ErrorReason,
		ctxName: string,
		options = this.options
	): never {
		const ErrorClass = errorTypes[type];

		this.handleLogs(type, reason, ctxName, options);

		throw new ErrorClass(reason);
	}

	private handleLogs(
		type: ErrorType,
		reason: ErrorReason,
		ctxName: string,
		options = this.options
	) {
		const { shouldLogError } = this.mergeOptions(options);

		if (shouldLogError)
			this.logger.error({
				type,
				reason,
				ctxName,
			});
	}

	private mergeOptions(newOptions: Options) {
		return {
			...this.options,
			...newOptions,
		};
	}
}
