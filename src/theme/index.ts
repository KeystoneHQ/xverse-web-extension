const Theme = {
  colors: {
    action: {
      classic: '#5565F7',
    },
    white: {
      0: '#FFFFFF',
      200: 'rgba(255, 255, 255, 0.8)',
      400: 'rgba(255, 255, 255, 0.6)',
      600: 'rgba(255, 255, 255, 0.2)',
    },
    background: {
      'elevation-1': '#070A13',
      elevation0: '#12151E',
      elevation1: '#1D2032',
      elevation2: '#272A44',
      elevation3: '#303354',
      elevation6: '#4C5187',
      elevation8: '#7E89AB',
      modalBackdrop: 'rgba(18,21,30,0.6)',
    },
    feedback: {
      success: '#51D6A6',
      caution: '#F2A900',
      error: '#D33C3C',
    },
    grey: '#24252C',
  },
  headline_category_m: {
    fontFamily: 'Satoshi-Medium',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.02,
    textTransform: 'uppercase',
  },
  headline_category_s: {
    fontFamily: 'Satoshi-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 11,
    letterSpacing: 0.02,
  },
  body_bold_l: {
    fontFamily: 'Satoshi-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
  },
  body_medium_l: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
  },
  body_l: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
  },
  body_bold_m: {
    fontFamily: 'Satoshi-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
  },
  body_medium_m: {
    fontFamily: 'Satoshi-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
  },
  body_m: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
  },
  body_xs: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
  },
  headline_xl: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 42,
    letterSpacing: 0.02,
  },
  tile_text: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.02,
  },
  bold_tile_text: {
    fontFamily: 'Satoshi-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.02,
  },
  headline_l: {
    fontFamily: 'Satoshi-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 34,
    letterSpacing: 0.02,
  },
  headline_m: {
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 0.02,
  },
  headline_s: {
    fontFamily: 'Satoshi-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 21,
    letterSpacing: 0.02,
  },
  breakpoints: {
    s: '0px',
    md: '700px',
    lg: '1025px',
    xlg: '1536px',
  },
  spacing: (multiple: number) => multiple * 2,
  radius: (multiple: number) => multiple * 4 + 4,
};
export default Theme;
