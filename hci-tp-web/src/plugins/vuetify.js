/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#003153",
          primary_v: "#EBF6FF", 
          secondary: "#CFB9A0", 
          secondary_v: "#F3F1E2", 
          tertiary: "#000000",
          tertiary_v: "#D9D9D9",
          tertiary_c:"#B9B9B9" ,
          selection:"#FA6300",
          light_green:"#00FF1A",
          yellow_state:"#FFDA55",
          red_state:"#CE2C2C",
          orange_state:"#FF8A00",
          green_state:"#6BE461",
          second_state:"#DAEA21",
          background: "#000000",
        }
      },
    },
  },
})
