import createCache from "@emotion/cache";
import type {
	EmotionCache,
	Options as OptionsOfCreateCache,
} from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import React, { Fragment, useState } from "react";

type NextAppDirEmotionCacheProviderProps = {
	options: Omit<OptionsOfCreateCache, "insertionPoint">;

	CacheProvider?: (props: {
		value: EmotionCache;
		children: React.ReactNode;
	}) => React.JSX.Element | null;
	children: React.ReactNode;
};

export function EmotionCacheProvider(
	props: NextAppDirEmotionCacheProviderProps
) {
	const { options, CacheProvider = DefaultCacheProvider, children } = props;

	const [registry] = useState(() => {
		const cache = createCache(options);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: { name: string; isGlobal: boolean }[] = [];
		cache.insert = (...args) => {
			const [selector, serialized] = args;
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push({
					name: serialized.name,
					isGlobal: !selector,
				});
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const inserted = registry.flush();
		if (inserted.length === 0) {
			return null;
		}
		let styles = "";
		let dataEmotionAttribute = registry.cache.key;

		const globals: {
			name: string;
			style: string;
		}[] = [];

		inserted.forEach(({ name, isGlobal }) => {
			const style = registry.cache.inserted[name];

			if (typeof style === "string") {
				if (isGlobal) {
					globals.push({ name, style });
				} else {
					styles += style;
					dataEmotionAttribute += ` ${name}`;
				}
			}
		});

		return (
			<Fragment>
				{globals.map(({ name, style }) => (
					<style
						key={name}
						dangerouslySetInnerHTML={{ __html: style }}
						data-emotion={`${registry.cache.key}-global ${name}`}
					/>
				))}
				{styles && (
					<style
						dangerouslySetInnerHTML={{ __html: styles }}
						data-emotion={dataEmotionAttribute}
					/>
				)}
			</Fragment>
		);
	});

	return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
