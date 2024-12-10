import Wallet from "../../Models/WalletModel.js";


/**
 * add wallet 
 */


const addWallet = async (req,res)=>{
    try {
        const user_id = req.userId;
        const {amount,productName,order_id,payment_id} = req.body;

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
        await res(200).json({ message: "wallet add successfully "})
    } catch (error) {
        await res(401).json({ message: "wallet add failed "})
    }
}

/**
 * get wallet detailes
 */

const getWallet = async (req, res) =>{
    try {
        const user_id = req.userId;
        const wallet = await Wallet.findOne({user_id:user_id}).sort({createdAt: -1});
        await res.status(200).json({ message: " get wallet detiales  successfully", wallet})
    } catch (error) {
        await res.status(404).json({ message: " get wallet detiales  failed"})
    }
}

export {
    addWallet,
    getWallet
}