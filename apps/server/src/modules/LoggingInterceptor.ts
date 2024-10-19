import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		console.log("Before handler execution"); // This runs before the handler

		return next
			.handle() // This is where the handler is executed
			.pipe(
				tap(() => console.log("After handler execution")) // This runs after the handler completes
			);
	}
}
