import { Head, Html, Main, NextScript } from "next/document";

// eslint-disable-next-line import/no-unused-modules
export default function Document() {
	return (
		<Html data-theme="light" lang="en">
			<Head>
				<link href="/icons/favicon.ico" rel="icon" type="image/x-icon" />
				<meta content="website" name="og:type" />
				<meta content="Messenger" name="og:title" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
