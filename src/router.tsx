import { createBrowserRouter } from 'react-router-dom';
import GreenhouseSetup from './pages/GreenhouseSetup';
import SensorDashboard from './pages/SensorDashboard';

export const router = createBrowserRouter([
    { path: '/', element: <GreenhouseSetup /> },
    { path: '/dashboard', element: <SensorDashboard /> },
]);