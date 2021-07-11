import * as esbuild from 'esbuild-wasm';



export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // Handle root entry file 'index.js' 
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            })

            // habdle relative paths of modules
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href
                }
            })

            // handle main file of a module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
            });


        },
    };
};