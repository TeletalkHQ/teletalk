import { type BaseSchema } from "@repo/schema";
import isEqual from "lodash/isEqual";

class DataUsageManager {
	private usedCellphones: BaseSchema.Cellphone[];

	constructor() {
		this.usedCellphones = [];
	}

	addUsedCellphone(cellphone: BaseSchema.Cellphone) {
		this.usedCellphones.push(cellphone);
		return this;
	}

	isCellphoneUsed(cellphone: BaseSchema.Cellphone) {
		return this.usedCellphones.some((c) => isEqual(c, cellphone));
	}
}

const dataUsageManager = new DataUsageManager();

export { dataUsageManager, DataUsageManager };
