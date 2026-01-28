import HeroSection from '../components/HeroSection'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function MtKenya() {
  return (
    <div>
      <HeroSection 
        title="Mount Kenya Guided Tours"
        backgroundImage="/img/mtkenya.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-4xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 text-primary mb-6">
          Conquer East Africa's Iconic Peak
        </h2>
        
        <p className="text-lg text-secondary mb-6 leading-relaxed font-lora">
          Mount Kenya stands as the second-highest peak in Africa at 5,199 meters (17,057 feet). Our expertly guided tours offer a once-in-a-lifetime opportunity to summit this majestic mountain while learning about the diverse ecosystems and local cultures of Kenya.
        </p>

        <div className="bg-light p-8 rounded-lg mb-8 border-l-4 border-primary">
          <h3 className="font-zuumebold text-primary text-xl mb-4">
            Tour Highlights
          </h3>
          <ul className="space-y-3 font-lora text-secondary">
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Expert guidance from experienced Kenyan mountaineers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Multiple route options (Point Lenana, Nelion, and Batian)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Acclimatization programs to ensure safety and success</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>All-inclusive packages with meals and accommodation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Photography opportunities at spectacular vantage points</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Suitable for all fitness levels</span>
            </li>
          </ul>
        </div>

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
    </div>
  )
}
