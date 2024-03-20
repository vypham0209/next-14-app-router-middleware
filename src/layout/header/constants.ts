//CONFIG
import { locales } from '_@landing/config/locale'

export const languages = [
  { value: 'en', label: 'English' },
  // { value: 'ar', label: 'اَلْعَرَبِيَّةُ' },
  { value: 'fr', label: 'Français' },
] satisfies Array<{ value: (typeof locales)[number]; label: string }>

export type Languages = typeof languages

export type HeaderExploringItem = {
  title: string
  link: string
  children?: HeaderExploringItem[]
}

export const exploringAnchor = 'exploring-food'
export const aboutUsAnchor = 'about-us'
export const rethinkAnchor = 'rethink-african-cuisines'
export const insightAnchor = 'insights'
export const socialWallAnchor = 'social-wall'
export const contactUsAnchor = 'contact-us'
export const startYourJourneyAnchor = 'start-your-journey'

export const headerExploringItem: HeaderExploringItem = {
  title: 'Explore Food',
  link: `/#${exploringAnchor}`,
}

export const headerItems = [
  {
    title: 'About Us',
    link: `/#${aboutUsAnchor}`,
    children: undefined,
  },
  {
    title: 'Rethink African Cuisines',
    link: `/#${rethinkAnchor}`,
    children: undefined,
  },
  {
    title: 'Insights',
    link: `/#${insightAnchor}`,
    children: undefined,
  },
  {
    title: 'Social Wall',
    link: `/#${socialWallAnchor}`,
    children: undefined,
  },
  {
    title: 'Start Your Journey',
    link: `/#${startYourJourneyAnchor}`,
    children: undefined,
  },
  {
    title: 'Contact Us',
    link: `/#${contactUsAnchor}`,
    children: undefined,
  },
  {
    title: 'Calories calculator',
    link: '/calories-calculator',
    children: undefined,
  },
]

export const loginUrlRedirectObjMap = {
  '/checkout/information': '/exploring-food',
  '/checkout/complete-order': '/exploring-food',
} as Record<string, string>
