import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import DoctorDashboardPage from '../pages/DoctorDashboardPage';
import InsurerDashboardPage from '../pages/InsurerDashboardPage';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import NurseDashboardPage from '../pages/NurseDashboardPage';
import PatientDashboardPage from '../pages/PatientDashboardPage';
import Layout from './Layout';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboardPage />} />
        <Route path="/nurse-dashboard" element={<NurseDashboardPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
        <Route path="/insurer-dashboard" element={<InsurerDashboardPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
