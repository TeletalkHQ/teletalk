import { BaseSchema } from "@repo/schema";
import { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import Client from "socket.io-client";

import { ConfigService } from "~/modules/config/config.service";

import { getServiceInstance } from "@/utils/app";

const configService = await getServiceInstance(ConfigService);

export class ClientInitializer {
	private client: Socket;

	constructor(session: BaseSchema.EncryptedSession) {
		this.initClient(session);
	}

	async initClient(session: BaseSchema.EncryptedSession) {
		this.client = Client(this.getUrl(), this.makeClientSocketOptions(session));
		return this;
	}

	reinitializeClient(session: BaseSchema.EncryptedSession) {
		this.initClient(session);
		this.client.disconnect();
		this.client.connect();
	}

	private getUrl() {
		const {
			APP: { PORT, HOSTNAME },
		} = configService.getConfigs();
		return `http://${HOSTNAME}:${PORT}`;
	}

	private makeClientSocketOptions(session: string) {
		const options: Partial<ManagerOptions & SocketOptions> = {
			autoConnect: true,
			auth: {
				session,
			},
		};

		return options;
	}

	connect() {
		this.client.connect();
		return this;
	}

	getClient() {
		// TODO: Remove assertion
		return this.client as Socket;
	}
}

export const clientInitializer = (session: BaseSchema.EncryptedSession) =>
	new ClientInitializer(session);
