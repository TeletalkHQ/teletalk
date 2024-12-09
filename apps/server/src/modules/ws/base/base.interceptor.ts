import type {
	CallHandler,
	ExecutionContext,
	NestInterceptor } from "@nestjs/common";
import {
	Injectable,
	InternalServerErrorException,
	Logger
} from "@nestjs/common";
import type {
	EventName,
	SocketHandlerReturnType,
	SocketRequestBody,
	SocketResponse } from "@repo/schema";
import {
	socketEvents,
} from "@repo/schema";
import type { Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { ZodSchema } from "zod";

import type {
	ErrorReason,
	ErrorStoreService,
} from "../../error-store/error-store.service";

@Injectable()
export class BaseInterceptor implements NestInterceptor {
	private logger = new Logger(BaseInterceptor.name);

	constructor(private errorStoreService: ErrorStoreService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// TODO: Remove `assertion`
		const eventName = context.switchToWs().getPattern() as EventName;

		const body: SocketRequestBody<any> = context.switchToWs().getData();

		// this.logger.log("body.data:", body.data);
		// this.logger.log("eventName:", { eventName });

		this.validateData(
			this.getEventSchema(eventName).schema.io.input,
			body.data,
			"INPUT_DATA_INVALID"
		);

		return next.handle().pipe(
			map((dataFromHandler: SocketHandlerReturnType) => {
				this.validateData(
					this.getEventSchema(eventName).schema.io.output,
					dataFromHandler.data,
					"OUTPUT_DATA_INVALID"
				);

				const response: SocketResponse = {
					data: dataFromHandler.data,
					errors: [],
					eventName,
					ok: true,
				};

				return response;
			})
		);
	}

	getEventSchema(eventName: string) {
		if (eventName in socketEvents) {
			return socketEvents[eventName as EventName];
		}

		throw new InternalServerErrorException("EVENT_SCHEMA_NOT_FOUND");
	}

	validateData(schema: ZodSchema, data: unknown, errorReason: ErrorReason) {
		try {
			return schema.parse(data);
		} catch (error) {
			this.logger.log(this.validateData.name, "error:", error);

			this.errorStoreService.throw(
				"badRequest",
				errorReason,
				BaseInterceptor.name
			);
		}
	}
}
