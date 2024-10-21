import { build } from "esbuild";

build({
	allowOverwrite: true,
	banner: {
		js: `
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        `,
	},
	bundle: true,
	entryPoints: ["src/index.ts"],
	format: "esm",
	minify: false,
	outfile: "build/app.mjs",
	platform: "node",
	sourcemap: false,
	target: "esnext",
	tsconfig: "tsconfig.json",
});
