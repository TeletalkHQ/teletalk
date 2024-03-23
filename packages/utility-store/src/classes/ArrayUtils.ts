class ArrayUtils {
	createRange(start: number, stop: number, step: number) {
		return Array.from(
			{ length: (stop - start) / step + 1 },
			(_value, index) => start + index * step
		);
	}
}

const arrayUtils = new ArrayUtils();

export { arrayUtils, ArrayUtils };
