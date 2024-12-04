import React from 'react'
import NewOrderPayment from '../../Components/layout/User/Payments/NewOrderPayment'
import PaymentSuccess from '../../Components/layout/User/Payments/PaymentSuccess'

/**
 * New Order Payment Page
 */

const NewOrderPaymentPage = () => {
  return (
    <div>
        <NewOrderPayment/>
    </div>
  )
}


const PaymentSuccessPage = () =>{
  return(
    <div>
      <PaymentSuccess/>
    </div>
  )
}

export  {NewOrderPaymentPage, PaymentSuccessPage}