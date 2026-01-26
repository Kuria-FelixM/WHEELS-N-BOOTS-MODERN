import { Link } from 'react-router-dom'

export default function HeroSection({ title, subtitle, backgroundImage, children, logo }) {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #4E342E 0%, #757575 100%)',
      }}
    >
      {/* Logo at top center - positioned absolutely */}
      {logo && (
        <Link to="/" className="absolute top-4 left-1/2 z-20 hover:opacity-80 transition-opacity" style={{ transform: 'translateX(-50%)' }}>
          <img
            src={logo}
            alt="Logo"
            className="w-[20vw] h-auto"
          />
        </Link>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-8 max-w-4xl">
        {title && (
          <h1 className="font-zuumebold text-clamp-h1 text-primary mb-4">
            {title}
          </h1>
        )}
        {children && <div>{children}</div>}
      </div>
    </section>
  )
}
