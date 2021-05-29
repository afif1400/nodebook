import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//* different onResolve to handle different path
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' };
			});

			//? this below function overrides the default esbuild onResolve which is
			//? used to resolve path's of modules to fetch from unpkg.com
			build.onResolve({ filter: /^\.+\// }, (args) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				};
			});

			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				};
			});

			//? this below function overrides the default esbuild's onLoad  which is
			//? used to fetch modules from unpkg.com
			build.onLoad(
				{ filter: /.*/ },
				async (args: any): Promise<esbuild.OnLoadResult> => {
					console.log('onLoad', args);

					if (args.path === 'index.js') {
						return {
							loader: 'jsx',
							contents: inputCode,
						};
					}

					//* Check to see if we have already fetched a file before
					//* and is present in the cache
					const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
						args.path
					);

					//* If present, return it immediately
					if (cachedResult) {
						return cachedResult;
					}

					const { data, request } = await axios.get(args.path);

					const result: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents: data,
						resolveDir: new URL('./', request.responseURL).pathname,
					};
					//* store response in the cache
					await fileCache.setItem(args.path, result);

					return result;
				}
			);
		},
	};
};
