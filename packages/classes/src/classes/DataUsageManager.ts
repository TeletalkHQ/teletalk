import { BaseSchema } from "@repo/schema";
import { isDataHasEqualityWithTargetCellphone } from "@repo/utils";

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
			isDataHasEqualityWithTargetCellphone(c, cellphone)
		);
	}
}

const dataUsageManager = new DataUsageManager();

export { dataUsageManager, DataUsageManager };
