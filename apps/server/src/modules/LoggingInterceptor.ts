import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private logger = new Logger(LoggingInterceptor.name);
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		this.logger.log("Before handler execution"); // This runs before the handler

		return next
			.handle() // This is where the handler is executed
			.pipe(
				tap(() => this.logger.log("After handler execution")) // This runs after the handler completes
			);
	}
}
