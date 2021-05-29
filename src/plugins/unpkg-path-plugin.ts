import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
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
		},
	};
};
