import { Module } from "@nestjs/common";

import { StuffController } from "./stuff.controller";

@Module({
	controllers: [StuffController],
	providers: [],
})
export class StuffModule {}
