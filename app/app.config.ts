export default defineAppConfig({
  global: {
    picture: {
      dark: '/hero/profile.jpg',
      light: '/hero/profile.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://t.me/Limbo_saeed',
    email: 'saeed.mohammadi.1384@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [ {
      'icon': 'i-simple-icons-telegram',
      'to': 'https://t.me/Limbo_saeed',
      'target': '_blank',
      'aria-label': 'Saeed on Telegram'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/saeed-mohammadii',
      'target': '_blank',
      'aria-label': 'Saeed on GitHub'
    }]
  }
})
