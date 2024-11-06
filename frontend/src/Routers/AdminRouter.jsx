import React from 'react'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'
import AdminLayout from '../Components/layout/Admin/AdminLayout'
import AdminProductsPage from '../Pages/Admin/AdminProductsPage'
import AdminUsersPage from '../Pages/Admin/AdminUsersPage'
import AdminCategoryPage from '../Pages/Admin/AdminCategoryPage'


const adminRoutes=[
  {
    path:'/admin/adminlogin',
    element:<AdminLoginPage/>
  },

  {
    path:'/admin',
    element: < AdminLayout/>,
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