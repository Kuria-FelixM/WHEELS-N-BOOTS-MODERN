import HeroSection from '../components/HeroSection'

export default function Press() {
  return (
    <div>
      <HeroSection
        title="Press"
        backgroundImage="/img/1698391153866.JPG"
        logo="/img/logo.png"
      />

      {/* Press Section */}
      <section className="max-w-6xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 mb-12 text-primary text-center">
          Featured Press & Media
        </h2>

        {/* First Feature */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <h3 className="font-zuumebold text-clamp-h3 mb-4 text-primary">
              Salmon Three Route Challenge
            </h3>
            <p className="font-lora text-clamp-p text-gray-700 mb-4">
              This grueling challenge involved ascending and descending Mount Kenya via the Naro Moru, 
              Chogoria, and Sirimon routes, each presenting unique technical and physical demands. The trio's 
              accomplishment not only set a new benchmark for speed and efficiency on Mount Kenya but also 
              underscored their exceptional training and resilience. Their achievement has been widely 
              celebrated within the mountaineering community, inspiring both seasoned climbers and aspiring adventurers.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-80 md:h-96">
            <video 
              src="/img/ntv.mp4" 
              className="w-full h-full object-cover"
              controls
            />
          </div>
        </div>

        {/* Second Feature */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="rounded-lg overflow-hidden h-80 md:h-96 order-2 md:order-1">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/BJ3lp3d5FXI?si=uU5oF0srPZfkZYMH"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="font-zuumebold text-clamp-h3 mb-4 text-primary">
              Conquering Mountains
            </h3>
            <p className="font-lora text-clamp-p text-gray-700">
              Nepal (6,812M above sea level). One of the most technically challenging mountains in the Himalayas, 
              requiring a mix of snow, rock and ice climbing skills. The mountain that tested limits and changed perspective.
            </p>
          </div>
        </div>

        {/* Third Feature */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="rounded-lg overflow-hidden h-80 md:h-96">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/6kjS6zudUKk?si=-MMedQ_x3J_k_DVs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div>
            <h3 className="font-zuumebold text-clamp-h3 mb-4 text-primary">
              Kenyan Ultra Runners Hit Five Peaks in a Week
            </h3>
            <p className="font-lora text-clamp-p text-gray-700">
              A group of three Kenyan ultra-runners and mountaineers recently undertook what is thought to be 
              the first challenge of its own in East Africa: summiting the region's five highest mountains within 
              a week. The mountain ranges are located in Kenya, Uganda, Tanzania and the Democratic Republic of 
              Congo's border with Uganda.
            </p>
          </div>
        </div>

        {/* Fourth Feature */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-zuumebold text-clamp-h3 mb-4 text-primary">
              Lifestyle: Never Stop Climbing
            </h3>
            <p className="font-lora text-clamp-p text-gray-700">
              Not even getting five of his fingers partly amputated will deter from scaling the next mountain. 
              A story of resilience, determination, and the unwavering spirit of an adventurer.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-80 md:h-96 order-1 md:order-2">
            <img
              src="/img/lifestyle.jpeg"
              alt="Lifestyle - Adventure"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* YouTube Section */}
        <div className="mt-20 pt-12 border-t-2 border-gray-200">
          <h2 className="font-zuumebold text-clamp-h2 mb-12 text-primary text-center">
            YouTube Videos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden h-80 md:h-96">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ylXbtajoyKg?si=wcFHGdwDNj3UZWuS"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="rounded-lg overflow-hidden h-80 md:h-96">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/tsET8t71AIA?si=Kf4pbK-85Zw4DNMz"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
