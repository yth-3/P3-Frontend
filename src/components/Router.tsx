import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage';
import InsurerDashboardPage from '../pages/insurer/InsurerDashboardPage';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import NurseDashboardPage from '../pages/nurse/NurseDashboardPage';
import PatientDashboardPage from '../pages/PatientDashboardPage';
import Layout from './Layout';
import PatientClaimManagementPage from '../pages/ClaimManagementPage';
import InsurerClaimsPage from '../pages/insurer/InsurerClaimsPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<LandingPage />} />

        <Route path="patient">
          <Route index element={<PatientDashboardPage />} />
          <Route path="claims" element={<PatientClaimManagementPage />} />
        </Route>

        <Route path="insurer">
          <Route index element={<InsurerDashboardPage />} />
          <Route path="claims" element={<InsurerClaimsPage />} />
        </Route>

        <Route path="nurse">
          <Route index element={<NurseDashboardPage />} />
        </Route>

        <Route path="doctor">
          <Route index element={<DoctorDashboardPage />} />
        </Route>

        <Route path="admin">
          <Route index element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
