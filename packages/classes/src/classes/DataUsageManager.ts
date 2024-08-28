import { BaseSchema } from "@repo/schema";
import { utils } from "@repo/utils";

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
		return this.usedCellphones.some((c) =>
			utils.isDataHasEqualityWithTargetCellphone(c, cellphone)
		);
	}
}

const dataUsageManager = new DataUsageManager();

export { dataUsageManager, DataUsageManager };
