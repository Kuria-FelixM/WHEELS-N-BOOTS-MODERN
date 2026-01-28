import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ThreeElements from './pages/ThreeElements'
import Shop from './pages/Shop'
import PastProjects from './pages/PastProjects'
import UpcomingProjects from './pages/UpcomingProjects'
import MtKenya from './pages/MtKenya'
import GearRoom from './pages/GearRoom'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Press from './pages/Press'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/elements" element={<ThreeElements />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/past-projects" element={<PastProjects />} />
          <Route path="/upcoming-projects" element={<UpcomingProjects />} />
          <Route path="/guided-tours/mt-kenya" element={<MtKenya />} />
          <Route path="/gear-room" element={<GearRoom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
        </Routes>
      </Layout>
    </Router>
  )
}
