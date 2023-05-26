import {Outlet} from 'react-router-dom';

export default function AuthLayout() {
  return (



    <div   
          style={{
            backgroundImage: 'url(/img/f.jpg)'
          }}
    >
      <div className='max-w-4xl m-auto py-36 md:flex flex-col md:flex-row items-center' >
          <img src="../img/logo.jpg"
               alt="imagen logo"
               className='max-w-xs' />

          <div className='p-10 w-full'>
              <Outlet />
          </div>
      </div>
        
    </div>



  )
}
