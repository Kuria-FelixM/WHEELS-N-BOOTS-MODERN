// Service Worker registration for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration)
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })
  })
}

// Lazy loading images using Intersection Observer
const images = document.querySelectorAll('img[data-src]')
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        observer.unobserve(img)
      }
    })
  })
  images.forEach((img) => imageObserver.observe(img))
}

// Preload critical resources
function preloadResource(href, as, type) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  document.head.appendChild(link)
}

// Preload critical fonts
preloadResource('/fonts/FontsFree-Net-zuumerough-bold-2.ttf', 'font', 'font/ttf')
preloadResource('/fonts/FontsFree-Net-Lora-Regular.ttf', 'font', 'font/ttf')
