import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
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

					const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

					const result: esbuild.OnLoadResult = {
						loader,
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
