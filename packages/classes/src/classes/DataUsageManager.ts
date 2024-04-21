import { Cellphone } from "@repo/type-store";
import { utils } from "@repo/utility-store";

class DataUsageManager {
	private usedCellphones: Cellphone[];

	constructor() {
		this.usedCellphones = [];
	}

	addUsedCellphone(cellphone: Cellphone) {
		this.usedCellphones.push(cellphone);
		return this;
	}

	isCellphoneUsed(cellphone: Cellphone) {
		return this.usedCellphones.some((c) =>
			utils.isDataHasEqualityWithTargetCellphone(c, cellphone)
		);
	}
}

const dataUsageManager = new DataUsageManager();

export { dataUsageManager, DataUsageManager };
