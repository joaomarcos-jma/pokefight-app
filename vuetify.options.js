import colors from 'vuetify/es5/util/colors'

export default {
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.blue,
                secondary: colors.teal.darken4,
                accent: colors.teal.accent4,

                error: colors.deepOrange.accent2,
                info: colors.grey.darken3,
                success: colors.green.accent3,
                warning: colors.amber.base,
            },
            light: {
                primary: '#1976D2',
                secondary: colors.teal.lighten3,
                accent: colors.teal.accent4,

                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            }
        }
    },
}