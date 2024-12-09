import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import type { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
	canActivate(
		_context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return true;
	}
}
