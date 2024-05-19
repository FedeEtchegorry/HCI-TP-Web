/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from 'pinia'

export function registerPlugins (app) {
  const pinia = createPinia()
  app.use(pinia)
  app.use(vuetify)
}
