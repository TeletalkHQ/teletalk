import { Module } from "@nestjs/common";

import { ServerInfoModule } from "./serverInfo/serverInfo.module";
import { StuffModule } from "./stuff/stuff.module";

@Module({
	imports: [StuffModule, ServerInfoModule],
	providers: [],
})
export class HTTPModule {}
