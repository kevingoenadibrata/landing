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
        },
        Button: {
            appearances: {
                instagram: {
                    backgroundColor: '#8446ea',
                    color: 'white',
                    _hover: {
                        backgroundColor: '#4a1a99'
                    }
                }
            }
        }
    }
});

console.log(appTheme);

export default appTheme;
