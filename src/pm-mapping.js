const Platform = require('react-native').Platform;

module.exports = {
  strict: {
    'text-font-family': 'Roboto-Regular',
    'text-heading-1-font-size': 30,
    'text-heading-1-line-height': 38,
    'text-heading-1-font-weight': Platform.select({
      android: '400',
      ios: '600',
    }),
    'text-heading-1-font-family': 'Roboto-Bold',
    'text-heading-2-font-size': 24,
    'text-heading-2-line-height': 30,
    'text-heading-2-font-weight': Platform.select({
      android: '400',
      ios: '600',
    }),
    'text-heading-2-font-family': 'Roboto-Bold',
    'text-heading-3-font-size': 18,
    'text-heading-3-line-height': 22,
    'text-heading-3-font-weight': Platform.select({
      android: '400',
      ios: '500',
    }),
    'text-heading-3-font-family': 'Roboto-SemiBold',
    'text-heading-4-font-size': 16,
    'text-heading-4-line-height': 26,
    'text-heading-4-font-weight': Platform.select({
      android: '400',
      ios: '500',
    }),
    'text-heading-4-font-family': 'Roboto-SemiBold',
    'text-heading-5-font-family': 'Roboto-Bold',
    'text-heading-5-font-size': 22,
    'text-heading-5-line-height': 32,
    'text-heading-5-font-weight': Platform.select({
      android: '400',
      ios: '600',
    }),
    'text-heading-6-font-family': 'Roboto-Bold',
    'text-heading-6-font-size': 18,
    'text-heading-6-line-height': 24,
    'text-heading-6-font-weight': Platform.select({
      android: '400',
      ios: 'bold',
    }),
    'text-subtitle-1-font-family': 'Roboto-Bold',
    'text-subtitle-1-font-size': 20,
    'text-subtitle-1-line-height': 22,
    'text-subtitle-1-font-weight': Platform.select({
      android: '400',
      ios: 'bold',
    }),
    'text-subtitle-2-font-size': 16,
    'text-subtitle-2-line-height': 20,
    'text-subtitle-2-font-weight': Platform.select({
      android: '400',
      ios: 'bold',
    }),
    'text-subtitle-2-font-family': 'Roboto-Bold',
    'text-subtitle-3-font-size': 16,
    'text-subtitle-3-line-height': 19,
    'text-subtitle-3-font-weight': Platform.select({
      android: '400',
      ios: '500',
    }),
    'text-subtitle-3-font-family': 'Roboto-SemiBold',
    'text-paragraph-1-font-size': 18,
    'text-paragraph-1-line-height': 24,
    'text-paragraph-1-font-weight': Platform.select({
      android: '400',
      ios: 'bold',
    }),
    'text-paragraph-1-font-family': 'Roboto-Regular',
    'text-paragraph-2-font-size': 18,
    'text-paragraph-2-line-height': 22,
    'text-paragraph-2-font-weight': Platform.select({
      android: '400',
      ios: '400',
    }),
    'text-paragraph-2-font-family': 'Roboto-Regular',
    'text-caption-1-font-size': 14,
    'text-caption-1-line-height': 18,
    'text-caption-1-font-weight': Platform.select({
      android: '400',
      ios: '400',
    }),
    'text-caption-1-font-family': 'Roboto-Bold',
    'text-caption-2-font-size': 14,
    'text-caption-2-line-height': 18,
    'text-caption-2-font-weight': Platform.select({
      android: '400',
      ios: '600',
    }),
    'text-caption-2-font-family': 'Roboto-Bold',
    'text-label-font-size': 12,
    'text-label-line-height': 14,
    'text-label-font-weight': Platform.select({
      android: '400',
      ios: 'bold',
    }),
    'text-label-font-family': 'Roboto-Bold',
    'size-tiny': 24,
    'size-small': 36,
    'size-medium': 40,
    'size-large': 48,
    'size-giant': 56,
    'border-radius-rect': 0,
    'border-radius': 4,
    'border-radius-default': 4,
    'border-radius-rounded': 10,
    'border-radius-circle': 25,
    'border-width': 1,
  },
  components: {
    BottomNavigationTab: {
      appearances: {
        default: {
          mapping: {
            textFontSize: 'text-label-font-size',
            textFontWeight: 'text-caption-1-font-weight',
            textLineHeight: 'text-label-line-height',
            textFontFamily: 'text-subtitle-2-font-family',
            textColor: 'grey-700',
            iconTintColor: 'grey-700',
          },
        },
      },
    },
    Button: {
      meta: {
        variantGroups: {
          shape: {
            default: {
              default: true,
            },
            rounded: {
              default: false,
            },
            circle: {
              default: false,
            },
            rect: {
              default: false,
            },
          },
        },
      },
      appearances: {
        filled: {
          mapping: {
            textFontFamily: 'text-paragraph-1-font-family',
          },
          variantGroups: {
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
            size: {
              tiny: {
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: '600',
                }),
                textFontSize: 10,
                textLineHeight: 12,
              },
              small: {
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textFontSize: 12,
                textLineHeight: 16,
              },
              medium: {
                textFontFamily: 'Roboto-Bold',
                textFontSize: 14,
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textLineHeight: 20,
                // minHeight: 50,
              },
              large: {
                textFontFamily: 'Roboto-Bold',
                textFontSize: 16,
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textLineHeight: 20,
              },
              giant: {
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textFontSize: 18,
                textLineHeight: 24,
              },
            },
          },
        },
        outline: {
          variantGroups: {
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
          },
        },
        ghost: {
          variantGroups: {
            // status: {
            //   primary: {
            //     textColor: 'color-primary-light',
            //   },
            // },
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
          },
        },
      },
    },
    Input: {
      meta: {
        parameters: {
          marginVertical: {
            type: 'number',
          },
          height: {
            type: 'number',
          },
        },
        appearances: {
          transparent: {
            default: false,
          },
        },
        variantGroups: {
          shape: {
            default: {
              default: false,
            },
            rounded: {
              default: true,
            },
            circle: {
              default: false,
            },
            rect: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            borderWidth: 0,
            marginVertical: 5,
            labelMarginBottom: 8,
            textColor: 'color-basic-800',
            // placeholderColor: 'color-basic-800',
            labelColor: 'new-black',
          },
          variantGroups: {
            status: {
              basic: {
                textColor: 'color-basic-800',
                // placeholderColor: 'color-basic-800',
                borderWidth: 0,
                captionIconTintColor: 'text-hint-color',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              primary: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              danger: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              success: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              info: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              warning: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
              control: {
                // placeholderColor: 'color-basic-800',
                labelColor: 'new-black',
                backgroundColor: 'grey-0',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                  },
                  disabled: {
                    backgroundColor: 'grey-0-transparent',
                  },
                },
              },
            },
            size: {
              small: {
                minHeight: 'size-small',
                borderWidth: 0,
                textFontSize: 'text-caption-1-font-size',
                textFontWeight: '400',
                textLineHeight: 'text-caption-1-line-height',
                textFontFamily: 'text-paragraph-1-font-family',
                paddingVertical: Platform.OS === 'android' ? 0 : undefined,
              },
              medium: {
                minHeight: 'size-medium',
                borderWidth: 0,
                textFontSize: 'text-paragraph-1-font-size',
                textFontWeight: '400',
                textLineHeight: 'text-paragraph-1-line-height',
                textFontFamily: 'text-paragraph-1-font-family',
                paddingVertical: Platform.OS === 'android' ? 0 : undefined,
              },
              large: {
                minHeight: 'size-large',
                borderWidth: 0,
                textFontSize: 'text-paragraph-1-font-size',
                textFontWeight: '400',
                textLineHeight: 'text-paragraph-1-line-height',
                textFontFamily: 'text-paragraph-1-font-family',
                paddingVertical: Platform.OS === 'android' ? 0 : undefined,
              },
            },
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
          },
        },
        transparent: {
          variantGroups: {
            status: {
              basic: {
                textColor: 'color-basic-800',
                // placeholderColor: 'color-basic-800',
                borderWidth: 0,
                backgroundColor: 'color-basic-control-transparent-1000',
                captionIconTintColor: 'text-hint-color',
                labelColor: 'new-black',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                    placeholderColor: 'color-basic-800',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                    placeholderColor: 'color-basic-800',
                  },
                  disabled: {
                    backgroundColor: 'color-basic-control-transparent-700',
                  },
                },
              },
              primary: {
                // textColor: 'color-basic-800',
                // placeholderColor: 'color-basic-800',
                borderWidth: 0,
                backgroundColor: 'color-basic-control-transparent-1000',
                labelColor: 'new-black',
                state: {
                  focused: {
                    backgroundColor: 'color-basic-200',
                    placeholderColor: 'color-basic-800',
                  },
                  hover: {
                    backgroundColor: 'color-basic-200',
                    placeholderColor: 'color-basic-800',
                  },
                  disabled: {
                    backgroundColor: 'color-basic-control-transparent-700',
                  },
                },
              },
            },
          },
        },
      },
    },
    MenuItem: {
      appearances: {
        default: {
          mapping: {
            titleFontSize: 'text-paragraph-1-font-size',
            titleFontWeight: 'text-paragraph-1-font-weight',
            titleLineHeight: 'text-paragraph-1-line-height',
            titleFontFamily: 'text-paragraph-1-font-family',
            titleColor: 'grey-400',
          },
        },
      },
    },
    Radio: {
      appearances: {
        default: {
          mapping: {
            borderWidth: 2,
          },
          variantGroups: {
            status: {
              basic: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              primary: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              danger: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              info: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              success: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              warning: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
              control: {
                backgroundColor: 'transparent',
                borderColor: 'grey-100',
              },
            },
          },
        },
      },
    },
    Text: {
      meta: {
        parameters: {
          textTransform: {
            type: 'string',
          },
        },
        variantGroups: {
          transform: {
            default: {
              default: true,
            },
            uppercase: {
              default: false,
            },
          },
          category: {
            s3: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            fontFamily: 'text-font-family',
            color: 'text-basic-color',
          },
          variantGroups: {
            transform: {
              default: {},
              uppercase: {
                textTransform: 'uppercase',
              },
            },
            category: {
              h1: {
                fontSize: 'text-heading-1-font-size',
                fontWeight: 'text-heading-1-font-weight',
                fontFamily: 'text-heading-1-font-family',
                lineHeight: 'text-heading-1-line-height',
              },
              h2: {
                fontSize: 'text-heading-2-font-size',
                fontWeight: 'text-heading-2-font-weight',
                fontFamily: 'text-heading-2-font-family',
                lineHeight: 'text-heading-2-line-height',
              },
              h3: {
                fontSize: 'text-heading-3-font-size',
                fontWeight: 'text-heading-3-font-weight',
                fontFamily: 'text-heading-3-font-family',
                lineHeight: 'text-heading-3-line-height',
              },
              h4: {
                fontSize: 'text-heading-4-font-size',
                fontWeight: 'text-heading-4-font-weight',
                fontFamily: 'text-heading-4-font-family',
                lineHeight: 'text-heading-4-line-height',
              },
              h5: {
                fontSize: 'text-heading-5-font-size',
                fontFamily: 'text-heading-5-font-family',
                fontWeight: 'text-heading-5-font-weight',
                lineHeight: 'text-heading-5-line-height',
              },
              h6: {
                fontFamily: 'text-heading-6-font-family',
                fontSize: 'text-heading-6-font-size',
                fontWeight: 'text-heading-6-font-weight',
                lineHeight: 'text-heading-6-line-height',
              },
              s1: {
                fontSize: 'text-subtitle-1-font-size',
                fontWeight: 'text-subtitle-1-font-weight',
                fontFamily: 'text-subtitle-1-font-family',
                lineHeight: 'text-subtitle-1-line-height',
              },
              s2: {
                fontSize: 'text-subtitle-2-font-size',
                fontFamily: 'text-subtitle-2-font-family',
                fontWeight: 'text-subtitle-2-font-weight',
                lineHeight: 'text-subtitle-2-line-height',
              },
              s3: {
                fontSize: 'text-subtitle-3-font-size',
                fontFamily: 'text-subtitle-3-font-family',
                fontWeight: 'text-subtitle-3-font-weight',
                lineHeight: 'text-subtitle-3-line-height',
              },
              p1: {
                fontSize: 'text-paragraph-1-font-size',
                fontWeight: 'text-paragraph-1-font-weight',
                fontFamily: 'text-paragraph-1-font-family',
                lineHeight: 'text-paragraph-1-line-height',
              },
              p2: {
                fontSize: 'text-paragraph-2-font-size',
                fontWeight: 'text-paragraph-2-font-weight',
                fontFamily: 'text-paragraph-2-font-family',
                lineHeight: 'text-paragraph-2-line-height',
              },
              c1: {
                fontSize: 'text-caption-1-font-size',
                fontWeight: 'text-caption-1-font-weight',
                fontFamily: 'text-caption-1-font-family',
                lineHeight: 'text-caption-1-line-height',
              },
              c2: {
                fontSize: 'text-caption-2-font-size',
                fontWeight: 'text-caption-2-font-weight',
                fontFamily: 'text-caption-2-font-family',
                lineHeight: 'text-caption-2-line-height',
                textTransform: 'uppercase',
              },
              label: {
                fontSize: 'text-label-font-size',
                fontWeight: 'text-label-font-weight',
                lineHeight: 'text-label-line-height',
                fontFamily: 'text-label-font-family',
              },
            },
          },
        },
      },
    },
    TextSwitch: {
      meta: {
        scope: 'all',
        parameters: {
          minWidth: {
            type: 'number',
          },
          minHeight: {
            type: 'number',
          },
          paddingHorizontal: {
            type: 'number',
          },
          paddingVertical: {
            type: 'number',
          },
          borderRadius: {
            type: 'number',
          },
          borderColor: {
            type: 'string',
          },
          borderWidth: {
            type: 'number',
          },
          backgroundColor: {
            type: 'string',
          },
          switchBackgroundColor: {
            type: 'string',
          },
          textMarginHorizontal: {
            type: 'number',
          },
          textFontFamily: {
            type: 'string',
          },
          textFontSize: {
            type: 'number',
          },
          textLineHeight: {
            type: 'number',
          },
          textFontWeight: {
            type: 'string',
          },
          textColor: {
            type: 'string',
          },
          switchTextColor: {
            type: 'string',
          },
        },
        appearances: {
          filled: {
            default: true,
          },
          outline: {
            default: false,
          },
        },
        variantGroups: {
          shape: {
            default: {
              default: true,
            },
            rounded: {
              default: false,
            },
            circle: {
              default: false,
            },
            rect: {
              default: false,
            },
          },
          status: {
            primary: {
              default: true,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: true,
            },
            large: {
              default: false,
            },
            giant: {
              default: false,
            },
          },
        },
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: 'all',
          },
          disabled: {
            default: false,
            priority: 1,
            scope: 'all',
          },
          active: {
            default: false,
            priority: 2,
            scope: 'all',
          },
          focused: {
            default: false,
            priority: 3,
            scope: 'mobile',
          },
        },
      },
      appearances: {
        filled: {
          mapping: {
            textFontFamily: 'text-paragraph-1-font-family',
          },
          variantGroups: {
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
            status: {
              primary: {
                borderColor: 'color-basic-default-border',
                backgroundColor: 'color-basic-default',
                switchBackgroundColor: 'color-primary-default',
                textColor: 'text-basic-color',
                switchTextColor: 'text-control-color',
                state: {
                  focused: {
                    borderColor: 'color-primary-focus-border',
                    backgroundColor: 'color-primary-focus',
                  },
                  hover: {
                    borderColor: 'color-primary-hover-border',
                    backgroundColor: 'color-primary-hover',
                  },
                  active: {
                    borderColor: 'color-primary-active-border',
                    backgroundColor: 'color-primary-active',
                  },
                  disabled: {
                    borderColor: 'color-primary-disabled-border',
                    backgroundColor: 'color-primary-disabled',
                    textColor: 'text-disabled-color',
                  },
                },
              },
            },
            size: {
              tiny: {
                minWidth: 'size-tiny',
                minHeight: 'size-tiny',
                borderWidth: 'border-width',
                paddingHorizontal: 6,
                paddingVertical: 6,
                textMarginHorizontal: 6,
                // textFontSize: 10,
                // textFontWeight: 'normal',
                // textLineHeight: 12,
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: '600',
                }),
                textFontSize: 10,
                textLineHeight: 12,
              },
              small: {
                minWidth: 'size-small',
                minHeight: 'size-small',
                borderWidth: 'border-width',
                paddingHorizontal: 8,
                paddingVertical: 8,
                textMarginHorizontal: 8,
                // textFontSize: 12,
                // textFontWeight: 'normal',
                // textLineHeight: 16,
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textFontSize: 12,
                textLineHeight: 16,
              },
              medium: {
                minWidth: 'size-medium',
                minHeight: 'size-medium',
                borderWidth: 'border-width',
                paddingHorizontal: 10,
                paddingVertical: 12,
                textMarginHorizontal: 10,
                // textFontSize: 14,
                // textFontWeight: 'normal',
                // textLineHeight: 16,
                textFontFamily: 'Roboto-Bold',
                textFontSize: 14,
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textLineHeight: 20,
              },
              large: {
                minWidth: 'size-large',
                minHeight: 'size-large',
                borderWidth: 'border-width',
                paddingHorizontal: 10,
                paddingVertical: 14,
                textMarginHorizontal: 10,
                // textFontSize: 16,
                // textFontWeight: 'normal',
                // textLineHeight: 20,
                textFontFamily: 'Roboto-Bold',
                textFontSize: 16,
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textLineHeight: 20,
              },
              giant: {
                minWidth: 'size-giant',
                minHeight: 'size-giant',
                borderWidth: 'border-width',
                paddingHorizontal: 12,
                paddingVertical: 16,
                textMarginHorizontal: 12,
                // textFontSize: 18,
                // textFontWeight: 'normal',
                // textLineHeight: 24,
                textFontFamily: 'Roboto-Bold',
                textFontWeight: Platform.select({
                  android: 'normal',
                  ios: 'bold',
                }),
                textFontSize: 18,
                textLineHeight: 24,
              },
            },
          },
        },
        outline: {
          mapping: {},
          variantGroups: {
            shape: {
              default: {
                borderRadius: 'border-radius',
              },
              rounded: {
                borderRadius: 'border-radius-rounded',
              },
              circle: {
                borderRadius: 'border-radius-circle',
              },
              rect: {
                borderRadius: 0,
              },
            },
            status: {
              primary: {
                borderColor: 'color-control-default-border',
                backgroundColor: 'transparent',
                switchBackgroundColor: 'color-control-default',
                textColor: 'text-control-color',
                switchTextColor: 'text-basic-color',
                state: {
                  focused: {
                    borderColor: 'color-primary-transparent-focus-border',
                    backgroundColor: 'color-primary-transparent-focus',
                    textColor: 'text-primary-color',
                  },
                  hover: {
                    borderColor: 'color-primary-transparent-hover-border',
                    backgroundColor: 'color-primary-transparent-hover',
                    textColor: 'text-primary-color',
                  },
                  active: {
                    borderColor: 'color-primary-transparent-active-border',
                    backgroundColor: 'color-primary-transparent-active',
                    textColor: 'text-primary-color',
                  },
                  disabled: {
                    borderColor: 'color-primary-transparent-disabled-border',
                    backgroundColor: 'color-primary-transparent-disabled',
                    textColor: 'text-disabled-color',
                  },
                },
              },
            },
          },
        },
      },
    },

    Calendar: {
      meta: {
        scope: 'all',
        parameters: {
          width: {
            type: 'string',
          },
          marginHorizontal: {
            type: 'number',
          },
          paddingVertical: {
            type: 'number',
          },
          borderColor: {
            type: 'string',
          },
          borderWidth: {
            type: 'number',
          },
          borderRadius: {
            type: 'number',
          },
          headerPaddingHorizontal: {
            type: 'number',
          },
          headerPaddingVertical: {
            type: 'number',
          },
          dividerMarginVertical: {
            type: 'number',
          },
          titleFontSize: {
            type: 'number',
          },
          titleFontWeight: {
            type: 'string',
          },
          titleLineHeight: {
            type: 'number',
          },
          titleColor: {
            type: 'string',
          },
          titleFontFamily: {
            type: 'string',
          },
          iconWidth: {
            type: 'number',
          },
          iconHeight: {
            type: 'number',
          },
          iconTintColor: {
            type: 'string',
          },
          weekdayTextFontSize: {
            type: 'number',
          },
          weekdayTextFontWeight: {
            type: 'string',
          },
          weekdayTextLineHeight: {
            type: 'number',
          },
          weekdayTextColor: {
            type: 'string',
          },
          weekdayTextFontFamily: {
            type: 'string',
          },
          rowMinHeight: {
            type: 'number',
          },
          rowMarginHorizontal: {
            type: 'number',
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            width: '100%',
            borderRadius: 'border-radius',
            borderWidth: 0, //'border-width',
            borderColor: 'border-basic-color-4',
            paddingVertical: 8,
            // headerPaddingHorizontal: 0,
            // headerPaddingVertical: 4,
            titleFontSize: 'text-heading-6-font-size',
            titleFontWeight: 'text-paragraph-1-font-weight',
            titleLineHeight: 'text-heading-6-line-height',
            titleFontFamily: 'text-paragraph-1-font-family',
            titleColor: 'text-basic-color',
            iconWidth: 24,
            iconHeight: 24,
            iconTintColor: 'text-basic-color',
            weekdayTextFontSize: 'text-paragraph-1-font-size',
            weekdayTextFontWeight: 'text-paragraph-1-font-weight',
            weekdayTextLineHeight: 'text-paragraph-1-line-height',
            weekdayTextFontFamily: 'text-paragraph-1-font-family',
            weekdayTextColor: 'text-basic-color',
            dividerMarginVertical: 0,
            rowMinHeight: 45,
            rowMarginHorizontal: 0,
          },
        },
      },
    },
    CalendarCell: {
      meta: {
        scope: 'all',
        parameters: {
          marginHorizontal: {
            type: 'number',
          },
          paddingHorizontal: {
            type: 'number',
          },
          paddingVertical: {
            type: 'number',
          },
          maxWidth: {
            type: 'number',
          },
          justifyContent: {
            type: 'string',
          },
          backgroundColor: {
            type: 'string',
          },
          borderRadius: {
            type: 'string',
          },
          contentBorderWidth: {
            type: 'number',
          },
          contentBorderRadius: {
            type: 'string',
          },
          contentBorderColor: {
            type: 'string',
          },
          contentBackgroundColor: {
            type: 'string',
          },
          contentTextColor: {
            type: 'string',
          },
          contentTextFontSize: {
            type: 'number',
          },
          contentTextLineHeight: {
            type: 'number',
          },
          contentTextFontWeight: {
            type: 'number',
          },
          contentTextFontFamily: {
            type: 'string',
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {
          bounding: {
            scope: 'all',
            priority: 0,
            default: false,
          },
          today: {
            scope: 'all',
            priority: 1,
            default: false,
          },
          disabled: {
            scope: 'all',
            priority: 2,
            default: false,
          },
          selected: {
            scope: 'all',
            priority: 3,
            default: false,
          },
          range: {
            scope: 'all',
            priority: 5,
            default: false,
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 0,
            marginHorizontal: 0,
            // marginHorizontal: -20,
            backgroundColor: 'transparent',
            contentBorderRadius: 'border-radius',
            contentBorderWidth: 'border-width',
            contentBorderColor: 'transparent',
            contentTextFontSize: 'text-paragraph-2-font-size',
            contentTextFontWeight: 'text-paragraph-2-font-weight',
            contentTextLineHeight: 'text-paragraph-2-line-height',
            contentTextFontFamily: 'text-paragraph-2-font-family',
            contentTextColor: 'text-basic-color',
            state: {
              bounding: {
                contentTextColor: 'grey-200',
              },
              selected: {
                contentBorderColor: 'color-primary-default-border',
                contentBackgroundColor: 'color-primary-default',
                contentTextColor: 'text-control-color',
                contentBorderRadius: 'border-radius-circle',
                contentTextFontSize: 'text-paragraph-1-font-size',
                contentTextFontWeight: 'text-paragraph-1-font-weight',
                contentTextLineHeight: 'text-paragraph-1-line-height',
                contentTextFontFamily: 'text-paragraph-1-font-family',
              },
              disabled: {
                contentTextColor: 'text-disabled-color',
              },
              today: {
                contentBorderColor: 'transparent',
                contentBackgroundColor: 'transparent',
                contentTextColor: 'color-primary-default',
              },
              range: {
                borderRadius: 'border-radius',
                backgroundColor: 'color-primary-default',
                contentTextColor: 'text-control-color',
              },
              'today.range': {
                contentBorderColor: 'color-control-transparent-default-border',
                contentBackgroundColor: 'color-control-transparent-default',
              },
            },
          },
        },
      },
    },

    Toggle: {
      meta: {
        scope: 'all',
        parameters: {
          width: {
            type: 'number',
          },
          height: {
            type: 'number',
          },
          borderRadius: {
            type: 'number',
          },
          borderWidth: {
            type: 'number',
          },
          borderColor: {
            type: 'string',
          },
          backgroundColor: {
            type: 'string',
          },
          thumbWidth: {
            type: 'number',
          },
          thumbHeight: {
            type: 'number',
          },
          thumbBorderRadius: {
            type: 'number',
          },
          thumbBackgroundColor: {
            type: 'string',
          },
          textMarginHorizontal: {
            type: 'number',
          },
          textFontFamily: {
            type: 'string',
          },
          textFontSize: {
            type: 'number',
          },
          textFontWeight: {
            type: 'string',
          },
          textLineHeight: {
            type: 'number',
          },
          textColor: {
            type: 'string',
          },
          iconWidth: {
            type: 'number',
          },
          iconHeight: {
            type: 'number',
          },
          iconTintColor: {
            type: 'string',
          },
          outlineWidth: {
            type: 'number',
          },
          outlineHeight: {
            type: 'number',
          },
          outlineBorderRadius: {
            type: 'number',
          },
          outlineBackgroundColor: {
            type: 'string',
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
        states: {
          checked: {
            default: false,
            priority: 0,
            scope: 'all',
          },
          hover: {
            default: false,
            priority: 1,
            scope: 'all',
          },
          disabled: {
            default: false,
            priority: 2,
            scope: 'all',
          },
          active: {
            default: false,
            priority: 3,
            scope: 'all',
          },
          focused: {
            default: false,
            priority: 4,
            scope: 'all',
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            width: 52,
            height: 32,
            borderRadius: 16,
            borderWidth: 'border-width',
            thumbWidth: 28,
            thumbHeight: 28,
            thumbBorderRadius: 14,
            outlineWidth: 64,
            outlineHeight: 42,
            outlineBorderRadius: 21,
            textMarginHorizontal: 12,
            textFontSize: 'text-subtitle-2-font-size',
            textFontWeight: 'text-subtitle-2-font-weight',
            textLineHeight: 'text-subtitle-2-line-height',
            textFontFamily: 'text-font-family',
            iconWidth: 12,
            iconHeight: 12,
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: 'grey-100',
                // borderColor: 'color-primary-default-border',
                backgroundColor: 'color-basic-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-primary-default-border',
                    backgroundColor: 'color-primary-default',
                    iconTintColor: 'text-primary-color',
                  },
                  focused: {
                    borderColor: 'color-primary-transparent-focus-border',
                    backgroundColor: 'color-primary-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-primary-focus-border',
                    backgroundColor: 'color-primary-focus',
                  },
                  hover: {
                    borderColor: 'color-primary-transparent-hover-border',
                    backgroundColor: 'color-primary-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-primary-hover-border',
                    backgroundColor: 'color-primary-hover',
                  },
                  active: {
                    borderColor: 'color-primary-transparent-active-border',
                    backgroundColor: 'color-primary-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-primary-active-border',
                    backgroundColor: 'color-primary-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              primary: {
                borderColor: 'color-primary-transparent-default-border',
                backgroundColor: 'color-primary-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-primary-default-border',
                    backgroundColor: 'color-primary-default',
                    iconTintColor: 'text-primary-color',
                  },
                  focused: {
                    borderColor: 'color-primary-transparent-focus-border',
                    backgroundColor: 'color-primary-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-primary-focus-border',
                    backgroundColor: 'color-primary-focus',
                  },
                  hover: {
                    borderColor: 'color-primary-transparent-hover-border',
                    backgroundColor: 'color-primary-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-primary-hover-border',
                    backgroundColor: 'color-primary-hover',
                  },
                  active: {
                    borderColor: 'color-primary-transparent-active-border',
                    backgroundColor: 'color-primary-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-primary-active-border',
                    backgroundColor: 'color-primary-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              success: {
                borderColor: 'color-success-transparent-default-border',
                backgroundColor: 'color-success-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-success-default-border',
                    backgroundColor: 'color-success-default',
                    iconTintColor: 'text-success-color',
                  },
                  focused: {
                    borderColor: 'color-success-transparent-focus-border',
                    backgroundColor: 'color-success-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-success-focus-border',
                    backgroundColor: 'color-success-focus',
                  },
                  hover: {
                    borderColor: 'color-success-transparent-hover-border',
                    backgroundColor: 'color-success-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-success-hover-border',
                    backgroundColor: 'color-success-hover',
                  },
                  active: {
                    borderColor: 'color-success-transparent-active-border',
                    backgroundColor: 'color-success-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-success-active-border',
                    backgroundColor: 'color-success-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              info: {
                borderColor: 'color-info-transparent-default-border',
                backgroundColor: 'color-info-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-info-default-border',
                    backgroundColor: 'color-info-default',
                    iconTintColor: 'text-info-color',
                  },
                  focused: {
                    borderColor: 'color-info-transparent-focus-border',
                    backgroundColor: 'color-info-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-info-focus-border',
                    backgroundColor: 'color-info-focus',
                  },
                  hover: {
                    borderColor: 'color-info-transparent-hover-border',
                    backgroundColor: 'color-info-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-info-hover-border',
                    backgroundColor: 'color-info-hover',
                  },
                  active: {
                    borderColor: 'color-info-transparent-active-border',
                    backgroundColor: 'color-info-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-info-active-border',
                    backgroundColor: 'color-info-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              warning: {
                borderColor: 'color-warning-transparent-default-border',
                backgroundColor: 'color-warning-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-warning-default-border',
                    backgroundColor: 'color-warning-default',
                    iconTintColor: 'text-warning-color',
                  },
                  focused: {
                    borderColor: 'color-warning-transparent-focus-border',
                    backgroundColor: 'color-warning-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-warning-focus-border',
                    backgroundColor: 'color-warning-focus',
                  },
                  hover: {
                    borderColor: 'color-warning-transparent-hover-border',
                    backgroundColor: 'color-warning-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-warning-hover-border',
                    backgroundColor: 'color-warning-hover',
                  },
                  active: {
                    borderColor: 'color-warning-transparent-active-border',
                    backgroundColor: 'color-warning-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-warning-active-border',
                    backgroundColor: 'color-warning-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              danger: {
                borderColor: 'color-danger-transparent-default-border',
                backgroundColor: 'color-danger-transparent-default',
                thumbBackgroundColor: 'background-basic-color-1',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-basic-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-danger-default-border',
                    backgroundColor: 'color-danger-default',
                    iconTintColor: 'text-danger-color',
                  },
                  focused: {
                    borderColor: 'color-danger-transparent-focus-border',
                    backgroundColor: 'color-danger-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-danger-focus-border',
                    backgroundColor: 'color-danger-focus',
                  },
                  hover: {
                    borderColor: 'color-danger-transparent-hover-border',
                    backgroundColor: 'color-danger-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-danger-hover-border',
                    backgroundColor: 'color-danger-hover',
                  },
                  active: {
                    borderColor: 'color-danger-transparent-active-border',
                    backgroundColor: 'color-danger-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-danger-active-border',
                    backgroundColor: 'color-danger-active',
                  },
                  disabled: {
                    borderColor: 'color-basic-transparent-disabled-border',
                    backgroundColor: 'color-basic-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-disabled',
                    textColor: 'text-disabled-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              control: {
                borderColor: 'color-control-transparent-default-border',
                backgroundColor: 'color-control-transparent-default',
                thumbBackgroundColor: 'color-control-default',
                outlineBackgroundColor: 'transparent',
                textColor: 'text-control-color',
                iconTintColor: 'transparent',
                state: {
                  checked: {
                    borderColor: 'color-control-transparent-default-border',
                    backgroundColor: 'color-control-transparent-default',
                    iconTintColor: 'color-basic-800',
                  },
                  focused: {
                    borderColor: 'color-control-transparent-focus-border',
                    backgroundColor: 'color-control-transparent-focus',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.focused': {
                    borderColor: 'color-control-transparent-focus-border',
                    backgroundColor: 'color-control-transparent-focus',
                  },
                  hover: {
                    borderColor: 'color-control-transparent-hover-border',
                    backgroundColor: 'color-control-transparent-hover',
                  },
                  'checked.hover': {
                    borderColor: 'color-control-transparent-hover-border',
                    backgroundColor: 'color-control-transparent-hover',
                  },
                  active: {
                    borderColor: 'color-control-transparent-active-border',
                    backgroundColor: 'color-control-transparent-active',
                    outlineBackgroundColor: 'outline-color',
                  },
                  'checked.active': {
                    borderColor: 'color-control-transparent-active-border',
                    backgroundColor: 'color-control-transparent-active',
                  },
                  disabled: {
                    borderColor: 'color-control-transparent-disabled-border',
                    backgroundColor: 'color-control-transparent-disabled',
                    thumbBackgroundColor: 'color-basic-transparent-600',
                    textColor: 'text-control-color',
                  },
                  'checked.disabled': {
                    iconTintColor: 'text-control-color',
                  },
                },
              },
              new: {
                backgroundColor: 'unit-listed'
              }
            },
          },
        },
      },
    },
  },
};





