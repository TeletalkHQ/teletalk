import { RootLayout } from "@repo/ui/layouts/root";
import { webThemes } from "@repo/ui/themes/web";
import localFont from "next/font/local";

import "./globals.css";
import { DialogContainer } from "./portal/dialog";

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// };

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<RootLayout
					appName="web"
					forceThemeName="dark"
					shouldShowQueryDevtools
					shouldUseBaseline
					themes={webThemes}
				>
					<DialogContainer />
					{children}
				</RootLayout>
			</body>
		</html>
	);
}
