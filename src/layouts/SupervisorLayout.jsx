import { Outlet } from "react-router-dom";
import SupervisorSidebar from "../components/SupervisorSidebar";

export default function SupervisorLayout() {
  return (
    <>
          <div className='md:flex'>

              <SupervisorSidebar/>
              <main className='flex-1 h-screen overflow-y-scroll p-3'
                  style={{
                      backgroundImage: 'url(/img/f.jpg)'
                  }}>
                  <Outlet />

              </main>
          </div>
      </>
  )
}
