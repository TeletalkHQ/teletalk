import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import {
	HTTPRequestBody,
	HTTPResponse,
	IOName,
	httpRoutes,
} from "@repo/schema";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ZodSchema } from "zod";

import {
	ErrorReason,
	ErrorStoreService,
} from "../error-store/error-store.service";

type HttpHandlerReturnData = Awaited<HTTPResponse<IOName>>;
type HttpHandlerInputData = HTTPRequestBody<IOName>;

@Injectable()
export class AppInterceptor implements NestInterceptor {
	constructor(private errorStoreService: ErrorStoreService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request: Request = context.switchToHttp().getRequest();

		const routeSchema = this.getRouteSchema(request.url);

		const inputData: HttpHandlerInputData = request.body;

		this.validateData(
			routeSchema.schema.io.input,
			inputData,
			"INPUT_DATA_INVALID"
		);

		return next.handle().pipe(
			map(({ data }: HttpHandlerReturnData) => {
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
		const routeSchema = httpRoutes.find((item) => {
			const fullPath = `/${item.schema.rootPath}/${item.schema.pathname}`;

			return url === fullPath;
		});

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
