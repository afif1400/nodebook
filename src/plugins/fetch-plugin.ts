import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

//? this onLoad function overrides the default esbuild's onLoad  which is
//? used to fetch modules from unpkg.com

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /(^index\.js$)/ }, (): esbuild.OnLoadResult => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				//* Check to see if we have already fetched a file before
				//* and is present in the cache
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				//* If present, return it immediately
				if (cachedResult) {
					return cachedResult;
				}
			});

			//? onLoad for CSS files
			build.onLoad(
				{ filter: /.css$/ },
				async (args: any): Promise<esbuild.OnLoadResult> => {
					const { data, request } = await axios.get(args.path);

					const escapedCSS = data
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'");
					const contents = `
          const style = document.createElement('style');
          style.innerText = '${escapedCSS}';
          document.head.appendChild(style)
          `;

					const result: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents,
						resolveDir: new URL('./', request.responseURL).pathname,
					};
					//* store response in the cache
					await fileCache.setItem(args.path, result);

					return result;
				}
			);

			//? onLoad for javascript files
			build.onLoad(
				{ filter: /.*/ },
				async (args: any): Promise<esbuild.OnLoadResult> => {
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
