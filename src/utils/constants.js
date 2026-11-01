// utils/constants.js

export const SITE_NAME = 'WHEELS N BOOTS'
export const SITE_URL = 'https://wheelsnboots.com'
export const SITE_DESCRIPTION = 'Adventure, Guiding & Speaking Experiences'

export const COLORS = {
  primary: '#4E342E',
  secondary: '#757575',
  light: '#212121',
  dark: '#D84315',
  accent: 'rgba(117, 117, 117, 0.1)',
}

export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const MENU_ITEMS = [
  {
    label: 'About',
    submenu: [
      { label: 'James Muhia', href: '/about' },
      { label: 'The Three Elements', href: '/about#elements' },
    ],
  },
  {
    label: 'Projects',
    submenu: [
      { label: 'Past Projects', href: '/projects?type=past' },
      { label: 'Upcoming Projects', href: '/projects?type=upcoming' },
    ],
  },
  {
    label: 'Guided Tours',
    submenu: [
      { label: 'Enquire Now', href: '/contact?type=guiding' },
    ],
  },
  {
    label: 'Speaking',
    submenu: [
      { label: 'Enquire Now', href: '/contact?type=speaking' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/wheelsnboots',
  instagram: 'https://instagram.com/wheelsnboots',
  twitter: 'https://twitter.com/wheelsnboots',
  email: 'contact@wheelsnboots.com',
}

export const CONTACT_INFO = {
  email: 'contact@wheelsnboots.com',
  phone: '+254 (XXX) XXX-XXXX',
  location: 'Kenya, East Africa',
}

// SEO Metadata for each page
export const SEO_META = {
  home: {
    title: 'WHEELS N BOOTS | Adventure, Guiding & Speaking',
    description: 'Explore transformative adventure experiences, expert guiding, and inspiring speaking engagements with James Muhia',
  },
  about: {
    title: 'About James Muhia | Adventure Guide & Speaker',
    description: 'Learn about James Muhia\'s 15+ years of experience in adventure guiding, expedition leadership, and motivational speaking',
  },
  projects: {
    title: 'Past & Upcoming Projects | WHEELS N BOOTS',
    description: 'Explore our award-winning adventure expeditions and upcoming projects across Africa',
  },
  shop: {
    title: 'Adventure Gear & Services | WHEELS N BOOTS Shop',
    description: 'Browse our collection of adventure guides, training programs, merchandise, and services',
  },
  contact: {
    title: 'Get in Touch | WHEELS N BOOTS',
    description: 'Contact us for guiding services, speaking engagements, or partnership opportunities',
  },
  blog: {
    title: 'Adventure Blog | WHEELS N BOOTS',
    description: 'Read inspiring stories and guides from our adventure experiences',
  },
}
