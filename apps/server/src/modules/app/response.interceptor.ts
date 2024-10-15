import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from "@nestjs/common";
import { IOName, RouteGenerator, httpRoutes } from "@repo/schema";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { GetAPIOutput } from "~/types";

type Data = Awaited<GetAPIOutput<IOName>>;

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data: Data) => {
				const requestObj: Request = context.switchToHttp().getRequest();
				const responseObj: Response = context.switchToHttp().getResponse();
				const routeSchema = this.getRouteSchema(requestObj);

				this.setResponseStatusCode(responseObj, routeSchema);
				const parsedData = this.parseOutput(routeSchema, data);

				return {
					data: parsedData,
				};
			})
		);
	}

	getRouteSchema(requestObj: Request) {
		const routeSchema = httpRoutes.find((item) => {
			const fullPath = `/${item.schema.rootPath}/${item.schema.pathname}`;

			return requestObj.url === fullPath;
		});

		if (!routeSchema) throw new InternalServerErrorException();

		return routeSchema;
	}

	setResponseStatusCode(
		responseObj: Response,
		routeSchema: RouteGenerator<any>
	) {
		responseObj.statusCode = routeSchema.schema.statusCode;
	}

	parseOutput(routeSchema: RouteGenerator<IOName>, data: Data) {
		return routeSchema.schema.io.output.parse(data.data);
	}
}
