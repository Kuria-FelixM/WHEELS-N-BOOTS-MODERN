import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import Button from '../components/Button'

export default function GearRoom() {
  const gearCategories = [
    {
      title: 'Climbing Gear',
      description: 'Professional-grade climbing equipment for all skill levels, from beginner to advanced mountaineers.',
      image: '/img/khantegri.jpg',
    },
    {
      title: 'Hiking Essentials',
      description: 'Durable and lightweight hiking boots, backpacks, and accessories for trail adventures.',
      image: '/img/run.jpg',
    },
    {
      title: 'Adventure Apparel',
      description: 'Weather-resistant clothing and protective gear designed for outdoor expeditions.',
      image: '/img/potrait_abtt.jpg',
    },
    {
      title: 'Camping Equipment',
      description: 'Tents, sleeping bags, and camping gear for comfortable nights in the wilderness.',
      image: '/img/amadablam.jpg',
    },
    {
      title: 'Safety Equipment',
      description: 'First aid kits, emergency supplies, and safety devices for every adventure.',
      image: '/img/mt-kenyaa.jpg',
    },
    {
      title: 'Navigation Tools',
      description: 'Compasses, GPS devices, and maps to ensure you stay on the right path.',
      image: '/img/mtkenya.jpg',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Gear Room"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-primary mb-6 text-center">
          Premium Adventure Gear
        </h2>
        
        <p className="text-lg text-secondary mb-12 text-center max-w-2xl mx-auto leading-relaxed font-lora">
          Gear up for your next adventure with our carefully curated selection of adventure equipment. Each item is tested and approved by our team of experienced adventurers.
        </p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {gearCategories.map((category, idx) => (
            <Card key={idx} {...category} />
          ))}
        </div>

        <div className="bg-light p-8 rounded-lg border-l-4 border-primary mb-12">
          <h3 className="font-zuumebold text-primary text-xl mb-4">
            Why Choose Our Gear?
          </h3>
          <ul className="space-y-3 font-lora text-secondary">
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Tested and trusted by professional guides and adventurers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>High-quality brands that last through multiple expeditions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Expert advice and personalized recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Competitive pricing with rental and purchase options</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Maintenance and repair services available</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Lifetime support and warranty on selected items</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Button size="lg">
            Browse Full Catalog
          </Button>
        </div>
      </section>
    </div>
  )
}
