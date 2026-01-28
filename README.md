# WHEELS N BOOTS - Modern Stack

A modern, mobile-first website for James Muhia's adventure, guiding, and speaking portfolio.

## Features

✅ **Mobile-First Design** - Fully responsive and touch-optimized
✅ **React 18** - Modern component-based architecture
✅ **Tailwind CSS** - Utility-first styling with custom color scheme
✅ **Vite** - Lightning-fast build tool and dev server
✅ **Reusable Components** - Button, Card, HeroSection, SEO wrapper
✅ **React Router** - Client-side routing
✅ **SEO Optimized** - Meta tags and structured data ready
✅ **Performance** - Lazy loading, code splitting, optimized images
✅ **Accessibility** - WCAG compliant markup and ARIA labels

## Tech Stack

- **Frontend**: React 18, React Router 6
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Code Quality**: ESLint

## Getting Started

### Installation

```bash
# Navigate to project directory
cd WHEELS-N-BOOTS-MODERN

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/         # Reusable components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── HeroSection.jsx
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   └── SEO.jsx
├── pages/             # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Shop.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Blog.jsx
├── layouts/           # Layout components
│   └── Layout.jsx
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## Mobile Optimizations

- **Responsive Images**: Using lazy loading and proper aspect ratios
- **Touch-Friendly UI**: Min 44x44px button sizes
- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Performance**: Code splitting and optimized bundle size
- **Viewport Settings**: Proper meta tags for mobile devices
- **CSS Containment**: Optimized CSS for mobile rendering

## SEO Features

- Semantic HTML structure
- Meta tag management (Open Graph, Twitter Cards)
- Mobile-friendly viewport configuration
- Structured data ready
- Fast Core Web Vitals

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android latest

## Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Mobile Lighthouse Score: 90+

## Development

```bash
# Run development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint
```

## Migration Notes

Content from original HTML files has been componentized and is ready for data integration. Update the following:

1. Replace placeholder images with actual content
2. Add contact form backend integration
3. Implement shopping cart functionality
4. Connect to blog/content management system
5. Add image optimization pipeline

## License

© 2024 WHEELS N BOOTS. All rights reserved.
