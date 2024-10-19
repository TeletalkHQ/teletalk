import { Module } from "@nestjs/common";

import { WsRateLimitGateway } from "./ws-rate-limit.gateway";

@Module({
	controllers: [],
	exports: [WsRateLimitGateway],
	imports: [],
	providers: [WsRateLimitGateway],
})
export class WsRateLimitModule {}
