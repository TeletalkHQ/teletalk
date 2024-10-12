import { InternalServerErrorException } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import isString from "lodash/isString";
import { RedisClientType } from "redis";

import { STORE_KEY } from "./store.constants";

@Injectable()
export class StoreService {
	protected STATE_KEY = "default";
	protected STATE_PATH = ".";

	constructor(
		@Inject(STORE_KEY)
		private storage: RedisClientType
	) {}

	getStorage() {
		return this.storage;
	}
	setStorage(storage: RedisClientType) {
		this.storage = storage;
	}

	setStoreKey(key: string) {
		this.STATE_KEY = key;
	}

	private makeStateKey(id: string) {
		return `${this.STATE_KEY}:${id}`;
	}

	async find(id: string) {
		const session = await this.storage.json.get(this.makeStateKey(id));

		if (!isString(session)) throw new InternalServerErrorException();

		return session ? JSON.parse(session as string) : null;
	}

	async add(id: string, data: unknown) {
		const stateKey = this.makeStateKey(id);
		await this.storage
			.multi()
			.json.set(stateKey, this.STATE_PATH, JSON.stringify(data))
			.exec();
	}

	async update(id: string, newData: unknown) {
		await this.storage.json.set(
			this.makeStateKey(id),
			this.STATE_PATH,
			JSON.stringify(newData)
		);
	}

	async getKeys<T>(pattern?: string) {
		return (await this.storage.keys(pattern || `${this.STATE_KEY}:*`)) as T[];
	}

	async remove(id: string) {
		this.storage.json.del(this.makeStateKey(id), this.STATE_PATH);
	}

	async removeAll() {
		const keys = await this.getKeys<string>();
		for (const id of keys) {
			await this.remove(id.replace(`${this.STATE_KEY}:`, ""));
		}
	}

	async isExist(id: string) {
		return !!this.find(id);
	}

	async validate(key: string, value: string): Promise<boolean> {
		const storedValue = await this.storage.get(key);
		return storedValue === value;
	}
}
