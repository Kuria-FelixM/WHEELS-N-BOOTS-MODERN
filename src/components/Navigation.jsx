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
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleMenuToggle(item.label)}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-lg hover:bg-accent text-primary font-zuumebold text-center"
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

                  {/* Mobile Submenu */}
                  {openMenu === item.label && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          to={subitem.href}
                          onClick={onClose}
                          className="block px-3 py-2 rounded-lg hover:bg-accent text-secondary text-sm"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg hover:bg-accent text-primary font-zuumebold text-center"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
