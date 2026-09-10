import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar.jsx';

function MainLayout() {
    return ( 
        <div className='flex min-h-screen flex-col bg-[var(--app-background)] text-[var(--app-text)]' >
            <Sidebar/>

            <main className=' flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(217,160,52,0.12),_transparent_34%),var(--app-background)]' >
                <Outlet/>
            </main>

        </div>
    );
}

export default MainLayout;