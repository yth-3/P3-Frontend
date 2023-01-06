import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import PatientDashboard from '../pages/PatientDashboard';
import Layout from './Layout';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
