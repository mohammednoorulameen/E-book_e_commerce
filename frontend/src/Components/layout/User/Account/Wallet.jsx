import React from 'react'
import { Card, CardContent, CardHeader, Button } from "@mui/material";


const Wallet = () => {
  return (
    <div>
        <div className="space-y-6">
           <h2 className="text-2xl font-semibold text-gray-900">Wallet</h2>
           <Card>
             <CardHeader>
               <h1>Current Balance</h1>
             </CardHeader>
             <CardContent>
               <p className="text-4xl font-bold text-blue-600">$500.00</p>
               <div className="mt-4 space-x-4">
                 <Button>Add Funds</Button>
                 <Button variant="outline">Withdraw</Button>
               </div>
             </CardContent>
           </Card>
           <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
           <div className="space-y-4">
             {[1, 2, 3].map((transaction) => (
               <Card key={transaction}>
                 <CardContent className="flex justify-between items-center">
                   <div>
                     <p className="font-medium">Transaction #{transaction}</p>
                     <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                   </div>
                   <p className="text-lg font-semibold text-green-600">+$50.00</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div></div>
  )
}

export default Wallet