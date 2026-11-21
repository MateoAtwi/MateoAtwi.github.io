export const SITE = {
  title: 'Mateo Atwi',
  description:
    "Engineer and builder. I run US Frame Factory with my brother, Tiago. This site collects the work and projects I've done along the way.",
  url: 'https://mateoatwi.com',
  email: 'mateoatwi@gmail.com',
  github: 'https://github.com/MateoAtwi',
  googleAnalyticsId: 'G-QMGPRF8HTC',
} as const;

export const NAV = [
  { label: 'Work & Education', short: 'Work', href: '/work&education/' },
  { label: 'Projects', short: 'Projects', href: '/projects/' },
  { label: 'Collections', short: 'Collections', href: '/collections/' },
  { label: 'About', short: 'About', href: '/about/' },
] as const;
