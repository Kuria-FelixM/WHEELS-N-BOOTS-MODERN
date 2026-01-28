import HeroSection from '../components/HeroSection'

export default function ThreeElements() {
  return (
    <div>
      <HeroSection
        title="Explore. Learn. Make Memories."
        backgroundImage="/img/resize-17401282241312685601rrthree.jpg"
        logo="/img/logo.png"
      />

      {/* Main Section */}
      <section className="py-12 md:py-20 w-full md:pl-[20%]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-zuumebold text-clamp-h1 text-center mb-8 text-primary">
            The Three Elements
          </h1>
          
          <p className="font-lora text-clamp-p text-center text-gray-700 mb-12 max-w-4xl mx-auto">
            At the core of every great expedition lie three powerful elements: Explore, Learn, and Make Memories. These are not merely words; they are the pillars that define our journey into the wild, the essence of every mountain conquered, and the soul of each adventure lived.
          </p>

          {/* Explore Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/IMG_20220226_162853_1.jpg"
                alt="Explore"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-zuumebold text-clamp-h2 mb-4 text-primary">
                Explore
              </h2>
              <p className="font-lora text-clamp-p text-gray-700">
                Exploration is about stepping beyond the boundaries of the known and embracing the thrill of discovery. It's about venturing into uncharted territories, pushing physical and mental limits, and seeking new horizons. Every expedition is a voyage into the unknown, where courage meets curiosity, and the spirit of adventure comes alive.
              </p>
            </div>
          </div>

          {/* Learn Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div>
              <h2 className="font-zuumebold text-clamp-h2 mb-4 text-primary">
                Learn
              </h2>
              <p className="font-lora text-clamp-p text-gray-700">
                Every mountain teaches a lesson. Whether it's resilience in the face of adversity, humility before nature's majesty, or the importance of preparation and teamwork, the mountains are universities of wisdom. Learning through adventure transforms knowledge into lived experience, creating insights that shape character and broaden perspective.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/amadablam.jpg"
                alt="Learn"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Make Memories Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/img/manaslu.jpg"
                alt="Make Memories"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-zuumebold text-clamp-h2 mb-4 text-primary">
                Make Memories
              </h2>
              <p className="font-lora text-clamp-p text-gray-700">
                The moments we share on mountain peaks, in remote wilderness, and alongside fellow adventurers become the stories we carry for life. These memories are not just personal milestones; they are bonds forged in shared challenges, victories celebrated together, and experiences that become part of our identity. They are the treasures that money cannot buy and time cannot diminish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
