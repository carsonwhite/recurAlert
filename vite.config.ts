import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';


const plugins = [
	svelte(),
	viteStaticCopy({
		targets: [
			{
				src: 'manifest.json',
				dest: ''
			},
			{
				src: 'static/icon_48.png',
				dest: 'static'
			},
			{
				src: 'static/icon_128.png',
				dest: 'static'
			},
		]
	}),
];

export default defineConfig(() => {

	return {
		plugins,
		build: {
			rollupOptions: {
				input: {
					popup: resolve(__dirname, 'src/popup/popup.html'),
					background: resolve(__dirname, 'src/background/background.ts'),
				},
				output: {
					entryFileNames: '[name].js',
					chunkFileNames: '[name].js',
					assetFileNames: '[name].[ext]',
				},
			},
		},
	};
});