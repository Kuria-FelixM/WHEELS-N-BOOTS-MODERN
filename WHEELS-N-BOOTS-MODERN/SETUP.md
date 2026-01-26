# WHEELS N BOOTS - Modern React Stack

## Quick Start

```bash
# 1. Navigate to project
cd WHEELS-N-BOOTS-MODERN

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## What You Get

### ✅ Production-Ready Architecture
- React 18 with latest best practices
- Vite for lightning-fast builds
- Tailwind CSS with custom color scheme
- React Router for client-side navigation
- Service Worker for offline support

### ✅ Fully Mobile Optimized
- Mobile-first responsive design
- Touch-optimized UI (44x44px buttons)
- Hamburger menu on mobile
- Desktop sidebar navigation
- Optimized images and fonts

### ✅ Zero Code Repetition
- Reusable components (Button, Card, HeroSection)
- Navigation componentized
- DRY principle throughout
- Custom hooks for logic sharing
- Constants file for centralized data

### ✅ SEO Best Practices
- Meta tags management
- Open Graph support
- Twitter Cards
- Mobile-friendly viewport
- Semantic HTML

### ✅ Performance Optimized
- Lazy loading images
- Code splitting
- CSS optimization
- Service Worker caching
- Production build optimization

## Project Structure

```
WHEELS-N-BOOTS-MODERN/
├── public/                      # Static assets
│   ├── sw.js                   # Service Worker
│   ├── manifest.json           # PWA manifest
│   ├── optimization.js         # Performance
│   ├── fonts/                  # Custom fonts
│   └── img/                    # Images
├── src/
│   ├── components/             # Reusable components
│   │   ├── Button.jsx          # Button with variants
│   │   ├── Card.jsx            # Content card
│   │   ├── HeroSection.jsx     # Hero banner
│   │   ├── Navigation.jsx      # Smart nav
│   │   ├── Footer.jsx          # Footer
│   │   └── SEO.jsx             # SEO wrapper
│   ├── pages/                  # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Shop.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Blog.jsx
│   ├── layouts/
│   │   └── Layout.jsx          # Main layout
│   ├── hooks/                  # Custom hooks
│   │   ├── useFormHandler.js
│   │   └── useScrollToTop.js
│   ├── utils/                  # Utilities
│   │   ├── constants.js        # Constants
│   │   └── helpers.js          # Helper functions
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── App.jsx                 # App router
│   └── main.jsx                # Entry point
├── index.html                  # HTML entry
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── .eslintrc.json
├── .gitignore
├── README.md                   # Main docs
├── MOBILE_OPTIMIZATION.md      # Mobile guide
├── SEO_OPTIMIZATION.md         # SEO guide
└── SETUP.md                    # This file
```

## Key Features Explained

### 1. Reusable Button Component
```jsx
<Button variant="primary" size="md">Click Me</Button>
<Button variant="secondary" size="lg">Large Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

### 2. Reusable Card Component
```jsx
<Card
  title="Title"
  description="Description"
  image="/img/photo.jpg"
  link={{ label: 'Learn More', href: '/details' }}
/>
```

### 3. Navigation That Works
- Desktop: Fixed sidebar
- Mobile: Hamburger → slide-out menu
- Automatically manages state
- No code duplication

### 4. Smart Layout
- Manages navigation and footer
- Responsive margins
- Mobile overlay handling
- Accessibility built-in

## Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#4E342E',      // Change these
  secondary: '#757575',
  light: '#212121',
  dark: '#D84315',
}
```

### Change Fonts
Edit `tailwind.config.js`:
```js
fontFamily: {
  zuume: ['ZuumeRough', 'sans-serif'],
  zuumebold: ['ZuumeRoughbold', 'sans-serif'],
  lora: ['Lora', 'serif'],
}
```

### Add New Page
1. Create file in `src/pages/MyPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `Navigation.jsx`

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint
```

## Performance Metrics

After deployment, check:
- Lighthouse: Target 90+
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1

Check here: https://pagespeed.web.dev/

## Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## SEO Setup

1. Update site metadata in `src/utils/constants.js`
2. Add Google Analytics tag to `index.html`
3. Create `robots.txt` in public folder
4. Create `sitemap.xml` in public folder
5. Submit to Google Search Console

See `SEO_OPTIMIZATION.md` for detailed guide.

## Mobile Testing

### Test on Real Devices
- iPhone/iPad: Safari
- Android: Chrome, Samsung Internet
- Use Chrome DevTools device emulation

### Key Things to Test
- ✅ Hamburger menu opens/closes
- ✅ Links work on mobile
- ✅ Images display correctly
- ✅ Forms are easy to fill
- ✅ No horizontal scroll
- ✅ Buttons are easy to tap

## Browser Support

- Modern browsers (2 years back)
- iOS Safari 12+
- Chrome Android latest
- Firefox latest
- Edge latest

## Common Tasks

### Add a Product to Shop
Edit `src/pages/Shop.jsx`:
```js
const products = [
  {
    title: 'Product Name',
    description: 'Description',
    price: '$99.99',
  },
  // Add more...
]
```

### Update Contact Info
Edit `src/utils/constants.js`:
```js
export const CONTACT_INFO = {
  email: 'your-email@example.com',
  phone: '+254 XXX XXX XXX',
  location: 'Your Location',
}
```

### Change Social Links
Edit `src/utils/constants.js`:
```js
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/yourpage',
  instagram: 'https://instagram.com/yourprofile',
  // Add more...
}
```

## Troubleshooting

### Port Already in Use
```bash
# Try different port
npm run dev -- --port 3001
```

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

### Styles Not Applying
- Restart dev server
- Check Tailwind class names (no typos)
- Check CSS module imports

## Next Steps

1. ✅ Project set up
2. 🔄 Add your images
3. 🔄 Update content
4. 🔄 Connect forms to backend
5. 🔄 Set up hosting
6. 🔄 Configure analytics
7. 🔄 SEO optimization
8. 🔄 Monitor performance

## Support

For issues or questions:
1. Check the documentation files
2. Review similar components
3. Check browser console for errors
4. Test in mobile device emulation

## License

© 2024 WHEELS N BOOTS. All rights reserved.
