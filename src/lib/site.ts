export const SITE = {
  title: 'Mateo Atwi',
  description: "This website is here for me to summarize and collect all that I've done and worked on. Enjoy!",
  url: 'https://mateoatwi.com',
  email: 'mateoatwi@gmail.com',
  github: 'https://github.com/MateoAtwi',
  githubUser: 'MateoAtwi',
  googleAnalyticsId: 'G-QMGPRF8HTC',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Work & Education', href: '/work&education/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Collections', href: '/collections/' },
  { label: 'About', href: '/about/' },
] as const;

export const BLOG_CATEGORIES = ['Ideologies', 'Operating Principles', 'Commentary'] as const;

export const BLOG_CATEGORY_NOTES: Record<(typeof BLOG_CATEGORIES)[number], string> = {
  Ideologies: 'What I believe and why.',
  'Operating Principles': 'How I try to work, lead, and make decisions.',
  Commentary: 'My take on things I read, see, and run into.',
};
