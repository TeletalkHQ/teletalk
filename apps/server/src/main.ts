import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import isNaN from "lodash/isNaN";

import { AppModule } from "~/modules/app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	await app.listen(getPort());
}

const getPort = () => {
	const PORT = Number(process.env.PORT);

	if (isNaN(PORT)) throw Error("UNKNOWN_PORT");

	return PORT;
};

bootstrap();
