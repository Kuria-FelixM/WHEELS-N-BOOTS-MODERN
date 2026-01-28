import HeroSection from '../components/HeroSection'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

export default function PastProjects() {
  const pastProjects = [
    {
      title: 'Mount Kenya Summit Expedition',
      description: 'Led successful expeditions to Point Lenana and Batian peaks with over 50 climbers from around the world.',
      image: '/img/mtkenya.jpg',
    },
    {
      title: 'Wilderness Survival Training',
      description: 'Organized intensive training programs in remote Kenyan wilderness areas teaching survival skills and leadership.',
      image: '/img/mt-kenyaa.jpg',
    },
    {
      title: 'Community Adventure Programs',
      description: 'Developed and executed youth development programs through adventure activities and outdoor expeditions.',
      image: '/img/potrait_abtt.jpg',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Past Projects"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {pastProjects.map((project, idx) => (
            <Card key={idx} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/upcoming-projects" className="text-primary font-zuumebold hover:text-accent transition-colors">
            View Upcoming Projects →
          </Link>
        </div>
      </section>
    </div>
  )
}
