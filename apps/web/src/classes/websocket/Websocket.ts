import io, { Socket } from "socket.io-client";
import { EncryptedSession } from "teletalk-type-store";

import { appConfigs } from "~/classes/AppConfigs";

import { storage } from "../Storage";

interface Options {
  url: string;
}

export class Websocket {
  client: Socket = this.initialize();

  setAndInitialize(options = this.getDefaultOptions()) {
    this.setClient(this.initialize(options));
  }

  initialize(options = this.getDefaultOptions()) {
    return io(options.url, {
      autoConnect: false,
      auth: {
        session: storage.get("session"),
      },
    });
  }
  getDefaultOptions() {
    return {
      url: appConfigs.getConfigs().api.selectedServerUrl,
    } as Options;
  }

  setClient(client: Socket) {
    this.client = client;
  }

  updateSession(session: EncryptedSession) {
    this.client.disconnect();
    this.client.auth = {
      ...this.client.auth,
      session,
    };
    this.client.connect();
  }
}

export const websocket = new Websocket();
