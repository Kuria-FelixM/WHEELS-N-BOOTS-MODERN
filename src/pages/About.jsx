import HeroSection from '../components/HeroSection'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <HeroSection 
        backgroundImage="/img/hgt.jpg"
        logo="/img/logo.png"
      />

      {/* Quote Section */}
      <section className="py-12 md:py-20 w-full md:pl-[20%]">
        <div className="max-w-4xl mx-auto px-4 sm:px-10 lg:px-8 text-center">
          <h2 className="font-zuumebold text-clamp-h3 mb-4 text-primary">
            I am haunted by my future goals, not my past failures. I am haunted by what i may still become. I am haunted by my own continued thirst for evolution. It is a lifelong quest for more knowledge, more courage, more humility and more belief.
          </h2>
          <h4 className="font-zuumebold text-clamp-h5 text-primary">
            David Goggins
          </h4>
        </div>
      </section>

      {/* James Muhia Bio Section */}
      <section className="py-12 md:py-20 w-full md:pl-[20%]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-zuumebold text-clamp-h1 text-center mb-8 text-primary">
            James Muhia
          </h1>
          <h3 className="font-zuumebold text-clamp-h2 text-center mb-12 text-primary">
            Outdoor Enthusiast and Adventure Seeker
          </h3>
          
          <p className="font-lora text-clamp-p text-gray-700 mb-8">
            James is a passionate explorer with a love for the great outdoors. As a recreational trail and mountain runner, he thrives on challenging terrains, pushing his limits in nature's most rugged landscapes. His passion for heights extends to rock climbing and mountaineering expeditions, where he embraces the thrill of seeking summit peaks and experiencing breathtaking vistas.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/1682942117459 (1).jpg"
                alt="James climbing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/run.jpg"
                alt="James running"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="font-lora text-clamp-p text-gray-700 mb-8">
            Beyond the trails and mountains, James is also an adventure motorcyclist, navigating remote and untamed terrains on two wheels in search of new experiences. Whether running through wild trails, climbing towering summits, or riding across vast landscapes, he is always seeking the next great adventure.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/1682942117600.jpg"
                alt="James motorcycling"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/IMG_20220227_004659.jpg"
                alt="James adventure"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
