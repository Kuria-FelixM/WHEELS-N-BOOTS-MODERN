# SEO & Site Optimization Guide

## On-Page SEO

### 1. Meta Tags Strategy

Every page should have:
```jsx
<SEO
  title="Page Title"
  description="Compelling description under 160 characters"
  image="/img/og-image.jpg"
  url="https://wheelsnboots.com/page"
/>
```

### 2. Page-Specific Meta

**Home Page:**
- Title: "WHEELS N BOOTS | Adventure, Guiding & Speaking"
- Description: "Explore transformative adventure experiences, expert guiding, and inspiring speaking engagements with James Muhia"

**About Page:**
- Title: "About James Muhia | Adventure Guide & Speaker"
- Description: "Learn about James Muhia's 15+ years of experience in adventure guiding, expedition leadership, and motivational speaking"

**Shop Page:**
- Title: "Adventure Gear & Services | WHEELS N BOOTS Shop"
- Description: "Browse our collection of adventure guides, training programs, merchandise, and services"

**Projects Page:**
- Title: "Past & Upcoming Projects | WHEELS N BOOTS"
- Description: "Explore our award-winning adventure expeditions and upcoming projects across Africa"

**Contact Page:**
- Title: "Get in Touch | WHEELS N BOOTS"
- Description: "Contact us for guiding services, speaking engagements, or partnership opportunities"

## Technical SEO

### 1. Site Structure
```
https://wheelsnboots.com/
├── / (Home)
├── /about (About)
├── /projects (Projects)
├── /shop (Shop)
├── /contact (Contact)
└── /blog (Blog - upcoming)
```

### 2. URL Strategy
- Use hyphens for multi-word URLs
- Keep URLs short and descriptive
- Use lowercase letters
- Avoid query parameters when possible

### 3. Robots & Sitemaps

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://wheelsnboots.com/sitemap.xml
```

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://wheelsnboots.com/</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://wheelsnboots.com/about</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

## Content Optimization

### 1. Heading Hierarchy
- One H1 per page (usually the page title)
- Use H2 for major sections
- Use H3 for subsections
- Never skip heading levels

### 2. Keyword Strategy

**Target Keywords:**
- Primary: "Adventure guide Kenya"
- Secondary: "Mount Kenya expedition", "Guided tours Africa"
- Long-tail: "Experienced adventure guide services Kenya"

### 3. Content Length
- Minimum 300 words per page
- Blog posts: 1000+ words
- Product pages: 200+ words

### 4. Content Freshness
- Update blog regularly
- Keep dates visible
- Mark dates on posts
- Update outdated content

## Link Strategy

### Internal Linking
```jsx
// Link related pages
<Link to="/projects">Explore Our Adventures</Link>
```

Internal links help:
- Site navigation
- Distribute page authority
- Keep visitors longer

### External Links
- Link to authoritative sources
- Use descriptive anchor text
- Open external links in new tab

## Image Optimization

### Image SEO
```jsx
<img
  src="mountain-kenya-climb.jpg"
  alt="Group climbing Mount Kenya at sunrise"
  title="Mount Kenya Expedition"
  loading="lazy"
/>
```

### Image Best Practices
- Descriptive filenames: `mount-kenya-expedition.jpg`
- Descriptive alt text (8-12 words)
- Optimize file size (< 100KB for web)
- Use modern formats (WebP with JPG fallback)
- Responsive images with srcset

## Schema Markup

Add structured data for rich snippets:

```jsx
// Organization Schema
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "WHEELS N BOOTS",
  "url": "https://wheelsnboots.com",
  "logo": "https://wheelsnboots.com/img/logo.png",
  "description": "Adventure, Guiding & Speaking Services",
  "sameAs": [
    "https://facebook.com/wheelsnboots",
    "https://instagram.com/wheelsnboots"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+254...",
    "email": "contact@wheelsnboots.com"
  }
}
</script>
```

Add to `index.html` in `<head>`

## Mobile SEO

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Mobile Usability
- ✅ Done: Hamburger menu
- ✅ Done: Touch-friendly buttons
- ✅ Done: Readable font sizes
- ✅ Done: Proper spacing
- ✅ Done: No horizontal scroll

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Performance Optimization

### 1. Image Optimization
```bash
# Compress images
npm install -g imagemin-cli
imagemin src/img --out-dir=public/img
```

### 2. Code Splitting
Already configured with React Router. Each page loads separately.

### 3. Caching Strategy
Service Worker implements:
- Cache-first for assets
- Network-first for HTML
- Stale-while-revalidate for images

### 4. Compression
- Gzip for text (build tool)
- Brotli for better compression
- Set in deployment platform

## Google Analytics Integration

Add to `index.html` in `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Track important events:
- Page views (automatic)
- Button clicks
- Form submissions
- Video plays
- Download clicks

## Local SEO

If targeting Kenya specifically:

1. **Add location to schema:**
```json
"areaServed": {
  "@type": "Country",
  "name": "Kenya"
}
```

2. **Meta location tag:**
```html
<meta name="geo.placename" content="Kenya">
<meta name="geo.region" content="KE">
```

3. **Local keywords:**
- "Adventure guide Kenya"
- "Nairobi expedition services"
- "East Africa guide"

## Backlink Strategy

1. **Guest posting** on adventure/travel blogs
2. **Local directories** - List in Kenya business directories
3. **Press releases** - Announce new expeditions
4. **Partner sites** - Link exchanges with complementary businesses
5. **Social mentions** - Share on social media

## Monitoring & Tools

### Essential Tools
- Google Search Console
- Google Analytics 4
- Lighthouse
- Mobile-Friendly Test
- Schema Markup Validator

### Monthly Checklist
- [ ] Check Search Console for issues
- [ ] Monitor Core Web Vitals
- [ ] Review top pages
- [ ] Check backlinks
- [ ] Update outdated content
- [ ] Fix broken links
- [ ] Review mobile performance

## Common SEO Mistakes to Avoid

❌ Multiple H1 tags per page
❌ Thin content (< 300 words)
❌ Poor internal linking
❌ Unoptimized images
❌ Mobile unfriendly
❌ Slow page load
❌ Duplicate content
❌ Broken links
❌ Missing meta descriptions
❌ Flash content

## Competitor Analysis

Analyze similar sites:
- "adventure guide Kenya"
- "expedition services Africa"
- "speaking engagements"

Check their:
- Page structure
- Keyword usage
- Backlink sources
- Content strategy

## Implementation Checklist

### Phase 1: Foundation
- [ ] Add robots.txt
- [ ] Create sitemap.xml
- [ ] Set up Google Search Console
- [ ] Configure Google Analytics 4
- [ ] Add schema markup

### Phase 2: Content
- [ ] Write compelling meta descriptions
- [ ] Optimize page titles
- [ ] Add internal links
- [ ] Create blog content
- [ ] Optimize images

### Phase 3: Technical
- [ ] Fix Core Web Vitals
- [ ] Enable HTTPS
- [ ] Set up CDN
- [ ] Configure caching
- [ ] Test mobile rendering

### Phase 4: Promotion
- [ ] Build backlinks
- [ ] Social media integration
- [ ] Email marketing
- [ ] Local SEO
- [ ] Press releases

## Expected Results Timeline

- **Month 1:** Indexing begins
- **Month 2-3:** Initial rankings
- **Month 4-6:** Climbing rankings
- **Month 6+:** Established rankings

Target first-page rankings for:
- "Adventure guide Kenya"
- "Mount Kenya expedition"
- "Guided tours Kenya"
