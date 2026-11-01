import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

export default function UpcomingProjects() {
  const upcomingProjects = [
    {
      title: 'Kilimanjaro Expedition 2026',
      description: 'Multi-day expedition to Tanzania\'s highest peak with comprehensive training and unforgettable experiences.',
      image: '/img/amadablam.jpg',
    },
    {
      title: 'Adventure Leadership Summit',
      description: 'International conference bringing together adventure professionals, guides, and enthusiasts.',
      image: '/img/khantegri.jpg',
    },
    {
      title: 'Documentary Series',
      description: 'Production of adventure travel documentary series showcasing African expeditions and cultural experiences.',
      image: '/img/run.jpg',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Upcoming Projects"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      <section className="bg-accent py-12 md:py-20 md:w-[80%] md:ml-[20%]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {upcomingProjects.map((project, idx) => (
              <Card key={idx} {...project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/past-projects" className="text-primary font-zuumebold hover:text-dark transition-colors">
              ← View Past Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
