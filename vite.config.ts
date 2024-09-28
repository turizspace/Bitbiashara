import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		fs: {
			// Allow access to the public folder from the development server
			allow: ['public']
		},
	},
	build: {
		// Ensure that the build includes the public directory and other configurations
		rollupOptions: {
			// You can specify more rollup options if needed
		}
	}
});
