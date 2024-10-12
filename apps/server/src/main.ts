import { NestFactory } from "@nestjs/core";
import isNaN from "lodash/isNaN";

import { AppModule } from "~/modules/app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	await app.listen(getPort());
}

const getPort = () => {
	const PORT = Number(process.env.PORT);

	if (isNaN(PORT)) throw Error("UNKNOWN_PORT");

	return PORT;
};

bootstrap();
