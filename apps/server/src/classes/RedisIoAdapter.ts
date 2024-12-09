import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import type { CorsOptions } from "cors";
import { createClient } from "redis";
import type { ServerOptions } from "socket.io";

export class RedisIoAdapter extends IoAdapter {
	private adapterConstructor: ReturnType<typeof createAdapter>;

	async connectToRedis(): Promise<void> {
		const pubClient = createClient({
			// TODO: Use config service
			url: "redis://localhost:6379",
		});
		const subClient = pubClient.duplicate();

		await Promise.all([pubClient.connect(), subClient.connect()]);

		this.adapterConstructor = createAdapter(pubClient, subClient);
	}

	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, {
			...options,
			cors: {
				credentials: true,
				origin: true,
			} satisfies CorsOptions,
		});
		server.adapter(this.adapterConstructor);
		return server;
	}
}
