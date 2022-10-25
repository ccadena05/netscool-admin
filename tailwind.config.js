module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'itses-blue':'#183054',
        'idea-orange':'#FF5500',
        'idea-flesh':'#fe998b',
        'idea-flesh-pink':'#fa768d',
        'idea-flesh-pink-light':'#f78ca0',
        'idea-nav-blue':'#000D47',
        'idea-blue-1': '#031b69',
        'idea-blue-side': '#212E68',
        'gray-tim-100': '#F8F9FA',
        'gray-tim-200': '#6B748C',
        'dark-blue-100':'#212C3F',
        'dark-blue-50':'#232E43',
        'nets-yellow':'#F6AC3F',
        'nets-blue':'#002246',

      },
      boxShadow: {
        "soft-xxs": "0 1px 5px 1px #ddd",
        "soft-xs": "0 3px 5px -1px rgba(0,0,0,.09),0 2px 3px -1px rgba(0,0,0,.07)",
        "soft-sm": "0 .25rem .375rem -.0625rem hsla(0,0%,8%,.12),0 .125rem .25rem -.0625rem hsla(0,0%,8%,.07)",
        "soft-md": "0 4px 7px -1px rgba(0,0,0,.11),0 2px 4px -1px rgba(0,0,0,.07)",
        "soft-lg": "0 2px 12px 0 rgba(0,0,0,.16)",
        "soft-xl": "0 20px 27px 0 rgba(0,0,0,0.05)",
        "soft-2xl": "0 .3125rem .625rem 0 rgba(0,0,0,.12)",
        "soft-3xl": "0 8px 26px -4px hsla(0,0%,8%,.15),0 8px 9px -5px hsla(0,0%,8%,.06)",
        "soft-primary-outline": "0 0 0 2px #e9aede",
        blur: "inset 0 0 1px 1px hsla(0,0%,100%,.9),0 20px 27px 0 rgba(0,0,0,.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 23px 45px -11px hsla(0,0%,8%,.25)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        none: "none",
      },
      borderWidth: {
         '3': '3px'
      },
      spacing: {
        px: "1px",
        2.7: "0.675rem",
        "2.7-em": "0.675em",
      },
      keyframes: {
         waiter: {
           '0%': {
              width: '0rem',
              height: '0rem',
               opacity: 0
            },
           '4.9%': {
              width: '0rem',
              height: '0rem',
               opacity: 0
            },
           '5%': {
              width: '0rem',
              height: '0rem',
               opacity: 1
            },
           '100%': {
              width: '4.5rem',
              height: '4.5rem',
              opacity: 0
            },
         },
         loader: {
            '0%, 100%': {
               background: '#e2e8f0'
             },
             '50%': {
               background: '#f1f5f9'
             }
         }
       },
      animation:{
         waiter: 'waiter 0.6s cubic-bezier(0, 0.2, 0.8, 1) 0s infinite',
         waiter2: 'waiter 0.6s cubic-bezier(0, 0.2, 0.8, 1) 0.3s infinite',
         loader: 'loader 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      backgroundImage: ({ theme }) => ({
        none: "none",
        "gradient-fuchsia": "linear-gradient(310deg," + theme("colors.purple.700") + "," + theme("colors.pink.500") + ")",
        "gradient-cyan": "linear-gradient(310deg," + theme("colors.blue.600") + "," + theme("colors.cyan.400") + ")",
        "gradient-orange": "linear-gradient(310deg," + theme("colors.red.500") + "," + theme("colors.yellow.400") + ")",
        "gradient-red": "linear-gradient(310deg," + theme("colors.red.600") + "," + theme("colors.rose.400") + ")",
        "gradient-lime": "linear-gradient(310deg," + theme("colors.green.600") + "," + theme("colors.lime.400") + ")",
        "gradient-slate": "linear-gradient(310deg," + theme("colors.slate.600") + "," + theme("colors.slate.300") + ")",
        "gradient-dark-gray": "linear-gradient(310deg," + theme("colors.gray.900") + "," + theme("colors.slate.800") + ")",
        "gradient-gray": "linear-gradient(310deg," + theme("colors.gray.400") + "," + theme("colors.gray.100") + ")",
        "gradient-celestial": "linear-gradient(310deg," + theme("colors.sky.500") + "," + theme("colors.violet.600") + ")",
        "gradient-purplelake": "linear-gradient(40deg," + theme("colors.fuchsia.500") + "," + theme("colors.red.500") + ")",

        "gradient-horizontal-dark": "linear-gradient(90deg,transparent,rgba(0,0,0,.4),transparent)",
        "gradient-horizontal-light": "linear-gradient(90deg,transparent,rgba(0,0,0,.1),transparent)",
      }),




    },
  },
  plugins: [
   require('postcss-import'), // postcss-import needs to be first
   require('flowbite/plugin')
 ],
}
