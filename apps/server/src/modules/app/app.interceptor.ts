import type {
	CallHandler,
	ExecutionContext,
	NestInterceptor } from "@nestjs/common";
import {
	Injectable
} from "@nestjs/common";
import type {
	HTTPRequestBody,
	HTTPResponse } from "@repo/schema";
import {
	findHttpRouteByUrl,
} from "@repo/schema";
import type { Request, Response } from "express";
import type { Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { ZodSchema } from "zod";

import type {
	ErrorReason,
	ErrorStoreService,
} from "../error-store/error-store.service";

@Injectable()
export class AppInterceptor implements NestInterceptor {
	constructor(private errorStoreService: ErrorStoreService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request: Request = context.switchToHttp().getRequest();

		const routeSchema = this.getRouteSchema(request.url);

		const inputData: HTTPRequestBody = request.body;

		this.validateData(
			routeSchema.schema.io.input,
			inputData,
			"INPUT_DATA_INVALID"
		);

		return next.handle().pipe(
			map(({ data }: Awaited<HTTPResponse>) => {
				const response: Response = context.switchToHttp().getResponse();
				response.statusCode = routeSchema.schema.statusCode;

				const parsedData = this.validateData(
					routeSchema.schema.io.output,
					data,
					"OUTPUT_DATA_INVALID"
				);

				return {
					data: parsedData,
				};
			})
		);
	}

	getRouteSchema(url: string) {
		const routeSchema = findHttpRouteByUrl(url);

		if (!routeSchema)
			this.errorStoreService.throw(
				"internal",
				"ROUTE_SCHEMA_NOT_FOUND",
				AppInterceptor.name
			);

		return routeSchema;
	}

	validateData(schema: ZodSchema, data: unknown, errorReason: ErrorReason) {
		try {
			return schema.parse(data);
		} catch {
			this.errorStoreService.throw(
				"badRequest",
				errorReason,
				AppInterceptor.name
			);
		}
	}
}
