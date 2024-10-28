export const isIos = () => {
	return (
		typeof navigator !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent)
	);
};

export const convertFileToBase64 = (file: File | Blob) => {
	return new Promise((resolve, reject) => {
		if (file) {
			const Reader = new FileReader();
			Reader.readAsDataURL(file);
			Reader.onloadend = () => {
				resolve(Reader.result);
			};
			Reader.onerror = reject;
		}
	});
};
