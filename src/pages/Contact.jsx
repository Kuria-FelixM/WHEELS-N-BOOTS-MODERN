import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import Button from '../components/Button'
import { useSearchParams } from 'react-router-dom'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: searchParams.get('type') || 'general',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      <HeroSection 
        title="Get in Touch" 
        backgroundImage="/img/IMG_20190813_183137795.jpg"
        logo="/img/logo.png"
      />

      <section className="max-w-2xl mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full md:pl-[20%]">
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-zuumebold text-primary mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block font-zuumebold text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block font-zuumebold text-primary mb-2">
              Inquiry Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="general">General Inquiry</option>
              <option value="guiding">Guiding Services</option>
              <option value="speaking">Speaking Engagement</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>

          <div>
            <label className="block font-zuumebold text-primary mb-2">
              Message *
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              placeholder="Your message"
            />
          </div>

          <Button type="submit" size="lg">
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="mt-16 pt-16 border-t-2 border-gray-200 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-zuumebold text-primary mb-2">Email</h3>
            <a href="mailto:contact@example.com" className="text-secondary hover:text-primary">
              contact@wheelsnboots.com
            </a>
          </div>
          <div>
            <h3 className="font-zuumebold text-primary mb-2">Phone</h3>
            <a href="tel:+254..." className="text-secondary hover:text-primary">
              +254 (XXX) XXX-XXXX
            </a>
          </div>
          <div>
            <h3 className="font-zuumebold text-primary mb-2">Location</h3>
            <p className="text-secondary">Kenya, East Africa</p>
          </div>
        </div>
      </section>
    </div>
  )
}
