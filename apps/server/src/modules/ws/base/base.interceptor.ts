import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from "@nestjs/common";
import {
	EventName,
	SocketHandlerReturnType,
	SocketRequestBody,
	SocketResponse,
	socketEvents,
} from "@repo/schema";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ZodSchema } from "zod";

import {
	ErrorReason,
	ErrorStoreService,
} from "../../error-store/error-store.service";

@Injectable()
export class BaseInterceptor implements NestInterceptor {
	constructor(private errorStoreService: ErrorStoreService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const eventName = context.switchToWs().getPattern() as EventName;

		const body: SocketRequestBody<any> = context.switchToWs().getData();

		this.validateData(
			this.getEventSchema(eventName).schema.io.input,
			body.data,
			"INPUT_DATA_INVALID"
		);

		return next.handle().pipe(
			map((dataFromHandler: SocketHandlerReturnType<EventName>) => {
				this.validateData(
					this.getEventSchema(eventName).schema.io.output,
					dataFromHandler.data,
					"OUTPUT_DATA_INVALID"
				);

				const response: SocketResponse<EventName> = {
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
		const foundEvent = socketEvents.find(
			(item) => item.schema.ioName === eventName
		);
		if (!foundEvent)
			throw new InternalServerErrorException("EVENT_SCHEMA_NOT_FOUND");

		return foundEvent;
	}

	validateData(schema: ZodSchema, data: unknown, errorReason: ErrorReason) {
		try {
			return schema.parse(data);
		} catch {
			this.errorStoreService.throw(
				"badRequest",
				errorReason,
				BaseInterceptor.name
			);
		}
	}
}
