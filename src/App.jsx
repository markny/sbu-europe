import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CityPage from './pages/CityPage'
import LookingAheadPage from './pages/LookingAheadPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<CityPage />} />
        <Route path="/looking-ahead" element={<LookingAheadPage />} />
      </Routes>
    </Layout>
  )
}
