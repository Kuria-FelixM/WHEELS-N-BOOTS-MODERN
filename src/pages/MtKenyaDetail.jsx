import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

export default function MtKenyaDetail() {
  const galleryImages = [
    { src: '/img/1682942117459 (1).jpg', alt: 'Mt Kenya Expedition 1' },
    { src: '/img/1696918612099.JPG', alt: 'Mt Kenya Expedition 2' },
    { src: '/img/mtkenya.jpg', alt: 'Mt Kenya Summit' },
    { src: '/img/IMG_20220227_004659.jpg', alt: 'Mt Kenya Peak' },
    { src: '/img/IMG_3619_(1).jpg', alt: 'Mt Kenya Adventure' },
    { src: '/img/IMG_20230601_143829.jpg', alt: 'Mt Kenya Landscape' },
  ]

  const expeditions = [
    {
      image: '/img/IMG_20230913_121531.jpg',
      title: 'Coming Soon',
      description: 'Register for our upcoming Mt Kenya guided expeditions and experience the thrill of climbing Africa\'s second-highest mountain.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Mt Kenya Guided Tours"
        backgroundImage="/img/mt-kenya.jpg"
        logo="/img/logo.png"
      >
        <p className="text-primary text-clamp-p mt-4 max-w-2xl mx-auto px-4">
          Experience an unforgettable journey to Africa's second-highest mountain with expert guides
        </p>
      </HeroSection>

      {/* Upcoming Expeditions Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-zuumebold text-primary text-center mb-4">
            Upcoming Guided Expeditions
          </h2>
          <p className="text-center text-secondary mb-12 text-clamp-p">
            Join us for an exclusive Mt Kenya climbing experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expeditions.map((expedition, index) => (
              <Card key={index}>
                <img
                  src={expedition.image}
                  alt={expedition.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-zuumebold text-primary mb-3 text-center">
                    {expedition.title}
                  </h3>
                  <p className="text-secondary text-center mb-6">
                    {expedition.description}
                  </p>
                  <button className="w-full bg-dark text-white font-zuumebold py-3 rounded-lg hover:bg-primary transition-colors text-center">
                    Register Interest
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-zuumebold text-primary text-center mb-12">
            Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square md:aspect-auto md:h-64"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Details Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-zuumebold text-primary text-center mb-8">
            About Mt Kenya
          </h2>

          <div className="space-y-6 text-secondary text-clamp-p">
            <p>
              Mount Kenya is Africa's second-highest mountain, standing at 5,199 meters (17,057 feet) above sea level. Located in central Kenya, this iconic peak offers climbers from all experience levels the opportunity to tackle one of Africa's most rewarding mountains.
            </p>

            <p>
              Our guided tours provide comprehensive support from experienced guides who know the mountain intimately. Whether you're a seasoned climber or attempting your first high-altitude peak, our team ensures a safe and memorable experience.
            </p>

            <div className="bg-accent p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-zuumebold text-primary mb-4">
                What to Expect
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-dark font-zuumebold mr-3">•</span>
                  <span>Expert guides with years of climbing experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dark font-zuumebold mr-3">•</span>
                  <span>Well-planned itineraries with proper acclimatization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dark font-zuumebold mr-3">•</span>
                  <span>Quality camping equipment and meals included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-dark font-zuumebold mr-3">•</span>
                  <span>Stunning views and unforgettable mountain experience</span>
                </li>
              </ul>
            </div>

            <p className="text-center mt-8">
              <Link
                to="/contact?type=guiding"
                className="inline-block bg-dark text-white font-zuumebold py-3 px-8 rounded-lg hover:bg-primary transition-colors"
              >
                Inquire About Climbing
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
