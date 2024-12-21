import adapter from '@sveltejs/adapter-cloudflare'
import {mdsvex} from 'mdsvex'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md']
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
  kit: {
    adapter: adapter({
      edge: true,
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
}

export default config
