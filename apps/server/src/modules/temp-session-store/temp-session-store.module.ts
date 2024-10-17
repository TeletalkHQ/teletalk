import { Module } from "@nestjs/common";

import { StoreModule } from "../store/store.module";
import { TempSessionStoreService } from "./temp-session-store.service";

@Module({
	imports: [StoreModule],
	exports: [TempSessionStoreService],
	providers: [TempSessionStoreService],
})
export class TempSessionStoreModule {}
