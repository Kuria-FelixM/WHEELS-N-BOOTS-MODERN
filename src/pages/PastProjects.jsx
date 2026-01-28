import HeroSection from '../components/HeroSection'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PastProjects() {
  const [showMore, setShowMore] = useState(false)

  const mainExpeditions = [
    {
      title: 'Manaslu Summit',
      image: '/img/manaslu.jpg',
      description: 'Nepal (8,163M above sea level). Together with his climbing partner, Late Cheruiyot Kirui, they became the first Africans to summit an 8000m peak without the use of supplemental oxygen or Sherpa support on 24th September 2023. This even though James had lost some of his fingers to frostbite on a previous expedition in April 2021.',
      imagePosition: 'left',
    },
    {
      title: 'Ama Dablam Summit',
      image: '/img/amadablam.jpg',
      description: 'Nepal (6,812M above sea level). The mountain that took a bite off his fingers. One of the most technically challenging mountains in the Himalayas requires a mix of snow, rock and ice climbing skills. It is during this expedition that James lost his fingers.',
      imagePosition: 'right',
    },
    {
      title: 'Lenin Peak',
      image: '/img/heerro.jpg',
      description: 'Lenin peak, Kyrgyzstan (7,134M above sea level). He became the first Kenyan to summit a 7000M peak in July 2018. Lenin Peak is also one of the 5 snow leopard award peaks.',
      imagePosition: 'left',
    },
    {
      title: 'Khan Tengri',
      image: '/img/khantegri.jpg',
      description: 'Khan Tengri, Kyrgyzstan (7,010M above sea level) August 2019. The world\'s most northern 7000M peak and one of the 5 snow leopard award peaks. Due to its high latitude, the climb was quite challenging due to thinner air, severe erratic weather and a shorter climbing season.',
      imagePosition: 'right',
    },
  ]

  const moreExpeditions = [
    {
      title: 'Summiting 5 East African peaks in 6 days',
      image: '/img/run.jpg',
      description: '(Rwenzori, Margherita Peak - Uganda, Mt. Muhavura - Uganda, Mt. Kenya, Mt. Meru - Tanzania and Mt. Kilimanjaro) Only taking short naps in between traveling from one mountain to the other, while at times using public transport, this is the most intensive and physically demanding challenge so far. This was followed by a 42km Kilimanjaro marathon in Moshi.',
      imagePosition: 'left',
    },
    {
      title: 'Mt. Kenya 3 routes run.',
      image: '/img/mtkenya.jpg',
      description: 'A 96km run through Mt. Kenya\'s 3 main hiking routes, summiting Lenana point three times.',
      imagePosition: 'right',
    },
    {
      title: 'Ultra Trail Cape Town UTCT',
      image: '/img/utc.jpeg',
      description: 'Sometimes the only way to get over your present pain is to focus on the promise of a more pleasant tomorrow. James signed up for the 100km UTCT run while lying in a hospital bed in Kathmandu, Nepal. This is after he suffered severe frost bite while on an expedition to Ama Dablam. He needed a challenge to look look forward to and keep him motivated enough to want to heal. This was not just a run through the rugged trails of table mountains; it was a therapy session and a chance for him to immerse himself in nature once again after a loss to some of his fingers to frostbite.',
      imagePosition: 'left',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Past Projects"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      {/* Quote Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-primary text-center">
            "<span className="font-zuumebold">This has been a dream come true to climb a 8000er old school.</span>"
          </h2>
        </div>
      </section>

      {/* Expeditions Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zuumebold text-clamp-h2 text-primary text-center mb-12">
            Past Expeditions
          </h2>

          <div className="space-y-12">
            {/* Main Expeditions */}
            {mainExpeditions.map((expedition, idx) => (
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
                      <p className="font-lora text-secondary leading-relaxed text-center md:text-left">
                        {expedition.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-zuumebold text-primary text-2xl text-center md:text-left mb-4">
                        {expedition.title}
                      </h4>
                      <p className="text-secondary leading-relaxed text-center md:text-left">
                        {expedition.description}
                      </p>
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

            {/* Collapsible Section */}
            {showMore && (
              <div className="space-y-12">
                {moreExpeditions.map((expedition, idx) => (
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
                          <p className="text-secondary leading-relaxed text-center md:text-left">
                            {expedition.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-zuumebold text-primary text-2xl text-center md:text-left mb-4">
                            {expedition.title}
                          </h4>
                          <p className="text-secondary leading-relaxed text-center md:text-left">
                            {expedition.description}
                          </p>
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
            )}
          </div>

          {/* Toggle Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-dark text-white font-zuumebold py-3 px-8 rounded-lg hover:bg-primary transition-colors"
            >
              {showMore ? 'Hide' : 'Read More'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
