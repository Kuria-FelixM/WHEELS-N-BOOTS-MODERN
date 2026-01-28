import HeroSection from '../components/HeroSection'

export default function Blog() {
  const stories = [
    {
      id: 1,
      title: 'Kairitu ka Dundori A girl from Dundori, The 90\'s girl',
      image: '/img/mtkenya.jpg',
      excerpt: 'This was my first time climbing Mt. Meru (4,566M a.s.l). I did not give much thought to her or the challenge of exploring her. I thought she would be modest and kind. At least not arrogant. With the experience I had, I thought it would require minimum effort to convince her I am good people. It was also sort of a blind date with little information, but I knew she was shorter than some of my previous acquaintances.',
    },
    {
      id: 2,
      title: 'Summiting 5 East African peaks',
      image: '/img/IMG_3619_(1).jpg',
      excerpt: 'Summiting 5 East African peaks in 6 days (Rwenzori, Margherita Peak - Uganda, Mt. Muhavura - Uganda, Mt. Kenya, Mt. Meru - Tanzania and Mt. Kilimanjaro). Only taking short naps in between traveling from one mountain to the other, while at times using public transport, this is the most intensive and physically demanding challenge so far.',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Mountain Stories"
        backgroundImage="/img/hero-blogs.jpg"
        logo="/img/logo.png"
      />

      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zuumebold text-clamp-h2 text-primary text-center mb-4">
            Blogs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {stories.map((story) => (
              <div key={story.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-zuumebold text-primary text-lg mb-3 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-6">
                    {story.excerpt}
                  </p>
                  <button className="bg-dark text-white font-zuumebold py-2 px-6 rounded-lg hover:bg-primary transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
