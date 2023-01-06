import { Route, Routes } from 'react-router-dom';
import InsurerDashboardPage from '../pages/InsurerDashboardPage';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from './Layout';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/insurer-dashboard" element={<InsurerDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
