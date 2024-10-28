import { Module } from "@nestjs/common";

import { StuffModule } from "./stuff/stuff.module";

@Module({
	imports: [StuffModule],
	providers: [],
})
export class HTTPModule {}
