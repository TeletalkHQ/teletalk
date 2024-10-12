import { Module } from "@nestjs/common";

import { StoreModule } from "../store/store.module";
import { StoreService } from "../store/store.service";
import { SessionStoreService } from "./session-store.service";

@Module({
	imports: [StoreModule],
	exports: [SessionStoreService],
	providers: [SessionStoreService],
})
export class SessionStoreModule {}
