import dotenv from "dotenv";
import path from "path";

import { EnvFileName, Environments, NodeEnvValue } from "~/types";

class EnvironmentManager {
	getEnv() {
		return process.env as unknown as Environments;
	}

	getNodeEnv() {
		const e = this.getEnv().NODE_ENV;
		if (e) return e as NodeEnvValue;
		return undefined;
	}

	registerEnvironments(fileName: EnvFileName) {
		dotenv.config({
			path: path.join(
				process.cwd(),
				"environments",
				this.resolveEnvFileName(fileName)
			),
			override: true,
		});
	}

	private resolveEnvFileName(fileName: EnvFileName) {
		return `.env.${fileName}`;
	}
}

export const envManager = new EnvironmentManager();
