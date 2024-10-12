import { Module } from "@nestjs/common";

import { SessionStoreModule } from "../session-store/session-store.module";
import { SessionModule } from "../session/session.module";
import { SmsClientModule } from "../sms-client/sms-client.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [SessionStoreModule, SessionModule, SmsClientModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
