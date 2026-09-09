import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar.jsx';

function MainLayout() {
    return ( 
        <div className='flex min-h-screen flex-col' >
            <Sidebar/>

            <main className=' flex-1 py-2 ' >
                <Outlet/>
            </main>

        </div>
    );
}

export default MainLayout;