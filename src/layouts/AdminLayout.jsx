import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

    

export default function AdminLayout() {

  return (
    <>
      <div className='md:flex'>
        <AdminSidebar />
        <main className='bg-gray-300 flex-1 h-screen overflow-y-scroll p-3'>
          <Outlet />
        </main>
      </div>
      
    </>
  )
}
