// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
// @ts-ignore
export default defineNuxtConfig({
  ssr: false,
  devtools: { 
    enabled: false,
  },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css: [ "~/styles/main.scss" ],
  vite: {
    root: '/eisaar-lib/<rootDir>'
  },
  app: {
    baseURL: '/eisaar-lib/',
    buildAssetsDir: "/",
  },
})