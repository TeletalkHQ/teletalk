import MainCompressor from "compressorjs";

export class Compressor extends MainCompressor {}

export type CompressorOptions = Compressor.Options & {
	convertSize?: number;
	maxHeight?: number;
	maxWidth?: number;
	mimeType?: "png" | "jpg";
};

export const compressor = (file: File | Blob, options: CompressorOptions) =>
	new Compressor(file, {
		...defaultOptions,
		...options,
	});

const defaultOptions: Partial<CompressorOptions> = {
	convertSize: 0.5,
	maxHeight: 350,
	maxWidth: 350,
	mimeType: "png",
} as const;
