import { Outlet } from "react-router-dom";
import SupSidebar from "../components/SupSidebar";

export default function SupLayout() {
  return (
      <>
          <div className='md:flex'>

              <SupSidebar />
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
