import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard/Dashboard.jsx';
import MainLayout from '../layouts/mainLayout.jsx';

function AppRoutes() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route element={ <MainLayout/> } >
                    <Route path="/dashboard" element={ <Dashboard/> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;