import HeroSection from '../components/HeroSection'
import Card from '../components/Card'

export default function Shop() {
  const products = [
    {
      title: 'Adventure Guide Book',
      description: 'Comprehensive guide to planning your own adventure expeditions with expert tips and insights.',
      image: '/img/hero-blogs.jpg',
      price: '$29.99',
    },
    {
      title: 'Training Program',
      description: 'Online course on expedition leadership, safety protocols, and guide certification.',
      image: '/img/potrait_abtt.jpg',
      price: '$199.99',
    },
    {
      title: 'WHEELS N BOOTS Merchandise',
      description: 'Exclusive branded gear, t-shirts, and apparel from WHEELS N BOOTS adventures.',
      image: '/img/shirt.jpeg',
      price: '$49.99',
    },
    {
      title: 'Photography Collection',
      description: 'Limited edition prints from mountain expeditions and adventure tours across Africa.',
      image: '/img/three.jpg',
      price: '$89.99',
    },
    {
      title: 'Speaking Engagement Package',
      description: 'Corporate speaking engagement for your organization on adventure and leadership.',
      image: '/img/resize-17401282241312685601rrthree.jpg',
      price: 'Custom Quote',
    },
    {
      title: 'Private Consultation',
      description: 'One-on-one guidance for planning your custom adventure experience and expedition.',
      image: '/img/heerro.jpg',
      price: '$150/hour',
    },
  ]

  return (
    <div>
      <HeroSection 
        title="Accessories & Services"
        backgroundImage="/img/hero-gearr.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-7xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, idx) => (
            <Card
              key={idx}
              title={product.title}
              description={product.description}
              image={product.image}
            >
              <div className="flex items-center justify-between mt-4">
                <span className="font-zuumebold text-dark text-lg">
                  {product.price}
                </span>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark transition-colors font-zuumebold">
                  Add to Cart
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
