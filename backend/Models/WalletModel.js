import mongoose, { Schema } from 'mongoose'

const walletSchema = mongoose.Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        required: true 
    },
    balance_amount:{
        type:Number,
        required:true,
    },
    data:[
        {
            order_id:{
                type:mongoose.Schema.Types.ObjectId,
            },
            items:{
                type: String,
            },
            amount:{
                type:Number,
            },
            date:{
                type: Date
            }
        }
    ]
}, {timestamps: true});

walletSchema.pre("save", function (next){
    this.balance_amount = this.data.reduce((acc,item)=>{
        return acc + item.amount
    },0);

    this.UpdatedAt = Date.now();
    next();
});

const Wallet = mongoose.model('Wallet', walletSchema)
export default Wallet