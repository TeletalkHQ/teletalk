import io, { Socket } from "socket.io-client";

interface Options {
	autoConnect?: boolean;
	url: string;
	withCredentials?: boolean;
}

export class SocketInitializer {
	client: Socket;

	constructor(options: Options) {
		this.client = this.initialize(options);
	}

	initialize({ url, ...rest }: Options) {
		return io(url, {
			autoConnect: false,
			withCredentials: true,
			...rest,
		});
	}
}
