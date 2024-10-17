import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { getFullPath } from "@repo/schema";

import { SessionModule } from "../session/session.module";
import { SmsModule } from "../sms/sms.module";
import { TempSessionStoreModule } from "../temp-session-store/temp-session-store.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthIdMiddleware } from "./auth.middleware";
import { AuthService } from "./auth.service";

@Module({
	imports: [TempSessionStoreModule, SessionModule, SmsModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthIdMiddleware).forRoutes(`${getFullPath("verify")}`);
	}
}
