import { Module } from "@nestjs/common";

import { ServerInfoController } from "./serverInfo.controller";

@Module({
	controllers: [ServerInfoController],
})
export class ServerInfoModule {}
