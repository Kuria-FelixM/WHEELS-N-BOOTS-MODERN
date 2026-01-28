import HeroSection from '../components/HeroSection'

export default function Home() {
  const partners = [
    { name: 'GFS', image: '/img/GFS Logo.png' },
    { name: 'Samsung', image: '/img/samsung_logo.png' },
    { name: 'James', image: '/img/jameslogo.jpeg' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="James Muhia"
        backgroundImage="/img/IMG_20230914_124753.jpg"
        logo="/img/logo.png"
      />

      {/* Partners Section */}
      <section className="py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-center mb-12 text-primary">
          Our Partners
        </h2>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 items-center">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex justify-center items-center h-40">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-3/4 h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
