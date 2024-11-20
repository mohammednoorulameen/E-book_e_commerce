import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Key, MapPin, ShoppingBag, Settings, Wallet, Share2, Bell } from 'lucide-react'
import { Button, Typography } from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import EditProfile from './EditProfile'
import { useNavigate, useParams } from 'react-router-dom'
import ChangePassword from './ChangePassword';
import ManageAddress from './ManageAddress';
import OrderHistory from './OrderHistory';
import Setting from './Settings'
import { useSelector } from 'react-redux';

const menuItems = [
  { name: 'EditProfile', icon: UserCircle, path: 'edit-profile' },
  { name: 'Security', icon: Key, path: 'change-password' },
  { name: 'Addresses', icon: MapPin, path: 'manage-address' },
  { name: 'Orders', icon: ShoppingBag, path: 'orders' },
  { name: 'Wallet', icon: Wallet, path: 'wallet' },
  { name: 'Referrals', icon: Share2, path: 'referrals' },
  { name: 'Notifications', icon: Bell, path: 'notifications' },
  { name: 'Settings', icon: Settings, path: 'settings' }
]

export default function Account() {
  const [activeSection, setActiveSection] = useState('Profile')
  const navigate = useNavigate()
  const { routes } = useParams()

  useEffect(() => {
    const route = menuItems.find(item => item.path.includes(item.path))?.name
    if (route) {
      setActiveSection(route)
    }
  }, [routes])

  const handleSectionClick = (item) => {
    setActiveSection(item.name)
    navigate(`/account/${item.path}`)
  }

  /**
   * get user detailes 
   */
  const userData=useSelector(state=>state.user.userProfile)


  const renderContent = () => {
    switch (activeSection) {
      case 'EditProfile':
        return <EditProfile />
      case 'Security':
        return <ChangePassword />
      case 'Addresses':
        return <ManageAddress />
      case 'Orders':
        return <OrderHistory />
      case 'Wallet':
        return <WalletSection />
      case 'Referrals':
        return <ReferralsSection />
      case 'Notifications':
        return <NotificationsSection />
      case 'Settings':
        return <Setting />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Account
        </motion.h1>
        
        {/* Card with mobile responsiveness */}
        <Card className="overflow-hidden">
          <CardContent>
            <div className="flex items-center space-x-4 sm:flex-col sm:items-start">
              <Avatar className="h-16 w-16 sm:h-12 sm:w-12" src="/placeholder.svg?height=40&width=40" alt={userData.username} />
              <div>
                <Typography variant="h6" className="text-xl font-semibold text-gray-900 sm:text-center">
                  Welcome, {userData.username}!
                </Typography>
                <Typography variant="body2" className="text-sm text-gray-500 sm:text-center">
                  Manage your account and preferences here
                </Typography>
              </div>
            </div>
          </CardContent>

          <CardContent className="p-0">
            {/* Navigation menu - horizontally scrollable on mobile */}
            <nav className="flex overflow-x-auto py-4 px-6 bg-white border-b border-gray-200 sm:flex-wrap sm:justify-center sm:py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md ${
                    activeSection === item.name
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => handleSectionClick(item)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="hidden sm:block">{item.name}</span>
                </Button>
              ))}
            </nav>

            {/* Content Area with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------------------------

// function WalletSection() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-900">Wallet</h2>
//       <Card>
//         <CardHeader>
//           <CardTitle>Current Balance</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-4xl font-bold text-blue-600">$500.00</p>
//           <div className="mt-4 space-x-4">
//             <Button>Add Funds</Button>
//             <Button variant="outline">Withdraw</Button>
//           </div>
//         </CardContent>
//       </Card>
//       <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
//       <div className="space-y-4">
//         {[1, 2, 3].map((transaction) => (
//           <Card key={transaction}>
//             <CardContent className="flex justify-between items-center">
//               <div>
//                 <p className="font-medium">Transaction #{transaction}</p>
//                 <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
//               </div>
//               <p className="text-lg font-semibold text-green-600">+$50.00</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// function ReferralsSection() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-900">Referral Program</h2>
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Referral Code</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-2xl font-bold text-blue-600">USER123</p>
//           <Button className="mt-4">Copy Code</Button>
//         </CardContent>
//       </Card>
//       <h3 className="text-xl font-semibold text-gray-900">Your Referrals</h3>
//       <div className="space-y-4">
//         {[1, 2, 3].map((referral) => (
//           <Card key={referral}>
//             <CardContent className="flex justify-between items-center">
//               <div>
//                 <p className="font-medium">Friend #{referral}</p>
//                 <p className="text-sm text-gray-500">Joined on: {new Date().toLocaleDateString()}</p>
//               </div>
//               <p className="text-lg font-semibold text-green-600">$10.00 earned</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// function NotificationsSection() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
//       <div className="space-y-4">
//         {['Email Notifications', 'Push Notifications', 'SMS Notifications'].map((setting) => (
//           <Card key={setting}>
//             <CardContent className="flex justify-between items-center">
//               <p className="font-medium">{setting}</p>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" value="" className="sr-only peer" />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//               </label>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }


