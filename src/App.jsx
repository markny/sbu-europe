import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CityPage from './pages/CityPage'
import LookingAheadPage from './pages/LookingAheadPage'
import ExperiencePresentation from './pages/ExperiencePresentation'
import RetrospectivePage from './pages/RetrospectivePage'
import NotFoundPage from './pages/NotFoundPage'
import { cityMap } from './data/cities'

function LegacyCity() {
  const { slug } = useParams()
  return cityMap[slug] ? <Navigate to={`/2025/${slug}`} replace /> : <NotFoundPage />
}
export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/2025" element={<RetrospectivePage />} />
    <Route path="/2025/:slug" element={<CityPage />} />
    <Route path="/2027" element={<LookingAheadPage />} />
    <Route path="/2027/presentation" element={<ExperiencePresentation />} />
    <Route path="/looking-ahead" element={<Navigate to="/2027" replace />} />
    <Route path="/:slug" element={<LegacyCity />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></Layout>
}
