import { NestMiddleware } from "@nestjs/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		next();
	}
}
