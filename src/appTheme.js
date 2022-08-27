import { defaultTheme, mergeTheme } from 'evergreen-ui';

const appTheme = mergeTheme(defaultTheme, {
    fontWeights: {
        bold: 700
    },
    letterSpacings: {
        tightest: '-1px'
    },
    fontFamilies: {
        display: 'Inter',
        ui: 'Inter'
    },
    components: {
        Heading: {
            sizes: {
                800: {
                    fontSize: '32px',
                    letterSpacing: 'letterSpacings.tightest',
                    fontWeight: 'fontWeights.bold'
                }
            }
        }
    }
});

console.log(appTheme);

export default appTheme;
