import React from 'react'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'
import AdminLayout from '../Components/layout/Admin/AdminLayout/AdminLayout'
import AdminProductsPage from '../Pages/Admin/AdminProductsPage'
import AdminUsersPage from '../Pages/Admin/AdminUsersPage'
import AdminCategoryPage from '../Pages/Admin/AdminCategoryPage'
import AdminAddProductPage from '../Pages/Admin/AdminAddProductPage'
import AdminEditProductPage from '../Pages/Admin/AdminEditProductPage'
import AdminAuth from '../Utils/Protector/AdminAuth'
import AdminPrivate from '../Utils/Protector/AdminPrivate'


const adminRoutes=[
  {
    path:'/admin/login',
    element:
    <AdminAuth>
      <AdminLoginPage/>
    </AdminAuth>
  },

  {
    path:'/admin',
    element:
    <AdminPrivate>
      < AdminLayout/>,
    </AdminPrivate>, 

    children:[
      {
        path: 'dashboard',
        element: <AdminDashboardPage/>
      },

      {
        path: 'products',
        element: <AdminProductsPage/>
      },

      {
        path: 'users',
        element: <AdminUsersPage/>
      },

      {
        path: 'category',
        element: <AdminCategoryPage/>
      },

      {
        path: 'addproduct',
        element: <AdminAddProductPage/>
      },
      
      {
        path: 'EditProduct/:product_id',
        element: <AdminEditProductPage/>
      }

    ]
  }
]

export default adminRoutes


// const AdminRouter = () => {
//   return (
//     <div>
//         <Routes>
//             <Route path='/adminlogin' element={< LoginPage/>} />
//             <Route path='/admindashboard' element={<AdminDashboardPage/>} />
//         </Routes>
//     </div>
//   )
// }

// export default AdminRouter