import HeroSection from '../components/HeroSection'
import Card from '../components/Card'

export default function Projects() {
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
        title="Projects"
        backgroundImage="/img/khantegri.jpg"
        logo="/img/logo.png"
      />

      {/* Past Projects */}
      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <h2 className="font-zuumebold text-clamp-h2 mb-12 text-primary text-center">
          Past Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {pastProjects.map((project, idx) => (
            <Card key={idx} {...project} />
          ))}
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="bg-accent py-12 md:py-20 w-full md:pl-[20%]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-zuumebold text-clamp-h2 mb-12 text-primary text-center">
            Upcoming Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {upcomingProjects.map((project, idx) => (
              <Card key={idx} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
