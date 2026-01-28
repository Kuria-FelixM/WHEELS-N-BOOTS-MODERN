import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const menuItems = [
  {
    label: 'About',
    submenu: [
      { label: 'James Muhia', href: '/about' },
      { label: 'The Three Elements', href: '/about/elements' },
    ],
  },
  {
    label: 'Projects',
    submenu: [
      { label: 'Past Projects', href: '/past-projects' },
      { label: 'Upcoming Projects', href: '/upcoming-projects' },
    ],
  },
  {
    label: 'Guided Tours',
    submenu: [
      { label: 'Mt Kenya', href: '/guided-tours/mt-kenya' },
      { label: 'Gear Room', href: '/gear-room' },
    ],
  },
  {
    label: 'Press',
    submenu: [
      { label: 'Mountain Stories', href: '/press' },
      { label: 'Featured', href: '/press' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  {
    label: 'Enquire',
    submenu: [
      { label: 'General Enquiry', href: '/contact?type=general' },
      { label: 'Guiding Enquiry', href: '/contact?type=guiding' },
      { label: 'Speaking Enquiry', href: '/contact?type=speaking' },
    ],
  },
]

export default function Navigation({ isOpen, onClose }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 })

  const handleMenuToggle = (label) => {
    setOpenMenu(openMenu === label ? null : label)
  }

  const handleMouseEnter = (label, event) => {
    setOpenMenu(label)
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 8, // 8px gap
      })
    }
  }

  const handleMouseLeave = () => {
    setOpenMenu(null)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={clsx(
          'fixed top-0 left-0 h-screen w-[20%] bg-transparent z-30 px-4 py-8 overflow-y-auto overflow-visible pointer-events-none',
          'hidden md:flex md:flex-col'
        )}
      >
        <div className="space-y-4 mt-12 relative">
          {menuItems.map((item) => (
            <div 
              key={item.label}
              onMouseEnter={(e) => item.submenu && handleMouseEnter(item.label, e)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <div 
                className="relative pointer-events-auto"
              >
                {item.submenu ? (
                  <button
                    className="w-full flex items-center justify-between px-3 py-4 rounded-lg text-primary font-zuumebold text-2xl md:text-4xl hover:text-dark transition-colors h-full"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'transition-transform',
                        openMenu === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 py-4 rounded-lg text-primary font-zuumebold text-2xl md:text-4xl hover:text-dark transition-colors h-full flex items-center"
                  >
                    {item.label}
                  </Link>
                )}
              </div>

              {/* Desktop Submenu - uses fixed positioning to break out of navigation container */}
              {item.submenu && openMenu === item.label && (
                <div 
                  className="fixed space-y-1 bg-white border border-gray-200 rounded-lg p-3 min-w-max shadow-lg z-50 pointer-events-auto"
                  style={{
                    top: `${submenuPosition.top}px`,
                    left: `${submenuPosition.left}px`,
                  }}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.label}
                      to={subitem.href}
                      className="block px-4 py-2 rounded-lg text-primary text-sm font-lora hover:bg-accent hover:text-dark transition-colors whitespace-nowrap pointer-events-auto cursor-pointer"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <nav
        className={clsx(
          'fixed top-0 left-0 h-screen w-[190px] bg-white/70 backdrop-blur-sm z-20 px-6 sm:px-8 py-6 overflow-y-auto transition-transform duration-300',
          'md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-1 relative">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleMenuToggle(item.label)}
                    className="w-full flex flex-col items-center justify-center px-3 my-8 py-0 rounded-lg hover:bg-accent text-2xl text-primary font-zuumebold text-center"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'transition-transform',
                        openMenu === item.label && 'rotate-90'
                      )}
                    />
                  </button>
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg hover:bg-accent text-primary text-2xl font-zuumebold text-center"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Submenu - rendered outside nav container to avoid overflow issues */}
      {openMenu && (
        <>
          {/* Backdrop overlay - covers entire screen, closes everything when clicked */}
          <div 
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => {
              setOpenMenu(null)
              onClose()
            }}
          />
          {/* Submenu panel - appears to the right of sidebar with fixed width */}
          <div 
            className="fixed top-0 left-[190px] bg-white shadow-2xl z-40 overflow-y-auto overflow-x-hidden md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 space-y-1 w-max">
              <button
                onClick={() => setOpenMenu(null)}
                className="mb-3 text-primary font-zuumebold text-xs w-full text-left flex items-center gap-1 px-3 py-2"
              >
                ← Back
              </button>
              <h4 className="text-primary font-zuumebold text-xs px-3 py-2">
                {openMenu}
              </h4>
              {menuItems
                .find(item => item.label === openMenu)
                ?.submenu.map((subitem) => (
                  <Link
                    key={subitem.label}
                    to={subitem.href}
                    onClick={() => {
                      setOpenMenu(null)
                      onClose()
                    }}
                    className="block px-3 py-2 rounded-lg hover:bg-accent text-primary font-lora text-xs font-semibold"
                  >
                    {subitem.label}
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
