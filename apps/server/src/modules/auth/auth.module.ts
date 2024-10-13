import { Module } from "@nestjs/common";

import { SessionStoreModule } from "../session-store/session-store.module";
import { SessionModule } from "../session/session.module";
import { SmsModule } from "../sms/sms.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [SessionStoreModule, SessionModule, SmsModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
