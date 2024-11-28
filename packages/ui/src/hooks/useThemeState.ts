import { BaseSchema } from "@repo/schema";
import { STORAGE_KEY } from "@repo/types";
import { useIsomorphicLayoutEffect, useLocalStorage } from "usehooks-ts";

export const useThemeState = () => {
	// const {
	// 	mutations: { updateSettings },
	// 	data: { userInfo },
	// } = useUserInfo();

	const [theme, setTheme] = useLocalStorage<BaseSchema.ThemeName>(
		STORAGE_KEY.THEME,
		"dark"
	);

	const updateTheme = (theme: BaseSchema.ThemeName) => {
		setTheme(theme);

		// updateSettings.mutate({
		// 	data: {
		// 		settings: {
		// 			theme,
		// 		},
		// 	},
		// });
	};

	// const finalTheme = userInfo.settings.theme || theme;

	// const isDarkTheme = finalTheme === "dark" || finalTheme === "monochromeDark";

	useIsomorphicLayoutEffect(() => {
		// if (userInfo.settings.theme && userInfo.settings.theme !== theme)
		// 	setTheme(userInfo.settings.theme);
	}, [
		setTheme,
		theme,
		// userInfo.settings.theme
	]);

	return {
		updateTheme,
		theme: "dark" as BaseSchema.ThemeName,
		isDarkTheme: false,
	};
};
