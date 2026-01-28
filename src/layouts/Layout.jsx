import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  const [sidenavOpen, setSidenavOpen] = useState(false)

  useEffect(() => {
    // Close sidenav on route change and larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidenavOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Mobile hamburger menu */}
      <button
        onClick={() => setSidenavOpen(!sidenavOpen)}
        className="md:hidden fixed top-4 right-4 z-40 p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Toggle navigation"
      >
        {sidenavOpen ? (
          <X size={36} className="text-primary" />
        ) : (
          <Menu size={36} className="text-primary" />
        )}
      </button>

      {/* Overlay for mobile */}
      {sidenavOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden z-20"
          onClick={() => setSidenavOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Navigation isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />

      {/* Main Content Wrapper */}
      <main className="w-full flex flex-col">
        {children}
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
