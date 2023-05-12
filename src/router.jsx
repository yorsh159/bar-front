import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Pedidos from "./views/Pedidos";
import Productos from "./views/Productos";
import Mesas from "./views/Mesas";
import Ingresos from "./views/Ingresos";
import Administracion from "./views/Adminstracion";
import Usuarios from "./views/Usuarios";
import Colaborador from "./views/Colaborador";
import Boletas from "./views/Boletas";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element:<AuthLayout />,
        children:[
            {
                path:'/auth/login',
                element: <Login />
            },
            {
                path:'/auth/registro',
                element: <Registro />,
            },
        
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children:[
            {
                index:true,
                element:<Pedidos/>,
            },
            {
                path:'/admin/productos',
                element: <Productos/>
            },
            {
                path:'/admin/mesas',
                element: <Mesas/>
            },
            {
                path:'/admin/ingresos',
                element:<Ingresos/>
            },
            {
                path:'/admin/administracion',
                element:<Administracion/>,
                
            },
            {
                path:'/admin/administracion/usuarios',
                element:<Usuarios/>,
            },
            {
                path:'/admin/administracion/colaborador',
                element:<Colaborador/>,
            },
            {
                path:'/admin/boletas',
                element:<Boletas/>,
            },
            
        ],
        


    }
])

export default router;