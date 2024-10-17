import { Global, Module } from "@nestjs/common";

import { ErrorStoreService } from "./error-store.service";

@Global()
@Module({
	providers: [ErrorStoreService],
	exports: [ErrorStoreService],
})
export class ErrorStoreModule {}
