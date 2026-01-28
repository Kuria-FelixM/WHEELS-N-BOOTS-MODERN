import HeroSection from '../components/HeroSection'

export default function Blog() {
  const stories = [
    {
      id: 1,
      title: 'Manaslu Summit - The Dream Realized',
      date: 'September 24, 2023',
      excerpt: 'Becoming the first Africans to summit an 8000m peak without supplemental oxygen...',
      image: '/img/manaslu.jpg',
    },
    {
      id: 2,
      title: 'Ama Dablam: The Mountain That Tests You',
      date: 'April 2021',
      excerpt: 'One of the most technically challenging mountains in the Himalayas and the peak that changed my journey...',
      image: '/img/amadablam.jpg',
    },
    {
      id: 3,
      title: 'Lenin Peak: First Kenyan on a 7000M Peak',
      date: 'July 2018',
      excerpt: 'Becoming the first Kenyan to summit a 7000M peak and joining the Snow Leopard Award club...',
      image: '/img/heerro.jpg',
    },
    {
      id: 4,
      title: 'Khan Tengri: The Northern Challenge',
      date: 'August 2019',
      excerpt: 'The world\'s most northern 7000M peak and the toughest climbing season due to severe weather...',
      image: '/img/khantegri.jpg',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Mountain Stories"
        backgroundImage="/img/hero-blogs.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-6xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 mb-12 text-primary text-center">
          Featured Stories
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {stories.map((story) => (
            <article 
              key={story.id} 
              className="group hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="font-lora text-sm text-secondary mb-2">
                  {story.date}
                </p>
                <h3 className="font-zuumebold text-clamp-h3 text-primary mb-3">
                  {story.title}
                </h3>
                <p className="font-lora text-clamp-p-sm text-gray-700 mb-4">
                  {story.excerpt}
                </p>
                <button className="font-zuumebold text-dark hover:text-primary transition-colors">
                  Read Full Story →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
