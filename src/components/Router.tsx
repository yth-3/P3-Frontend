import { Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import InsurerDashboardPage from '../pages/insurer/InsurerDashboardPage';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';

import StaffDashboardPage from '../pages/staff/NurseDashboardPage';
import Layout from './Layout';
import InsurerClaimsPage from '../pages/insurer/InsurerClaimsPage';
import PatientDashboardPage from '../pages/patient/PatientDashboardPage';
import PatientClaimsPage from '../pages/patient/PatientClaimsPage';
import NewClaim from '../pages/patient/NewClaim';
import ProtectedRoute from './ProtectedRoute';


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="/" element={<ProtectedRoute role={null} />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route path="patient" element={<ProtectedRoute role='Patient' />}>
          <Route index element={<PatientDashboardPage />} />
          <Route path="claims">
            <Route index element={<PatientClaimsPage />} />
            <Route path="new" element={<NewClaim />} />
          </Route>
        </Route>

        <Route path="insurer" element={<ProtectedRoute role='Insurer' />}>
          <Route index element={<InsurerDashboardPage />} />
          <Route path="claims" element={<InsurerClaimsPage />} />
        </Route>

        <Route path="staff" element={<ProtectedRoute role='Staff' />}>
          <Route index element={<StaffDashboardPage />} />
        </Route>

        <Route path="admin" element={<ProtectedRoute role='Admin' />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
