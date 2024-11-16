// import React from 'react'

// const AddressModal = () => {
//   return (
//     <div> 
//         <Dialog open={open} onClose={handleClose}>
//     <DialogTitle>Edit Address</DialogTitle>
//     <DialogContent>
//       <TextField
//         margin="dense"
//         name="addressName"
//         label="Address Name"
//         fullWidth
//         value={selectedAddress.addressName}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="dense"
//         name="street"
//         label="Street"
//         fullWidth
//         value={selectedAddress.street}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="dense"
//         name="city"
//         label="City"
//         fullWidth
//         value={selectedAddress.city}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="dense"
//         name="state"
//         label="State"
//         fullWidth
//         value={selectedAddress.state}
//         onChange={handleChange}
//       />
//       <TextField
//         margin="dense"
//         name="postalCode"
//         label="Postal Code"
//         fullWidth
//         value={selectedAddress.postalCode}
//         onChange={handleChange}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClose} color="secondary">Cancel</Button>
//       <Button onClick={handleSubmit} color="primary">Save</Button>
//     </DialogActions>
//   </Dialog></div>
//   )
// }

// export default AddressModal



// import { Button } from "@mui/material"
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,

// } from "@mui/material"
// import { TextField, FormLabel } from "@mui/material";



// // interface AddressFormData {
// //   addressName: string
// //   name: string
// //   phoneNumber: string
// //   address: string
// //   locality: string
// //   city: string
// //   state: string
// //   postalCode: string
// //   setAsDefault: boolean
// // }

// export default function Component() {
// //   const [open, setOpen] = useState(true)
// //   const [formData, setFormData] = useState<AddressFormData>({
// //     addressName: '',
// //     name: '',
// //     phoneNumber: '',
// //     address: '',
// //     locality: '',
// //     city: '',
// //     state: '',
// //     postalCode: '',
// //     setAsDefault: false
// //   })

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     console.log('Form submitted:', formData)
// //     setOpen(false)
// //   }

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({ ...prev, [name]: value }))
// //   }

//   return (
//     <Dialog >
//     {/* <Dialog open={open} onOpenChange={setOpen}> */}
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogTitle>
//           <DialogTitle className="flex justify-between items-center">
//             Edit Address
//             {/* <Button
//               variant="ghost"
//               size="icon"
//               className="h-6 w-6 rounded-md"
//               onClick={() => setOpen(false)}
//             >
//               <X className="h-4 w-4" />
//             </Button> */}
//           </DialogTitle>
//         </DialogTitle>
//         <form className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <FormLabel htmlFor="addressName">Address Name</FormLabel>
//             <TextField
//               id="addressName"
//               name="addressName"
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <FormLabel htmlFor="name">Name</FormLabel>
//             <TextField
//               id="name"
//               name="name"
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
//             <TextField
//               id="phoneNumber"
//               name="phoneNumber"
//               type="tel"
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <FormLabel htmlFor="address">Address (House No, Building, street, Area)</FormLabel>
//             <TextField
//               id="address"
//               name="address"
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <FormLabel htmlFor="locality">Locality</FormLabel>
//             <TextField
//               id="locality"
//               name="locality"
//               className="w-full"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <FormLabel htmlFor="city">City</FormLabel>
//               <TextField
//                 id="city"
//                 name="city"
//                 className="w-full"
//               />
//             </div>
//             <div className="grid gap-2">
//               <FormLabel htmlFor="state">State</FormLabel>
//               <TextField
//                 id="state"
//                 name="state"
//                 className="w-full"
//               />
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
//             <TextField
//               id="postalCode"
//               name="postalCode"
//               className="w-full"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             {/* <Checkbox
//               id="setAsDefault"
//               checked={formData.setAsDefault}
//               onCheckedChange={(checked) => 
//                 setFormData(prev => ({ ...prev, setAsDefault: checked as boolean }))
//               }
//             /> */}
//             <FormLabel htmlFor="setAsDefault">Set as Default</FormLabel>
//           </div>
//           <Button type="submit" className="w-full mt-4">
//             Edit Address
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }








// 'use client'

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@mui/icons-material"
// import { Input } from "@mui/icons-material"
// import { Label } from "@mui/icons-materiall"
// import { Checkbox } from "@mui/icons-material"
// import { X } from 'lucide-react'
// import { useState } from "react"

// // interface AddressFormData {
// //   addressName: string
// //   name: string
// //   phoneNumber: string
// //   address: string
// //   locality: string
// //   city: string
// //   state: string
// //   postalCode: string
// //   setAsDefault: boolean
// // }

// export default function Component() {
// //   const [open, setOpen] = useState(true)
// //   const [formData, setFormData] = useState<AddressFormData>({
// //     addressName: '',
// //     name: '',
// //     phoneNumber: '',
// //     address: '',
// //     locality: '',
// //     city: '',
// //     state: '',
// //     postalCode: '',
// //     setAsDefault: false
// //   })

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     console.log('Form submitted:', formData)
// //     setOpen(false)
// //   }

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({ ...prev, [name]: value }))
// //   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="flex justify-between items-center">
//             Edit Address
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-6 w-6 rounded-md"
//               onClick={() => setOpen(false)}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="addressName">Address Name</Label>
//             <Input
//               id="addressName"
//               name="addressName"
//               value={formData.addressName}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="phoneNumber">Phone Number</Label>
//             <Input
//               id="phoneNumber"
//               name="phoneNumber"
//               type="tel"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="address">Address (House No, Building, street, Area)</Label>
//             <Input
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="locality">Locality</Label>
//             <Input
//               id="locality"
//               name="locality"
//               value={formData.locality}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="city">City</Label>
//               <Input
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="state">State</Label>
//               <Input
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="postalCode">Postal Code</Label>
//             <Input
//               id="postalCode"
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             {/* <Checkbox
//               id="setAsDefault"
//               checked={formData.setAsDefault}
//               onCheckedChange={(checked) => 
//                 setFormData(prev => ({ ...prev, setAsDefault: checked as boolean }))
//               }
//             /> */}
//             <Label htmlFor="setAsDefault">Set as Default</Label>
//           </div>
//           <Button type="submit" className="w-full mt-4">
//             Edit Address
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }