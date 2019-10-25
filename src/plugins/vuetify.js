import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            dark: {
                primary: colors.indigo.lighten1,
                secondary: colors.indigo.darken1,
                accent: colors.indigo.lighten3,
            },
            light: {
                primary: colors.blue.lighten3,
                secondary: colors.blue.lighten5,
                accent: colors.blue.darken1,
            }
        }
    }
});
