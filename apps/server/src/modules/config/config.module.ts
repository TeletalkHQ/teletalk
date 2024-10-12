import { Module } from "@nestjs/common";

import { EnvModule } from "../env/env.module";
import { ConfigService } from "./config.service";

@Module({
	imports: [EnvModule],
	exports: [ConfigService],
	providers: [ConfigService],
})
export class ConfigModule {}
