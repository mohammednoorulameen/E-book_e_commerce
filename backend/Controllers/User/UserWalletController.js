import Wallet from "../../Models/WalletModel.js";


/**
 * add wallet 
 */


const addWallet = async (req,res)=>{
    try {
        const user_id = req.userId;
        const {amount,productName,order_id,payment_id} = req.body;
        console.log("check this ", amount, productName, order_id, payment_id);
        
        if (payment_id) {
            const user = await Wallet.findOne({user_id:user_id})
            if (user) {
                user.data.push({
                    order_id:order_id,
                    item:productName,
                    amount:amount,
                    date: Date.now()
                })
                await user.save()
            }else{
                const user = await Wallet.create({
                    user_id:user_id,
                    balance_amount:amount,
                    data:[{
                        order_id:order_id,
                        item:productName,
                        amount:amount,
                        date: Date.now()
                    }]
                }) 
            }
        }
        await res.status(200).json({ message: "wallet add successfully "})
    } catch (error) {
        await res.status(401).json({ message: "wallet add failed "})
    }
}

// const addWallet = async (req, res) => {
//     try {
//         const user_id = req.userId;
//         const { amount, productName, order_id, payment_id } = req.body;

//         // Validate request data
//         if (!amount || !productName || !order_id || !payment_id) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Check if payment_id exists
//         if (payment_id) {
//             const user = await Wallet.findOne({ user_id: user_id });
//             if (user) {
//                 // Update existing wallet
//                 user.data.push({
//                     order_id: order_id,
//                     item: productName,
//                     amount: amount,
//                     date: Date.now()
//                 });
//                 await user.save();
//             } else {
//                 // Create new wallet
//                 await Wallet.create({
//                     user_id: user_id,
//                     balance_amount: amount,
//                     data: [{
//                         order_id: order_id,
//                         item: productName,
//                         amount: amount,
//                         date: Date.now()
//                     }]
//                 });
//             }
//             return res.status(200).json({ message: "Wallet added successfully" });
//         } else {
//             return res.status(400).json({ message: "Payment ID is required" });
//         }
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         return res.status(500).json({ message: "Wallet addition failed" });
//     }
// };



/**
 * get wallet detailes
 */

const getWallet = async (req, res) =>{
    try {
        const user_id = req.userId;

        const wallet = await Wallet.findOne({user_id:user_id}).sort({createdAt: -1});
        console.log('check wallet', Wallet)
        await res.status(200).json({ message: " get wallet detiales  successfully", wallet})
    } catch (error) {
        await res.status(404).json({ message: " get wallet detiales  failed"})
    }
}

export {
    addWallet,
    getWallet
}