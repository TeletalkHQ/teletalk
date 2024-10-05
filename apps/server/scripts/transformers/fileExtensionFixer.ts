import type { PluginConfig, TransformerExtras } from "ts-patch";
import ts from "typescript";

export default function Transformer(
	_program: ts.Program,
	_pluginConfig: PluginConfig,
	{ ts: tsInstance }: TransformerExtras
) {
	return function fileExtensionFixer(context: ts.TransformationContext) {
		return (sourceFile: ts.SourceFile) => {
			function visitor(node: ts.Node): ts.Node {
				if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
					if (
						node.moduleSpecifier &&
						ts.isStringLiteral(node.moduleSpecifier)
					) {
						const moduleText = node.moduleSpecifier.text;
						const updatedModuleSpecifier =
							tsInstance.factory.createStringLiteral(
								moduleText.endsWith(".js") ||
									moduleText.startsWith("./") ||
									moduleText.startsWith("../")
									? moduleText
									: `${moduleText}.js`
							);
						if (ts.isImportDeclaration(node)) {
							return tsInstance.factory.updateImportDeclaration(
								node,
								node.modifiers,
								node.importClause,
								updatedModuleSpecifier,
								node.assertClause
							);
						} else {
							return tsInstance.factory.updateExportDeclaration(
								node,
								node.modifiers,
								node.isTypeOnly,
								node.exportClause,
								updatedModuleSpecifier,
								node.assertClause
							);
						}
					}
				}
				return tsInstance.visitEachChild(node, visitor, context);
			}
			return ts.visitNode(sourceFile, visitor);
			return sourceFile;
		};
	};
}
