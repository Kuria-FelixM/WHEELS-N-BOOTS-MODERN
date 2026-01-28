import HeroSection from '../components/HeroSection'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function MtKenya() {
  const galleryImages = [
    { src: '/img/1682942117459 (1).jpg', alt: 'Mt Kenya Expedition 1' },
    { src: '/img/1682942117524 (1).jpg', alt: 'Mt Kenya Expedition 2' },
    { src: '/img/1682942117600.jpg', alt: 'Mt Kenya Expedition 3' },
    { src: '/img/mtkenya.jpg', alt: 'Mt Kenya Summit' },
    { src: '/img/IMG_3619_(1).jpg', alt: 'Mt Kenya Adventure' },
    { src: '/img/IMG_20230601_143829.jpg', alt: 'Mt Kenya Landscape' },
  ]

  return (
    <div>
      <HeroSection 
        
        backgroundImage="/img/IMG_20230914_122033.jpg"
        logo="/img/logo.png"
      />

      {/* Upcoming Expeditions */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zuumebold text-clamp-h2 text-primary text-center mb-4">
            Upcoming Guided Expeditions
          </h2>
          <p className="text-center text-secondary mb-12 text-clamp-p">
            Join us for an exclusive Mt Kenya climbing experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/img/IMG_20230913_121531.jpg"
                alt="Coming Soon Expedition"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-zuumebold text-primary mb-3 text-center">
                  Coming Soon
                </h3>
                <p className="text-secondary text-center text-sm mb-6">
                  Register for our upcoming Mt Kenya guided expeditions and experience the thrill of climbing Africa's second-highest mountain.
                </p>
                <Link to="/contact?type=guiding" className="block">
                  <Button className="w-full text-center">
                    Register Interest
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-4xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-primary mb-6">
          Conquer East Africa Iconic Peak
        </h2>
        
        <p className="text-lg text-secondary mb-6 leading-relaxed font-lora">
          Mount Kenya stands as the second-highest peak in Africa at 5,199 meters (17,057 feet). Our expertly guided tours offer a once-in-a-lifetime opportunity to summit this majestic mountain while learning about the diverse ecosystems and local cultures of Kenya.
        </p>

        

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <img 
            src="/img/mtkenya.jpg" 
            alt="Mount Kenya"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <img 
            src="/img/mt-kenyaa.jpg" 
            alt="Mount Kenya Summit"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-accent p-8 rounded-lg mb-8">
          <h3 className="font-zuumebold text-primary text-xl mb-4">
            What to Expect
          </h3>
          <p className="text-secondary font-lora mb-4 leading-relaxed">
            Each expedition includes acclimatization days to help your body adjust to the altitude. Our guides are trained in wilderness first aid and mountain safety. We provide all technical equipment and ensure a supportive environment for climbers of all experience levels.
          </p>
          <p className="text-secondary font-lora leading-relaxed">
            The journey through diverse ecological zones—from dense forests to alpine meadows and beyond—reveals Kenya's incredible natural biodiversity. Summit day starts early to catch the magnificent sunrise from the peak.
          </p>
        </div>

        <div className="text-center">
          <Link to="/contact?type=guiding" className="inline-block mb-4">
            <Button size="lg">
              Book Your Expedition
            </Button>
          </Link>
          <p className="text-secondary text-sm font-lora">
            Questions? <Link to="/contact?type=guiding" className="text-primary hover:text-accent font-zuumebold transition-colors">Contact us</Link> to learn more
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zuumebold text-clamp-h2 text-primary text-center mb-12">
            Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square md:aspect-auto md:h-64 shadow-lg hover:shadow-xl transition-shadow"
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
    </div>
  )
}
