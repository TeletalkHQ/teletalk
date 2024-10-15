import { NestFactory } from "@nestjs/core";

import { AppModule } from "~/modules/app/app.module";

type Class = abstract new (...args: any) => any;

export const getServiceInstance = async <T extends Class>(service: T) => {
	const app = await NestFactory.createApplicationContext(AppModule);
	return app.get(service) as InstanceType<T>;
};
