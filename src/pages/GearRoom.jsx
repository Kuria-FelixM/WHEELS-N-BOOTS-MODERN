import { useState } from 'react'
import HeroSection from '../components/HeroSection'

export default function GearRoom() {
  const [expandedAccordion, setExpandedAccordion] = useState(null)

  const gearItems = [
    {
      id: 'climbing',
      title: 'Climbing Gear',
      description: 'Designed for safety, durability, and performance.',
    },
    {
      id: 'running',
      title: 'Running Gear',
      description: 'Running Gear designed for speed, agility, and endurance.',
    },
    {
      id: 'riding',
      title: 'Riding',
      description: 'Designed for protection, comfort, and performance, this gear enhances every journey.',
    },
    {
      id: 'firstaid',
      title: 'First Aid Kit',
      description: 'A well-stocked First Aid Kit is essential for outdoor adventures, ensuring readiness for any situation.',
    },
  ]

  const whyChooseUs = [
    'Tested and trusted by professional guides and adventurers',
    'High-quality brands that last through multiple expeditions',
    'Expert advice and personalized recommendations',
    'Competitive pricing with rental and purchase options',
    'Maintenance and repair services available',
    'Lifetime support and warranty on selected items',
  ]

  return (
    <div>
      <HeroSection 
        title="Gear Room"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Image */}
          <div className="flex items-center justify-center">
            <img 
              src="/img/gear.jpg" 
              alt="Muhia's Favourite Gear" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
              style={{ maxHeight: '70vh' }}
            />
          </div>

          {/* Right side - Accordion */}
          <div>
            <h3 className="font-zuumebold text-primary text-2xl md:text-3xl mb-6">
              Muhia's Favourite Gear
            </h3>

            <div className="space-y-2">
              {gearItems.map((item) => (
                <div 
                  key={item.id}
                  className="border border-gray-300 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedAccordion(
                      expandedAccordion === item.id ? null : item.id
                    )}
                    className="w-full flex items-center justify-between px-4 py-3 bg-light hover:bg-gray-100 transition-colors text-left"
                  >
                    <h4 className="font-zuumebold text-primary text-lg">
                      {item.title}
                    </h4>
                    <span className={`text-primary text-xl transition-transform ${
                      expandedAccordion === item.id ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>

                  {expandedAccordion === item.id && (
                    <div className="px-4 py-4 bg-white border-t border-gray-300">
                      <p className="font-lora text-secondary">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-light p-8 rounded-lg border-l-4 border-primary mt-16">
          <h3 className="font-zuumebold text-primary text-2xl md:text-3xl mb-6">
            Why Choose Our Gear?
          </h3>
          <ul className="space-y-3 font-lora text-secondary">
            {whyChooseUs.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-3 font-bold text-lg">•</span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
