import HeroSection from '../components/HeroSection'
import { Link } from 'react-router-dom'

export default function UpcomingProjects() {
  const upcomingExpeditions = [
    {
      title: 'Tour of the Stans',
      image: '/img/stans.jpg',
      description: 'A tour of Central Asian countries ending with the suffix \'stan\'. They were once part of the Soviet Union. James\'s plan is to explore these far lands by use of motorcycle. Starting from Dubai, UAE then crossing by boat to Iran. The ride will go through Turkmenistan, Uzbekistan, Kazakhstan, Krygzstan, Tajikistan, Afghanistan and finally Pakistan. While exploring these vast lands, James will climb selected mountains along the way. Notably, Mt. Damavand in Iran (5609M), Somoni (Communism)(7495 m) and Korzhenevskaya (7105 m) peaks in Tajikistan. The last 2 peaks are part of the snow Leopard peaks. This tour is set to begin on 1st June 2025 and expected to last for two and a half months. Partnership opportunities are available.',
      imagePosition: 'left',
      hasPartnership: true,
    },
    {
      title: 'County tour',
      image: '/img/county.jpeg',
      description: 'Motorcycle ride around each of the 47 counties in Kenya, highlighting each county\'s uniqueness while exploring trails. Details coming soon. Partnership opportunities are available.',
      imagePosition: 'right',
      hasPartnership: true,
    },
    {
      title: 'K2, The Ultimate Challenge',
      image: '/img/k2.jpg',
      description: 'It has been James\'s dream to attempt a summit of K2. Soon, the attempt will be made. Details coming soon. Partnership opportunities are available.',
      imagePosition: 'left',
      hasPartnership: true,
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Upcoming Projects"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      {/* Quote Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-primary text-center">
            "<span className="font-zuumebold">Life is one big adventure. You have one shot. Take it</span>!"
          </h2>
        </div>
      </section>

      {/* Expeditions Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zuumebold text-clamp-h2 text-primary text-center mb-12">
            Upcoming Expeditions
          </h2>

          <div className="space-y-12">
            {upcomingExpeditions.map((expedition, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-6 items-center">
                {expedition.imagePosition === 'left' ? (
                  <>
                    <img
                      src={expedition.image}
                      alt={expedition.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div>
                      <h4 className="font-zuumebold text-primary text-2xl text-center md:text-left mb-4">
                        {expedition.title}
                      </h4>
                      <p className="text-secondary leading-relaxed text-center md:text-left mb-6">
                        {expedition.description}
                      </p>
                      {expedition.hasPartnership && (
                        <div className="text-center md:text-left">
                          <Link
                            to="/contact?type=general"
                            className="inline-block bg-dark text-white font-zuumebold py-2 px-6 rounded-lg hover:bg-primary transition-colors"
                          >
                            Partner with Us
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-zuumebold text-primary text-2xl text-center md:text-left mb-4">
                        {expedition.title}
                      </h4>
                      <p className="text-secondary leading-relaxed text-center md:text-left mb-6">
                        {expedition.description}
                      </p>
                      {expedition.hasPartnership && (
                        <div className="text-center md:text-left">
                          <Link
                            to="/contact?type=general"
                            className="inline-block bg-dark text-white font-zuumebold py-2 px-6 rounded-lg hover:bg-primary transition-colors"
                          >
                            Partner with Us
                          </Link>
                        </div>
                      )}
                    </div>
                    <img
                      src={expedition.image}
                      alt={expedition.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
